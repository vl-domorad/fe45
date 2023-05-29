import React, { useState } from "react";

import Button, { ButtonTypes } from "./components/Button";
import Input from "./components/Input";
import Username from "./components/Username";
import { DislikeIcon } from "./assets/icons";
import Card, { CardTypes } from "./components/Card";

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
      <Card
        type={CardTypes.Small}
        date="April 20, 2021"
        title="Astronauts prep for new solar arrays on nearly seven-hour spacewalk"
        text="Astronauts Kayla Barron and Raja Chari floated out of the International Space Station airlock for a spacewalk Tuesday, installing brackets and struts to support new solar arrays to upgrade the research lab’s power system on the same day that crewmate Mark Vande Hei marked his 341st day in orbit, a U.S. record for a single spaceflight."
        image="https://gamerwall.pro/uploads/posts/2022-02/1645708691_1-gamerwall-pro-p-astronavt-v-kosmose-krasivie-oboi-1.jpg"
        id={0}
        lesson_num={0}
        author={0}
      />
    </div>
  );
};

export default App;
