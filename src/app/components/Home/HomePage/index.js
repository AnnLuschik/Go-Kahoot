import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { AnimatedList } from "react-animated-list";

import useStyles, { Container, CustomTypography, Link } from "./styles";

const HomePage = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <AnimatedList animation={"grow"}>
        <Skeleton animation="wave" variant="rect" width="100%" height="70px">
          <CustomTypography variant="h4" gutterBottom>
            Using this application you can:
          </CustomTypography>
        </Skeleton>
        <Container>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Create Tests
              </Typography>
              <Typography variant="h5" component="h2">
                Enter{bull}the{bull}name
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                obligatorily
              </Typography>
              <Typography variant="body2" component="p">
                push the button "Next".
                <br />
                {'"if successful, you will see a notification"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Create Questions
              </Typography>
              <Typography variant="h5" component="h2">
                Enter{bull}the{bull}text
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                obligatorily
              </Typography>
              <Typography variant="body2" component="p">
                push the button "Next".
                <br />
                {'"if successful, you will see a notification"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h4" color="textSecondary" gutterBottom>
                Create Answers
              </Typography>
              <Typography variant="h5" component="h2">
                Enter{bull}the{bull}text
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                and{bull}choose{bull}right{bull}answer
              </Typography>
              <Typography variant="body2" component="p">
                push the button "Next".
                <br />
                {'"if successful, you will see a notification"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Container>
        <CustomTypography variant="h5" gutterBottom>
          After that, you and your friends can take these speed tests to find
          out who is the smartest.
        </CustomTypography>
        <CustomTypography variant="h4" gutterBottom>
          Want to try? Click on 'Start'! Or before reed the "Documentation".
        </CustomTypography>
        <Container>
          <Link to="/create">
            <Skeleton
              animation="pulse"
              variant="rect"
              width="100%"
              height="100%"
            >
              <Button size="large" color="primary" variant="contained">
                Start
              </Button>
            </Skeleton>
          </Link>
          <Link to="/documentation">
            <Skeleton
              animation="pulse"
              variant="rect"
              width="100%"
              height="100%"
            >
              <Button size="large" color="primary" variant="contained">
                Documentation
              </Button>
            </Skeleton>
          </Link>
        </Container>
      </AnimatedList>
    </>
  );
};

export default HomePage;
