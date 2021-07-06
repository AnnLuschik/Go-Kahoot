import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useSubscription } from "@apollo/client";
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";
import { Face as FaceIcon, Cancel as CancelIcon } from "@material-ui/icons";

import { ChatForGame } from "../../ChatForGame";

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
  ContainerListItem,
  ContainerJoiningPeople,
  StyledTruncate, 
  StyledListItem
} from "./styles";

import { ThemeContext, themeStyles } from '../../../CustomThemeProvider';

export const StartTestPage = ({
  data: {
    activatedGameByCode: { players: dataPlayers, test }
  },
  urlCODE,
  playerLS,
  isAdmin
}) => {
  const history = useHistory();

  const [players, addPlayer] = useState([...dataPlayers]);

  const { theme } = useContext(ThemeContext);

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
  }, [subLoading, subData, players]);

  useEffect(() => {
    if (!deleting && deletingSuccessData) {
      const deletingUUIDPlayer =
        deletingSuccessData.onDeletePlayerFromGame.UUID;
      const newPlayers = players.filter(
        ({ UUID }) => UUID !== deletingUUIDPlayer
      );
      addPlayer(newPlayers);
    }
  }, [deleting, deletingSuccessData, players]);

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
        <CustomTypography variant="h4" gutterBottom color={themeStyles.textPrimary}>
          <StyledTruncate
            line={1}
            element="div"
            truncateText="…"
            text={`Test: ${test.name}`}
          />
        </CustomTypography>
        <TextTypography>
          <Typography color={themeStyles.textSecondary}>
            Please wait until the Administrator (Test Creator) launches the game.
            </Typography>
        </TextTypography>
        <ContainerJoiningPeople>{players.length}</ContainerJoiningPeople>
        <Button
          type="button"
          color={themeStyles.primary}
          variant="contained"
          disabled={!isAdmin}
          onClick={handleStart}
        >
          Start
        </Button>
        <ContainerListItem>
          {players.map(({ name, UUID }, index) => {
            const isThisPlayer = UUID === playerLS.UUID;
            const shouldHighlightUser =
              playerLS.name === name && playerLS.UUID === UUID;

            return (
              <StyledListItem
                islastadded={index}
                key={index + UUID}
                isBackground={shouldHighlightUser}
              >
                <ListItemAvatar>
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <StyledTruncate
                    line={1}
                    element="div"
                    truncateText="…"
                    text={name ? name : "incognito"}
                    isDark={theme === 'dark'}
                  />   
                  }
                  secondary={shouldHighlightUser 
                    ? <Typography color={themeStyles.textSecondary}>^^^ Your name ^^^</Typography> 
                    : ""}
                />
                {isThisPlayer && (
                  <IconButton onClick={handleDelete}>
                    <CancelIcon />
                  </IconButton>
                )}
              </StyledListItem>
            );
          })}
        </ContainerListItem>
      </Container>
      <ChatForGame urlCode={urlCODE} playerUUID={playerLS.UUID} isShow={true} />
    </>
  );
};
