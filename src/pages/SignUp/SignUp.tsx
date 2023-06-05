import React, {useEffect, useRef, useState} from "react";

import FormPagesContainer from "../../components/FormPagesContainer";
import Input from "../../components/Input";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // мы создаем сначала экземпляр нашей ref и говорим, что у нее будет тип HTMLInputElement | null
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [])

  return (
    <FormPagesContainer
      title={"Sign Up"}
      btnTitle={"Sign Up"}
      onSubmit={() => {}}
      additionalInfo={
        <div className={styles.additionalInfo}>
          {"Already have an account?"}
          <span className={styles.signIn}>Sign In</span>
        </div>
      }
    >
      <Input
        title={"Name"}
        placeholder={"Your name"}
        onChange={setName}
        value={name}
        ref={inputRef}
      />
      <Input
        title={"Email"}
        placeholder={"Your email"}
        onChange={setEmail}
        value={email}
      />
      <Input
        title={"Password"}
        placeholder={"Your password"}
        onChange={setPassword}
        value={password}
      />
      <Input
        title={"Confirm Password"}
        placeholder={"Confirm password"}
        onChange={setConfirmPassword}
        value={confirmPassword}
      />
    </FormPagesContainer>
  );
};

export default SignUp;
