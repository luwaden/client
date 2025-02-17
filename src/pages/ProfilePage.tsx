import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { LoadingBox } from "../components/LoadingBox";
import { Context } from "../ContextApi/AppContext";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { useProfile } from "../hooks/userProfile";

export default function ProfilePage() {
  const { state, dispatch } = useContext(Context);
  const { userInfo } = state;
  const { updateProfile, isLoading } = useProfile();

  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("User not logged in");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const updatedUser = await updateProfile(userInfo, {
        name,
        email,
        password: password || undefined,
      });

      dispatch({ type: "USER_SIGNIN", payload: updatedUser });
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));

      toast.success("User updated successfully");
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <div className='container small-container'>
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className='my-3'>User Profile</h1>
      <form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className='mb-3'>
          <Button disabled={isLoading} type='submit'>
            Update
          </Button>
          {isLoading && <LoadingBox />}
        </div>
      </form>
    </div>
  );
}
