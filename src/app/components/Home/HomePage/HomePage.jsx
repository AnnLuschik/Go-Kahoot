import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import { AnimatedList } from "react-animated-list";

import useStyles, { Container, CustomTypography, Link } from "./styles";

export const HomePage = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <AnimatedList animation={"grow"}>
        <CustomTypography variant="h4" gutterBottom color="textSecondary">
          Using this application you can:
        </CustomTypography>

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
        <CustomTypography variant="h5" gutterBottom color="textSecondary">
          After that, you and your friends can take these speed tests to find
          out who is the smartest.
        </CustomTypography>
        <CustomTypography variant="h4" gutterBottom color="textSecondary">
          Want to try? Click on 'Start'! Or before reed the "Documentation".
        </CustomTypography>
        <Container>
          <Link to="/create">
            <Button size="large" color="primary" variant="contained">
              Start
            </Button>
          </Link>
          <Link to="/documentation">
            <Button size="large" color="primary" variant="contained">
              Documentation
            </Button>
          </Link>
        </Container>
      </AnimatedList>
    </div>
  );
};
