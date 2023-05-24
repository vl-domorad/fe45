import React, { useState } from "react";

import Button, { ButtonTypes } from "./components/Button";
import Input from "./components/Input";
import Username from "./components/Username";
import { DislikeIcon } from "./assets/icons";

const App = () => {
  const [index, setIndex] = useState(1);
  const [inputValue, setInputValue] = useState("");

  const onClickPrimary = () => {
    setIndex((prevIndex) => prevIndex + 1);
  };

  const buttonArray = [
    {
      type: ButtonTypes.Primary,
      title: index.toString(),
      onClick: onClickPrimary,
    },
    {
      type: ButtonTypes.Secondary,
      title: "Secondary",
      onClick: () => {
        alert("Secondary");
      },
    },
    {
      type: ButtonTypes.Error,
      title: "Error",
      onClick: () => {
        alert("Error");
      },
    },
  ];

  const onChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div>
      {buttonArray.map(({ type, title, onClick }, index) => (
        <Button
          key={`${type}_${index}`}
          type={type}
          title={title}
          onClick={onClick}
        />
      ))}
      <Input
        isTextarea
        title={"Test Input"}
        placeholder={"Hello World!"}
        onChange={onChange}
        value={inputValue}
      />
      <Username username={"Vladislav"} />
      <DislikeIcon width={"40"} height={"40"} />
    </div>
  );
};

export default App;
