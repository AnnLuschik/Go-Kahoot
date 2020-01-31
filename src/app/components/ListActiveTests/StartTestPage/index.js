import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import {
  Avatar, IconButton, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import {
  Face as FaceIcon,
  Cancel as CancelIcon,
} from '@material-ui/icons';

import { ONWAIT_FOR_JOINING_PLAYER_TO_GAME } from '../LoginForGame/graphql';
import {
  DELETE_PLAYER_FROM_GAME, ONDELETE_PLAYER_FROM_GAME,
  ONWAIT_FOR_STARTING_GAME, START_GAME_BY_CODE,
} from './graphql';

import {
  CustomTypography, Container, Button, TextTypography, ListItem, ContainerListItem,
} from './styles';

const StartTestPage = ({
  data: {
    activatedGameByCode: {
      players : dataPlayers,
      test,
    }
  },
  urlCODE,
  playerLS,
  isAdmin,
}) => {
  const history = useHistory();
  const { data: subData, loading: subLoading } = useSubscription(ONWAIT_FOR_JOINING_PLAYER_TO_GAME, {
    variables: {
      gameCode: urlCODE,
      playerUUID: playerLS.UUID,
    }
  });
  const [deletePlayer] = useMutation(DELETE_PLAYER_FROM_GAME);
  const { data: deletingSuccessData, loading: deleting } = useSubscription(ONDELETE_PLAYER_FROM_GAME, {
    variables: {
      gameCode: urlCODE,
      playerUUID: playerLS.UUID,
    }
  });
  const { data: waitData, loading: waitLoading } = useSubscription(ONWAIT_FOR_STARTING_GAME, {
    variables: {
      gameCode: urlCODE,
      playerUUID: playerLS.UUID,
    }
  });

  const [startGame] = useMutation(START_GAME_BY_CODE);

  useEffect(() => {
    if (!waitLoading && waitData) {
      history.push(`/activetests/${urlCODE}/game/${playerLS.UUID}`);
    }
  }, [waitLoading, waitData]);

  const [players, addPlayer] = useState([...dataPlayers]);

  useEffect(() => {
    if (!subLoading && subData) {
      addPlayer([subData.onWaitForJoiningPlayerToGame, ...players]);
    }
  }, [subLoading, subData]);

  useEffect(() => {
    if (!deleting && deletingSuccessData) {
      const deletingUUIDPlayer = deletingSuccessData.onDeletePlayerFromGame.UUID;
      const newPlayers = players.filter(({ UUID }) => UUID !== deletingUUIDPlayer);
      addPlayer(newPlayers);
    }
  }, [deleting, deletingSuccessData]);

  const handleStart = () => {
    startGame({
      variables: {
        code: urlCODE,
      },
    });
  };

  const handleDelete = () => {
    deletePlayer({
      variables: {
        gameCode: urlCODE,
        playerUUID: playerLS.UUID,
      },
    }).then( (data) => {
      if (data.data.deletePlayerFromGame.success) {
        const newPlayers = players.filter(({ UUID }) => UUID !== playerLS.UUID);
        addPlayer(newPlayers);
        history.push('/activetests');
        localStorage.removeItem(`player:${playerLS.UUID}`);
      }
    });
  };

  return (
    <>
      <Container>
        <CustomTypography  variant="h4" gutterBottom >
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
        <TextTypography variant="p">
          Number of people: {players.length}
        </TextTypography>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={!isAdmin}
          onClick={handleStart}
        >
          Start
        </Button>
        <ContainerListItem>
          {players.map(({ name, UUID }, index) => (
            <ListItem
              key={name + index}
              style={playerLS.name === name && playerLS.UUID === UUID ? {
                background: 'lightgray',
              } : {}}
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
                    text={name ? name : 'incognito'}
                  />
                }
                secondary={playerLS.name === name && playerLS.UUID === UUID ? '^^^ Your name ^^^': ''}
              />
              {
                (UUID === playerLS.UUID) && (
                    <IconButton
                      onClick={handleDelete}
                    >
                      <CancelIcon />
                    </IconButton>
                )
              }
            </ListItem>
          ))}
        </ContainerListItem>
      </Container>
    </>
  );
};

export default StartTestPage;
