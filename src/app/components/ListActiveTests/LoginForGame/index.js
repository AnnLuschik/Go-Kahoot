import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Avatar, Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, LinearProgress, ListItem, ListItemAvatar, ListItemText, TextField,
} from '@material-ui/core';
import {
  Face as FaceIcon,
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';

import { ACTIVATED_GAME_BY_CODE, JOIN_PLAYER_TO_GAME } from './graphql';

import { CustomTypography } from '../styles';
import { Container, Button, TextTypography } from './styles';

const LoginForGame = () => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const urlArray = pathname.split('/');
  const urlCODE = urlArray[urlArray.length - 1];

  const playerLS = JSON.parse(localStorage.getItem('player')) || {};
  const isAdminLS = JSON.parse(localStorage.getItem('isAdmin')) || false;
  const validateTestUUID = (urlCODE === playerLS.CODE) && isAdminLS && playerLS.isAdmin;

  const [ isAdmin, setPlayer ] = useState(validateTestUUID);
  const { loading, data, refetch } = useQuery(ACTIVATED_GAME_BY_CODE(urlCODE));
  const [ joinPlayer ] = useMutation(JOIN_PLAYER_TO_GAME);

  const [ name, setName ] = useState(playerLS.name || '');
  const [ open, setOpen ] = useState(!playerLS.name && true);

  useEffect(() => setPlayer(validateTestUUID), [isAdmin, validateTestUUID]);

  const handleStart = () => {
    joinPlayer({
      variables: {
        gameCode: urlCODE,
        name,
      },
    }).then( (data) => {
      const player = {
        UUID: data.data.joinPlayerToGame.UUID,
        name: name,
        isAdmin: isAdminLS,
        CODE: data.data.joinPlayerToGame.game.CODE,
      };

      localStorage.setItem('player', JSON.stringify(player));
      toast(`You entered the game by name ${name}`);
      history.replace({ ...history.location, state: { isAdmin: false } });
      refetch ();
    });

    setOpen(false);
  };

  const handleChangeInput = (e) => {
    setName(e.target.value);
  };

  const handleReturn = () => {
    history.goBack();
  };

  return (
    <>
      <LinearProgress variant={loading ? "indeterminate" : "determinate"} />
      <Container>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            handleStart(e);
          }}>
            <DialogTitle>
              In the future, you can see your name in the pivot table.
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
              >
                <Grid item>
                  <AccountCircleIcon />
                </Grid>
                <Grid item>
                  <TextField
                    label="Enter Your Name"
                    autoFocus
                    fullWidth
                    value={name}
                    onChange={handleChangeInput}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={handleReturn}
              >
                Return
              </Button>
              <Button
                type="submit"
                color="primary"
              >
                Next
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <CustomTypography  variant="h5" gutterBottom >
          Test: {data && data.activatedGameByCode.test.name}
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
        {data
        && data.activatedGameByCode
        && data.activatedGameByCode.players
        && data.activatedGameByCode.players.map(({ name }, index) => (
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

export default LoginForGame;
