import { Button, FormControl, FormGroup } from "react-bootstrap";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./MessageForm.css";

function MessageForm() {
  return (
    <>
    <div className='messages-output'></div>
      <Form >
        <Row>
          <Col md={11}>
            <FormGroup>
                <FormControl type="text" placeholder="Your message">

                </FormControl>
            </FormGroup>
          </Col>
          <Col md={1}>
            <Button variant="primary" type="submit" style={{ width: "100%", backgroundColor: "orange" }} >
            <i className="fas fa-paper-plane"></i>
            </Button>
          
          </Col>
        </Row>
      </Form>
      </>
  );
}

export default MessageForm;
