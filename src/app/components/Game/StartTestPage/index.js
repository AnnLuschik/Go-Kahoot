import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { AnimatedList } from "react-animated-list";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { Face as FaceIcon, Cancel as CancelIcon } from "@material-ui/icons";

import Chat from "../../ChatForGame";

import { ON_WAIT_FOR_JOINING_PLAYER_TO_GAME } from "../LoginForGame/graphql";
import {
  DELETE_PLAYER_FROM_GAME,
  ON_DELETE_PLAYER_FROM_GAME,
  ON_WAIT_FOR_STARTING_GAME,
  START_GAME_BY_CODE
} from "./graphql";

import {
  CustomTypography,
  Container,
  Button,
  TextTypography,
  ListItem,
  ContainerListItem,
  ContainerJoiningPeople
} from "./styles";

const StartTestPage = ({
  data: {
    activatedGameByCode: { players: dataPlayers, test }
  },
  urlCODE,
  playerLS,
  isAdmin
}) => {
  const history = useHistory();

  const [players, addPlayer] = useState([...dataPlayers]);

  const [startGame] = useMutation(START_GAME_BY_CODE);
  const [deletePlayer] = useMutation(DELETE_PLAYER_FROM_GAME);
  const { data: subData, loading: subLoading } = useSubscription(
    ON_WAIT_FOR_JOINING_PLAYER_TO_GAME,
    {
      variables: { gameCode: urlCODE, playerUUID: playerLS.UUID }
    }
  );
  const { data: deletingSuccessData, loading: deleting } = useSubscription(
    ON_DELETE_PLAYER_FROM_GAME,
    {
      variables: { gameCode: urlCODE, playerUUID: playerLS.UUID }
    }
  );
  const { data: waitData, loading: waitLoading } = useSubscription(
    ON_WAIT_FOR_STARTING_GAME,
    {
      variables: { gameCode: urlCODE, playerUUID: playerLS.UUID }
    }
  );

  useEffect(() => {
    if (!waitLoading && waitData) {
      history.push(`/activetests/${urlCODE}/game/${playerLS.UUID}`);
    }
  }, [waitLoading, waitData, history, playerLS, urlCODE]);

  useEffect(() => {
    if (!subLoading && subData) {
      addPlayer([subData.onWaitForJoiningPlayerToGame, ...players]);
    }
  }, [subLoading, subData]);

  useEffect(() => {
    if (!deleting && deletingSuccessData) {
      const deletingUUIDPlayer =
        deletingSuccessData.onDeletePlayerFromGame.UUID;
      const newPlayers = players.filter(
        ({ UUID }) => UUID !== deletingUUIDPlayer
      );
      addPlayer(newPlayers);
    }
  }, [deleting, deletingSuccessData]);

  const handleStart = () => {
    startGame({ variables: { code: urlCODE } });
  };

  const handleDelete = () => {
    deletePlayer({
      variables: { gameCode: urlCODE, playerUUID: playerLS.UUID }
    }).then(data => {
      if (data.data.deletePlayerFromGame.success) {
        const newPlayers = players.filter(({ UUID }) => UUID !== playerLS.UUID);
        addPlayer(newPlayers);

        history.push("/activetests");
        localStorage.removeItem(`player:${playerLS.UUID}`);
      }
    });
  };

  return (
    <>
      <Container>
        <CustomTypography variant="h4" gutterBottom>
          <TextTruncate
            line={1}
            element="div"
            truncateText="…"
            text={`Test: ${test.name}`}
          />
        </CustomTypography>
        <TextTypography variant="p">
          Please wait until the Administrator (Test Creator) launches the game.
        </TextTypography>
        <ContainerJoiningPeople>{players.length}</ContainerJoiningPeople>
        <Button
          type="button"
          color="primary"
          variant="contained"
          disabled={!isAdmin}
          onClick={handleStart}
        >
          Start
        </Button>
        <ContainerListItem>
          <AnimatedList animation={"grow"}>
            {players.map(({ name, UUID }, index) => {
              const isThisPlayer = UUID === playerLS.UUID;
              const shouldHighlightUser =
                playerLS.name === name && playerLS.UUID === UUID;

              return (
                <ListItem
                  allplayers={players.length - 1}
                  islastadded={index}
                  key={index + UUID}
                  style={shouldHighlightUser ? { background: "#eee" } : {}}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <FaceIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TextTruncate
                        line={1}
                        element="div"
                        truncateText="…"
                        text={name ? name : "incognito"}
                      />
                    }
                    secondary={shouldHighlightUser ? "^^^ Your name ^^^" : ""}
                  />
                  {isThisPlayer && (
                    <IconButton onClick={handleDelete}>
                      <CancelIcon />
                    </IconButton>
                  )}
                </ListItem>
              );
            })}
          </AnimatedList>
        </ContainerListItem>
      </Container>
      <Chat urlCode={urlCODE} playerUUID={playerLS.UUID} isShow={true} />
    </>
  );
};

export default StartTestPage;
