import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  LinearProgress
} from "@material-ui/core";
import { AccountCircle as AccountCircleIcon } from "@material-ui/icons";

import StartTestPage from "../StartTestPage";

import { ACTIVATED_GAME_BY_CODE, JOIN_PLAYER_TO_GAME } from "./graphql";

import { Container, Button, Form, TextField } from "./styles";

const LoginForGame = () => {
  const history = useHistory();
  const {
    location: { pathname }
  } = history;
  const urlArray = pathname.split("/");
  const urlCODE = urlArray[urlArray.length - 1];

  const { loading, error, data, refetch } = useQuery(
    ACTIVATED_GAME_BY_CODE(urlCODE)
  );
  const [joinPlayer] = useMutation(JOIN_PLAYER_TO_GAME);

  const playersUUIDs =
    (data &&
      data.activatedGameByCode &&
      data.activatedGameByCode.players &&
      data.activatedGameByCode.players.map(({ UUID }) => UUID)) ||
    [];
  const playersLS = playersUUIDs
    .map(str => {
      return JSON.parse(localStorage.getItem(`player:${str}`));
    })
    .filter(player => (player && player.CODE) === urlCODE)[0];
  const isAdminLS =
    JSON.parse(localStorage.getItem(`isAdmin:${urlCODE}`)) || false;

  const [open, setOpen] = useState(true);
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [name, setName] = useState((playersLS && playersLS.name) || "");
  const [isAdmin, setPlayer] = useState(
    (playersLS && playersLS.isAdmin) || false
  );

  useEffect(() => setOpen(!playersLS), [playersLS]);
  useEffect(() => setPlayer(isAdminLS), [isAdmin, isAdminLS]);

  const handleNext = e => {
    e.preventDefault();

    if (name.length < 4) {
      setIsErrorInput(true);

      return;
    }

    joinPlayer({
      variables: {
        gameCode: urlCODE,
        name
      }
    }).then(data => {
      const player = {
        UUID: data.data.joinPlayerToGame.UUID,
        name: data.data.joinPlayerToGame.name,
        isAdmin: isAdminLS,
        CODE: data.data.joinPlayerToGame.game.CODE
      };

      localStorage.setItem(
        `player:${data.data.joinPlayerToGame.UUID}`,
        JSON.stringify(player)
      );
      toast(`You entered the game by name '${name}'`);
      refetch();
    });

    setOpen(false);
  };

  const handleChangeInput = ({ target: { value } }) => {
    setIsErrorInput(false);
    setName(value);
  };

  const handleReturn = () => {
    history.goBack();
  };

  if (loading) return <LinearProgress value={100} />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress
        variant={loading ? "indeterminate" : "determinate"}
        value={100}
      />
      <Container>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Form onSubmit={handleNext}>
            <DialogTitle>
              In the future, you can see your name in the pivot table.
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={1} alignItems="flex-end">
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
                    error={isErrorInput}
                    helperText={
                      isErrorInput &&
                      "The name must contain more than 2 characters"
                    }
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleReturn}>
                Return
              </Button>
              <Button type="submit" color="primary" disabled={isErrorInput}>
                Next
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
        {!open &&
          playersLS &&
          data &&
          data.activatedGameByCode &&
          data.activatedGameByCode.players && (
            <StartTestPage
              data={data}
              urlCODE={urlCODE}
              playerLS={playersLS}
              isAdmin={isAdmin}
            />
          )}
      </Container>
    </>
  );
};

export default LoginForGame;
