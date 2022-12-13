import React, { useState } from "react";
import { Col, Container, Button, Form, Row } from "react-bootstrap";
import "./Signup.css";
import avatarImg from "../assets/avatarImg.jpg";
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";






function Signup() {
  const [email, setEmail] = useState('') ;
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
        return alert("Max file size is 1mb");
    } else {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    }
}
async function uploadImage() {
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "chatapp");
  try {
      setUploadingImg(true);
      let res = await fetch("https://api.cloudinary.com/v1_1/dh21ivbxo/image/upload", {
          method: "post",
          body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
  } catch (error) {
      setUploadingImg(false);
      console.log(error);
  }
}

async function handleSignup(e) {
  e.preventDefault();
  if (!image) return alert("Please upload your profile picture");
  const url = await uploadImage(image);
  console.log(url);
  // signup the user
  signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
          console.log(data);
          navigate("/chat");
      }
  });
}

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className='d-flex align-items-center justify-content-center flex-direction-column'
        >
          <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
            <h1 className='text-center'>Create Account</h1>
            <div className='signup-profile-pic__container'>
              <img src={imagePreview || avatarImg} className='signup-profile-pic' alt ="" />
              <label htmlFor='image-upload' className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input
                type='file'
                id='image-upload'
                hidden
                accept='image/png, image/jpeg, image/gif, image/jpg'
                onChange={validateImg}
              />
            </div>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Your Name</Form.Label>
              <Form.Control type='text' placeholder='your name..' onChange={(e)=>setName(e.target.value)} value={name}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='your mail..' onChange={(e)=>setEmail(e.target.value)} value={email}/>
              <Form.Text className='text-muted'>
               
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password'onChange={(e)=>setPassword(e.target.value)} value={password}/>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button variant='primary' type='submit'>
            {uploadingImg || isLoading ? "Signing you up..." : "Signup"}
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have and account? <Link to='/login'>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className='signup__bg'></Col>
      </Row>
    </Container>
  );
}

export default Signup;
