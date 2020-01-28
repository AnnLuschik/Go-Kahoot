import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  LinearProgress, List, ListItem, ListItemAvatar,
  ListItemSecondaryAction, ListItemText, Avatar, IconButton,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  PermMedia as PermMediaIcon,
  Visibility as VisibilityIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon,
} from '@material-ui/icons';

import { GET_ALL_TESTS, DELETE_TEST, ACTIVATE_GAME } from './graphql';

import {
  Container, CustomTypography, Button, ContainerButton, ButtonIcon,
} from './styles';

const AllTests = () => {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_ALL_TESTS);
  const [ deleteTest, { loading: deleting } ] = useMutation(DELETE_TEST);
  const [ activateGame, { loading: activating } ] = useMutation(ACTIVATE_GAME);
  refetch();

  const handleActivateGame = (UUID) => () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('player');

    activateGame({
      variables: { testUUID: UUID },
    }).then( (data) => {
      toast('Activating Test Successful');
      localStorage.setItem('isAdmin', true);
      history.push(`/activetests/${data.data.activateGame.CODE}`, { isAdmin: true });
    });
  };

  const handleDelete = (id) => () => {
    if (deleting) return;

    deleteTest({
      variables: { id: [id] },
    }).then( () => {
      toast('Deleting Test Successful');
      refetch();
    });
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress variant={(loading || activating) ? "indeterminate" : "determinate"} />
      <Container>
        <CustomTypography  variant="h4" gutterBottom >
          List of tests
        </CustomTypography>
        <List>
          {data
          && data.tests
          && !data.tests.length
          && (
            <>
              <CustomTypography  variant="h5" gutterBottom >
                Sorry, but no one test has been created yet.
              </CustomTypography>
              <ContainerButton>
                <Link to='/create' >
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    >
                    Create Test
                  </Button>
                </Link>
              </ContainerButton>
            </>
          )}
          {data
          && data.tests
          && data.tests.map(({ID, name, UUID}, index) => (
            <ListItem key={name + ID}>
              <ListItemAvatar>
                <Avatar>
                  <PermMediaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name ? name : 'incognito'}
              />
              <ListItemSecondaryAction>
                <ButtonIcon
                  edge="end"
                  aria-label="delete"
                  onClick={handleActivateGame(UUID)}
                >
                  <PlayCircleFilledWhiteIcon />
                </ButtonIcon>
                <Link to={`/tests/${UUID}`}>
                  <IconButton edge="start" aria-label="show" >
                    <VisibilityIcon />
                  </IconButton>
                </Link>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(ID)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AllTests;
