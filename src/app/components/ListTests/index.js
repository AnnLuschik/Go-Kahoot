import React from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Tooltip
} from "@material-ui/core";
import {
  Cached as CachedIcon,
  Delete as DeleteIcon,
  PermMedia as PermMediaIcon,
  Visibility as VisibilityIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon
} from "@material-ui/icons";

import { GET_ALL_TESTS, DELETE_TEST, ACTIVATE_GAME } from "./graphql";

import { CustomFab } from "../ListActiveTests/styles";
import {
  Container,
  CustomTypography,
  Button,
  ContainerButton,
  ButtonIcon,
  ListItemText
} from "./styles";

const ListTests = () => {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(GET_ALL_TESTS);
  const [deleteTest, { loading: deleting }] = useMutation(DELETE_TEST);
  const [activateGame, { loading: activating }] = useMutation(ACTIVATE_GAME);

  const handleActivateGame = UUID => () => {
    activateGame({ variables: { testUUID: UUID } }).then(
      ({
        data: {
          activateGame: { CODE }
        }
      }) => {
        toast("Activating Test Successful");
        localStorage.setItem(`isAdmin:${CODE}`, "true");
        history.push(`/activetests/${CODE}`);
      }
    );
  };

  const handleDelete = id => () => {
    if (deleting) return;

    deleteTest({ variables: { id: [id] } }).then(() => {
      toast("Deleting Test Successful");
      refetch();
    });
  };

  if (loading) return <LinearProgress />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress
        variant={
          loading || activating || deleting ? "indeterminate" : "determinate"
        }
      />
      <Container>
        <CustomTypography variant="h4" gutterBottom>
          List of tests
          <Tooltip title="Reload tests">
            <CustomFab
              size="medium"
              color="primary"
              aria-label="reload"
              onClick={() => refetch()}
            >
              <CachedIcon />
            </CustomFab>
          </Tooltip>
        </CustomTypography>
        <List>
          {data && data.tests && !data.tests.length && (
            <>
              <CustomTypography variant="h5" gutterBottom>
                Sorry, but no one test has been created yet.
              </CustomTypography>
              <ContainerButton>
                <Link to="/create">
                  <Button color="primary" variant="contained" size="large">
                    Create Test
                  </Button>
                </Link>
              </ContainerButton>
            </>
          )}
          {data &&
            data.tests &&
            data.tests.map(({ ID, name, UUID }, index) => (
              <ListItem key={name + ID}>
                <ListItemAvatar>
                  <Avatar>
                    <PermMediaIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <TextTruncate
                      line={1}
                      element="div"
                      truncateText="…"
                      text={name ? name : "incognito"}
                    />
                  }
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Activate test">
                    <ButtonIcon
                      edge="end"
                      aria-label="activate"
                      onClick={handleActivateGame(UUID)}
                    >
                      <PlayCircleFilledWhiteIcon />
                    </ButtonIcon>
                  </Tooltip>
                  <Link to={`/tests/${UUID}`}>
                    <Tooltip title="Edit test">
                      <IconButton edge="start" aria-label="show">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  <Tooltip title="Delete Test">
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={handleDelete(ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Container>
    </>
  );
};

export default ListTests;
