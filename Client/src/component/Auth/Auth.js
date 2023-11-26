import React from "react";
import AuthForm from "./AuthForm";
import { sendUserRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";

const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.userId);
  };

  const getData = (data) => {
    // console.log("Auth", data);
    sendUserRequest(data.inputs, data.signup)
      // .then((res) => {
      //   console.log(res);
      // })
      // .then(() => dispatch(userActions.login()))
      .then(onResReceived)
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;
