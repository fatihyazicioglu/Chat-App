import { FormControl, FormGroup } from "react-bootstrap";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";


function MessageForm() {
  return (
    <div className='messages-output'>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
                <FormControl type="text" placeholder="Your message">

                </FormControl>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default MessageForm;
