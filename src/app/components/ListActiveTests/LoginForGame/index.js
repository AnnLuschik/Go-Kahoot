import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, LinearProgress, TextField,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
} from '@material-ui/icons';

import StartTestPage from './StartTestPage';

import { ACTIVATED_GAME_BY_CODE, JOIN_PLAYER_TO_GAME } from './graphql';

import { Container, Button } from './styles';

const LoginForGame = () => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const urlArray = pathname.split('/');
  const urlCODE = urlArray[urlArray.length - 1];

  const playerLS = JSON.parse(localStorage.getItem('player')) || {};
  const isAdminLS = JSON.parse(localStorage.getItem('isAdmin')) || false;
  const validate = (urlCODE === playerLS.CODE) && isAdminLS && playerLS.isAdmin;

  const [newPlayer, setNewPlayer] = useState(null);
  const [name, setName] = useState(playerLS.name || '');
  const [open, setOpen] = useState(!playerLS.name && true);
  const [isAdmin, setPlayer] = useState(validate);
  const {loading, data, refetch} = useQuery(ACTIVATED_GAME_BY_CODE(urlCODE));
  const [joinPlayer] = useMutation(JOIN_PLAYER_TO_GAME);

  useEffect(() => setPlayer(validate), [isAdmin, validate]);

  const handleNext = () => {
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

      setNewPlayer(player);
      localStorage.setItem('player', JSON.stringify(player));
      toast(`You entered the game by name ${name}`);
      history.replace({ ...history.location, state: { isAdmin: false } });
      refetch();
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
            handleNext(e);
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
        {
          !open
          && playerLS.name
          && data
          && data.activatedGameByCode
          && data.activatedGameByCode.players
          && (
            <StartTestPage
              data={data}
              urlCODE={urlCODE}
              playerLS={playerLS}
              isAdmin={isAdmin}
              newPlayer={newPlayer}
            />
          )
        }
      </Container>
    </>
  );
};

export default LoginForGame;
