import React, { useState, useEffect, useContext } from "react";
import toast from "toastr";
import { useHistory } from "react-router-dom";
import { AnimatedList } from "react-animated-list";
import { useQuery, useMutation } from "@apollo/client";
import {
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Tooltip,
  Typography
} from "@material-ui/core";
import {
  Cached as CachedIcon,
  Delete as DeleteIcon,
  PermMedia as PermMediaIcon,
  Visibility as VisibilityIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon
} from "@material-ui/icons";

import { GET_ALL_TESTS, DELETE_TEST, ACTIVATE_GAME } from "./graphql";

import { CustomFab } from "../ActiveTests/styles";
import {
  Container,
  CustomTypography,
  Button,
  ContainerButton,
  ButtonIcon,
  ListItemText,
  StyledTruncate,
  StyledLink,
} from "./styles";
import { Link } from "../../styles";
import { ThemeContext, themeStyles } from '../../CustomThemeProvider';

export const ListTests = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const { loading, error, data, refetch } = useQuery(GET_ALL_TESTS);
  const [deleteTest, { loading: deleting }] = useMutation(DELETE_TEST);
  const [activateGame, { loading: activating }] = useMutation(ACTIVATE_GAME);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    refetch && refetch();
  }, [refetch]);
  
  const handleActivateGame = UUID => () => {
    activateGame({ variables: { testUUID: UUID } }).then(
      ({
        data: {
          activateGame: { CODE }
        }
      }) => {
        toast.success("Activating Test Successful");
        localStorage.setItem(`isAdmin:${CODE}`, "true");
        history.push(`/activetests/${CODE}`);
      }
    );
  };

  const handleShowDeleteButton = UUID => {
    const isCreatorLS =
      JSON.parse(localStorage.getItem(`isCreator:${UUID}`)) || false;

    return isCreatorLS;
  };

  const handleDelete = (id, UUID) => () => {
    setDisabled(true);
    if (loading || deleting) return;

    deleteTest({ variables: { id: [id] } }).then(data => {
      if (data) {
        toast.success("Deleting Test Successful");
        localStorage.removeItem(`isCreator:${UUID}`);
        refetch().then(data => data && setDisabled(false));
      }
    });
  };

  if (loading) return <LinearProgress value={100} />;
  if (error) return <Typography color={themeStyles.error}>Error :(</Typography>;

  return (
    <>
      <LinearProgress
        variant={
          loading || activating || deleting ? "indeterminate" : "determinate"
        }
        value={100}
      />
      <Container>
        <CustomTypography variant="h4" gutterBottom color={themeStyles.textPrimary}>
          List of tests
          <Tooltip title="Reload tests">
            <CustomFab
              size="medium"
              color={themeStyles.primary}
              aria-label="reload"
              onClick={() => refetch()}
            >
              <CachedIcon />
            </CustomFab>
          </Tooltip>
        </CustomTypography>
        <List>
          <AnimatedList key={1} animation={"grow"}>
            {data && data.tests && !data.tests.length && (
              <div key={0}>
                <CustomTypography variant="h5" gutterBottom color={themeStyles.textSecondary}>
                  Sorry, but no one test has been created yet.
                </CustomTypography>
                <ContainerButton>
                  <Link to="/create">
                    <Button color={themeStyles.primary} variant="contained" size="large">
                      Create Test
                    </Button>
                  </Link>
                </ContainerButton>
              </div>
            )}
            {data &&
              data.tests &&
              data.tests.map(({ ID, name, UUID }, index) => (
                <ListItem key={name + ID + index}>
                  <ListItemAvatar>
                    <Avatar>
                      <PermMediaIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                      primary={
                        <StyledTruncate
                        line={1}
                        element="div"
                        truncateText="…"
                        text={name ? name : "incognito"}
                        isDark={theme === 'dark'}
                      />   
                      }
                    />
                  <ListItemSecondaryAction>
                    <Tooltip title="Activate test">
                      <span>
                        <ButtonIcon
                          edge="end"
                          aria-label="activate"
                          disabled={disabled}
                          onClick={handleActivateGame(UUID)}
                        >
                          <PlayCircleFilledWhiteIcon />
                        </ButtonIcon>
                      </span>
                    </Tooltip>
                    <StyledLink
                      to={`/tests/${UUID}`}
                    >
                      <Tooltip title="Edit test">
                        <span>
                          <IconButton
                            edge="start"
                            aria-label="show"
                            disabled={disabled}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </StyledLink>
                    {handleShowDeleteButton(UUID) && (
                      <Tooltip title="Delete Test">
                        <span>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            disabled={disabled}
                            onClick={handleDelete(ID, UUID)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </AnimatedList>
        </List>
      </Container>
    </>
  );
};
