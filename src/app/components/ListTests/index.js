import React from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  LinearProgress, List, ListItem, ListItemAvatar,
  ListItemSecondaryAction, ListItemText, Avatar, IconButton,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  PermMedia as PermMediaIcon,
} from '@material-ui/icons';

import { GET_ALL_TESTS, DELETE_TEST } from './graphql';

import {
  Container, CustomTypography, Button, ContainerButton,
} from './styles';

const AllTests = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TESTS);
  const [ deleteTest, { loading: deleting } ] = useMutation(DELETE_TEST);
  refetch();

  const handleDelete = (id) => () => {
    if (deleting) return;

    deleteTest({
      variables: {id: [id]},
    }).then( () => {
      toast('Deleting Test Successful');
      refetch ();
    });
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress variant={loading ? "indeterminate" : "determinate"} />
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
          {data && data.tests.map(({ID, name, UUID}, index) => (
            <ListItem key={name + ID}>
              <ListItemAvatar>
                <Avatar>
                  <PermMediaIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name ? name : 'incognito'}
                secondary={UUID}
              />
              <ListItemSecondaryAction>
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
