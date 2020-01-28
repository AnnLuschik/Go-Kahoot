import React, { useState, useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import {
  Avatar, ListItem, ListItemAvatar, ListItemText,
} from '@material-ui/core';
import {
  Face as FaceIcon,
} from '@material-ui/icons';

import { ONJOINING_PLAYER_TO_GAME } from '../graphql';

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
  newPlayer,
}) => {
  const { data: subData, loading: subLoading } = useSubscription(ONJOINING_PLAYER_TO_GAME, {
    variables: {
      gameCode: urlCODE,
      playerUUID: playerLS.UUID,
    }
  });
  const [players, addPlayer] = useState(
    newPlayer
      ? [...dataPlayers, newPlayer]
      : [...dataPlayers]
  );

  useEffect(() => {
    if (!subLoading && subData) {
      addPlayer([...players, subData.onJoiningPlayerToGame]);
    }
  }, [subLoading, subData]);

  return (
    <>
      <Container>
        <CustomTypography  variant="h5" gutterBottom >
          Test: {test.name}
        </CustomTypography>
        <TextTypography>
          Please wait until the Administrator (Test Creator) launches the game.
        </TextTypography>
        <Button
          variant="contained"
          color="primary"
          type="button"
          disabled={!isAdmin}
        >
          Start
        </Button>
        {players.map(({ name }, index) => (
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
          </ListItem>
        ))}
      </Container>
    </>
  );
};

export default StartTestPage;
