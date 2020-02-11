import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from "@material-ui/core";
import { AnimatedList } from "react-animated-list";

import useStyles from "./styles";

const AboutPage = () => {
  const classes = useStyles();

  return (
    <>
      <AnimatedList animation={"grow"}>
        <Typography className={classes.typography} variant="h3" gutterBottom>
          Developers:
        </Typography>
        <div className={classes.root}>
          <Card className={classes.content}>
            <CardContent>
              <img
                src="https://avatars0.githubusercontent.com/u/4964014?s=400&v=4"
                alt="Sergey Telpuk"
                className={classes.image}
              />
            </CardContent>
            <CardActions>
              <a
                className={classes.link}
                href="https://github.com/sergey-telpuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="large">Link to GitHub</Button>
              </a>
            </CardActions>
          </Card>
          <Card className={classes.content}>
            <CardContent>
              <img
                src="https://avatars2.githubusercontent.com/u/40957866?s=460&v=4"
                alt="Victor Rodzko"
                className={classes.image}
              />
            </CardContent>
            <CardActions>
              <a
                className={classes.link}
                href="https://github.com/sergey-telpuk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="large">Link to GitHub</Button>
              </a>
            </CardActions>
          </Card>
        </div>
      </AnimatedList>
    </>
  );
};

export default AboutPage;
