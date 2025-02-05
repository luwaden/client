import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { useSignin } from "../hooks/userSignin"; // Updated import
import { ApiError } from "../types/ApiError";
import { toast } from "react-toastify";
import { getError } from "../utils";
import { LoadingBox } from "../components/LoadingBox"; // Importing LoadingBox component
import {
  Form,
  Button,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const SigninPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state } = useContext(Context);
  const { userInfo } = state;

  const { signin, isLoading, error } = useSignin(); // Updated to use new hook

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin(email, password); // Updated to call new function
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className='small-container'>
      {/* <Helmet>
        <title>{'Sign In'}</title>
      </Helmet> */}
      <h1 className='my-3'> Sign In</h1>
      {error && <div className='error'>{getError(error)}</div>}{" "}
      {/* Display error message */}
      <Form onSubmit={submitHandler}>
        <FormGroup className='mb-3' controlId='email'>
          <FormLabel>Email</FormLabel>
          <FormControl
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup className='mb-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}></FormControl>
        </FormGroup>

        <div className='mb-3'>
          <Button disabled={isLoading} type='submit'>
            Sign In
          </Button>
          {isLoading && <LoadingBox />} {/* Show loading indicator */}
        </div>
        <div className='mb-3'>
          New Customer? {}
          <Link to={`/signup?redirect=${redirect}`}> Create your account</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninPage;
