import React from "react";
import { useHistory } from "react-router-dom";

import Game from "./Game";
import Chat from "../../ChatForGame";

const ContainerForGame = () => {
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
      <Chat urlCode={urlCode} playerUUID={urlUUIDPlayer} isShow={false} />
    </>
  );
};

export default ContainerForGame;
