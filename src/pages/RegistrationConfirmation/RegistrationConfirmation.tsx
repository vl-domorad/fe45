import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormPagesContainer from "src/components/FormPagesContainer";
import { activateUser } from "src/redux/reducers/authSlice";
import { RoutesList } from "src/pages/Router";

const RegistrationConfirmation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => {
            navigate(RoutesList.SignIn)
          },
        })
      );
    }
  };

  return (
    <FormPagesContainer
      title={"Registration Confirmation"}
      btnTitle={"Activate"}
      onSubmit={onSubmit}
    >
      <div>{"Please activate your account with clicking on button"}</div>
    </FormPagesContainer>
  );
};

export default RegistrationConfirmation;
