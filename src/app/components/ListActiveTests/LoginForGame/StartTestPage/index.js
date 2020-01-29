import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useMutation, useSubscription } from '@apollo/react-hooks';
import {
  Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
} from '@material-ui/core';
import {
  Face as FaceIcon,
  Cancel as CancelIcon,
} from '@material-ui/icons';

import { ONJOINING_PLAYER_TO_GAME } from '../graphql';
import { DELETE_PLAYER_FROM_GAME, ONDELETE_PLAYER_FROM_GAME } from './graphql';

import {
  CustomTypography, Container, Button, TextTypography,
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
  const { data: subData, loading: subLoading } = useSubscription(ONJOINING_PLAYER_TO_GAME, {
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

  const [players, addPlayer] = useState([...dataPlayers]);

  useEffect(() => {
    if (!subLoading && subData) {
      addPlayer([subData.onJoiningPlayerToGame, ...players]);
    }
  }, [subLoading, subData]);

  useEffect(() => {
    if (!deleting && deletingSuccessData) {
      const deletingUUIDPlayer = deletingSuccessData.onDeletePlayerFromGame.UUID;
      const newPlayers = players.filter(({ UUID }) => UUID !== deletingUUIDPlayer);
      addPlayer(newPlayers);
    }
  }, [deleting, deletingSuccessData]);

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
        <CustomTypography  variant="h5" gutterBottom >
          Test: {test.name}
        </CustomTypography>
        <TextTypography>
          Please wait until the Administrator (Test Creator) launches the game.
        </TextTypography>
        <TextTypography>
          Number of people: {players.length}
        </TextTypography>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={!isAdmin}
        >
          Start
        </Button>
        {players.map(({ name, UUID }, index) => (
          <ListItem
            key={name + index}
            style={playerLS.name === name ? {background: 'lightgray', borderRadius: '10px'} : {}}
          >
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name ? name : 'incognito'}
              secondary={playerLS.name === name ? '^^^ Your name ^^^': ''}
            />
            {
              (UUID === playerLS.UUID) && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="deactivate"
                    onClick={handleDelete}
                  >
                    <CancelIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )
            }
          </ListItem>
        ))}
      </Container>
    </>
  );
};

export default StartTestPage;
