import React from 'react';
import { toast } from "react-toastify";
import { Link, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  LinearProgress, List, ListItem, ListItemAvatar,
  ListItemSecondaryAction, ListItemText, Avatar, IconButton,
} from '@material-ui/core';
import {
  Cancel as CancelIcon,
  AlarmOn as AlarmOnIcon,
  FlightTakeoff as FlightTakeoffIcon,
} from '@material-ui/icons';
import CachedIcon from '@material-ui/icons/Cached';

import { ACTIVATED_GAMES, DEACTIVATE_TEST } from './graphql';

import {
  Container, CustomTypography, Button, ContainerButton, ButtonIcon, CustomFab,
} from './styles';

const ActiveTests = () => {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(ACTIVATED_GAMES);
  const [ deactivateTest, { loading: deactivating } ] = useMutation(DEACTIVATE_TEST);

  const handleDeactivate = (CODE) => () => {
    if (deactivating || loading) return;

    deactivateTest({
      variables: { codes: [CODE] },
    }).then( () => {
      toast('Deactivating Test Successful');
      refetch();
    });
  };

  const handleJoinGame = (CODE) => () => {
    history.push(`/activetests/${CODE}`);
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress variant={(loading || deactivating) ? "indeterminate" : "determinate"} />
      <Container>
        <CustomTypography  variant="h4" gutterBottom >
          List of Active Tests
          <CustomFab
            onClick={() => refetch()}
            size="medium"
            color="primary"
            aria-label="reload"
          >
            <CachedIcon />
          </CustomFab>
        </CustomTypography>
        <List>
          {data
          && data.activatedGames
          && !data.activatedGames.length
          && (
            <>
              <CustomTypography  variant="h5" gutterBottom >
                Sorry, but no one test has been activated yet.
              </CustomTypography>
              <ContainerButton>
                <Link to='/tests' >
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Activate Test
                  </Button>
                </Link>
              </ContainerButton>
            </>
          )}
          {data
          && data.activatedGames
          && data.activatedGames.map(({ CODE, test: { ID, name, UUID } }, index) => (
            <ListItem key={name + ID + index}>
              <ListItemAvatar>
                <Avatar>
                  <AlarmOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name ? name : 'incognito'}
              />
              <ListItemSecondaryAction>
                <ButtonIcon
                  edge="end"
                  aria-label="join"
                  onClick={handleJoinGame(CODE)}
                >
                  <FlightTakeoffIcon />
                </ButtonIcon>
                <IconButton
                  edge="end"
                  aria-label="deactivate"
                  onClick={handleDeactivate(CODE)}
                >
                  <CancelIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default ActiveTests;
