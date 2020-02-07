import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextTruncate from "react-text-truncate";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
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
  Cancel as CancelIcon,
  Cached as CachedIcon,
  AlarmOn as AlarmOnIcon,
  FlightTakeoff as FlightTakeoffIcon
} from "@material-ui/icons";

import { ACTIVATED_GAMES, DEACTIVATE_TEST } from "./graphql";

import {
  Container,
  CustomTypography,
  Button,
  ContainerButton,
  ButtonIcon,
  CustomFab,
  ListItemText
} from "./styles";
import { Link } from "../../styles";

const ActiveTests = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const { loading, error, data, refetch } = useQuery(ACTIVATED_GAMES);
  const [deactivateTest, { loading: deactivating }] = useMutation(
    DEACTIVATE_TEST
  );

  refetch && refetch();

  const handleShowDeactivateButton = CODE => {
    const isAdminLS =
      JSON.parse(localStorage.getItem(`isAdmin:${CODE}`)) || false;

    return isAdminLS;
  };

  const handleDeactivate = CODE => () => {
    setDisabled(true);
    if (deactivating || loading) return;

    deactivateTest({ variables: { codes: [CODE] } }).then(() => {
      toast.success("Deactivating Test Successful");
      localStorage.removeItem(`isAdmin:${CODE}`);
      refetch().then(data => data && setDisabled(false));
    });
  };

  const handleJoinGame = CODE => () => {
    history.push(`/activetests/${CODE}`);
  };

  if (loading) return <LinearProgress value={100} />;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <LinearProgress
        variant={loading || deactivating ? "indeterminate" : "determinate"}
        value={100}
      />
      <Container>
        <CustomTypography variant="h4" gutterBottom>
          List of Active Tests
          <Tooltip title="Reload active tests">
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
          {data && data.activatedGames && !data.activatedGames.length && (
            <>
              <CustomTypography variant="h5" gutterBottom>
                Sorry, but no one test has been activated yet.
              </CustomTypography>
              <ContainerButton>
                <Link to="/tests">
                  <Button size="large" color="primary" variant="contained">
                    Activate Test
                  </Button>
                </Link>
              </ContainerButton>
            </>
          )}
          {data &&
            data.activatedGames &&
            data.activatedGames.map(
              ({ CODE, test: { ID, name, UUID } }, index) => (
                <ListItem key={name + ID + index}>
                  <ListItemAvatar>
                    <Avatar>
                      <AlarmOnIcon />
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
                    <Tooltip title="Join toward active test">
                      <ButtonIcon
                        edge="end"
                        aria-label="join"
                        disabled={disabled}
                        onClick={handleJoinGame(CODE)}
                      >
                        <FlightTakeoffIcon />
                      </ButtonIcon>
                    </Tooltip>
                    {handleShowDeactivateButton(CODE) && (
                      <Tooltip title="Deactivate test">
                        <IconButton
                          edge="end"
                          aria-label="deactivate"
                          disabled={disabled}
                          onClick={handleDeactivate(CODE)}
                        >
                          <CancelIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )}
        </List>
      </Container>
    </>
  );
};

export default ActiveTests;
