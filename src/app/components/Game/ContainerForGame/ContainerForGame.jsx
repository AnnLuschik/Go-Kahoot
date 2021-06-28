import React from "react";
import { useHistory } from "react-router-dom";

import { Game } from "./Game";
import { ChatForGame } from "../../ChatForGame";

export const ContainerForGame = () => {
  const history = useHistory();
  const {
    location: { pathname }
  } = history;
  const urlArray = pathname.split("/");
  const urlUUIDPlayer = urlArray[urlArray.length - 1];
  const urlCode = urlArray[urlArray.length - 3];

  return (
    <>
      <Game />
      <ChatForGame urlCode={urlCode} playerUUID={urlUUIDPlayer} isShow={false} />
    </>
  );
};
