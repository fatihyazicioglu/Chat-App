import React, { useContext, useState } from "react";
import { Button, Col, Form, FormControl, FormGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const {socket, currentRoom, setMessages, messages, privateMemberMsg} = useContext(AppContext);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
});

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
}
  return (
    <>
      <div className='messages-output'>
        {!user && <div className='alert alert-danger'>Please login</div>}
      </div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <FormGroup>
              <FormControl type='text' placeholder='Your message' disabled={!user} value={message} onChange={(e)=>setMessage(e.target.value)}></FormControl>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button
              variant='primary'
              type='submit'
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user}
            >
              <i className='fas fa-paper-plane'></i>
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
