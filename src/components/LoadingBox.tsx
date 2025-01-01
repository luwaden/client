import React from "react";
import { Spinner } from "react-bootstrap";

export const LoadingBox = () => {
  return (
    <Spinner animation='border' role='statua'>
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
};
