import React, { useState } from "react";
import {
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanel
} from "@material-ui/core";
import { AnimatedList } from "react-animated-list";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";

import {
  editTestImage,
  joinTestImage,
  startTestImage,
  waitingChatImage,
  playingGameImage,
  finishTableImage,
  createResultImage,
  waitingPlayersImage,
  createTestNameImage,
  editChooseTestImage,
  createNewQuestionsImage,
  createQuestionAndAnswersImage
} from "./images";

import useStyles, { Link } from "./styles";

export const DocumentationPage = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <AnimatedList animation={"grow"}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 1:</b> Create test
            </Typography>
            <Typography className={classes.secondaryHeading}>
              If you need to create test
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              <b>You can create a test.</b> It is very simple. You will need to
              fill out several fields, do not worry, they can be edited in the
              future if you make a mistake. For example:
            </Typography>
            <img
              src={createTestNameImage}
              className={classes.image}
              alt="CreateTest Name"
            />
            <Typography>
              <b>You can create a question and answers.</b>
              <b>Required fields:</b> name of test, question and at least 2
              answers to the question. For example:
            </Typography>
            <img
              src={createQuestionAndAnswersImage}
              className={classes.image}
              alt="Create Question And Answers"
            />
            <Typography>
              <b>If you need to create other question.</b> Click "Yes" button.
              For example:
            </Typography>
            <img
              src={createNewQuestionsImage}
              className={classes.image}
              alt="Create New Questions"
            />
            <Typography>
              <b>If you don't need to create other question.</b> Click "No"
              button and you will see:
            </Typography>
            <img
              src={createResultImage}
              className={classes.image}
              alt="Create Result"
            />
            <Typography>
              All fields cannot have less than 4 characters, please consider
              this.
            </Typography>
            <Link to="/create" className={classes.link}>
              Go to Create Test
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 2:</b> Edit test
            </Typography>
            <Typography className={classes.secondaryHeading}>
              If you need to edit test
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              <b>You can edit a test.</b> It is very simple. Click to the Link
              after this text. After that you can see list of already creating
              tests. If you want to edit test, you will need find the button by
              name "Edit test". Click to here.
            </Typography>
            <img
              src={editChooseTestImage}
              className={classes.image}
              alt="Edit Choose Test"
            />
            <Typography>
              And edit some needing things (Click to "Edit" button or change the
              right answer:
            </Typography>
            <img
              src={editTestImage}
              className={classes.image}
              alt="Edit Test"
            />
            <Link to="/tests" className={classes.link}>
              Go to Edit Test
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 3:</b> Start and join game
            </Typography>
            <Typography className={classes.secondaryHeading}>
              You can play game with other people online
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              <b>You can start a game.</b> Click to the Link after this text.
              After that you can see list of already creating tests. If you want
              to start test, you will need find the button by name "Activate
              test". Click to here and choose your name.
            </Typography>
            <img
              src={startTestImage}
              className={classes.image}
              alt="Start Test"
            />
            <Link to="/tests" className={classes.link}>
              Go to Start Test
            </Link>
            <Typography>
              <b>And you can join a game.</b> Click to the Link after this text.
              After that you can see list of already activating tests. If you
              want to join, you will need find the button by name "Join toward
              active test". Click to here and choose your name.
            </Typography>
            <img
              src={joinTestImage}
              className={classes.image}
              alt="Join Test"
            />
            <Link to="/activetests" className={classes.link}>
              Go to Join Test
            </Link>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 4:</b> Waiting people
            </Typography>
            <Typography className={classes.secondaryHeading}>
              If you want to play with people, you will need to wait them.
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              If you are not the creator of the test, you will not have the
              opportunity to press the "Start test" button. You need to wait for
              the administrator to run the test. If you are an administrator, to
              start the game, when you wait for all your friends, click the
              "Start button".
            </Typography>
            <img
              src={waitingPlayersImage}
              className={classes.image}
              alt="Waiting Players"
            />
            <Typography>
              You can also chat online with the guys you are going to play with,
              share your achievements and just have a good time.
            </Typography>
            <img
              src={waitingChatImage}
              className={classes.image}
              alt="Waiting Chat"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5bh-content"
            id="panel5bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 5:</b> Play Game
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Play Game
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              When the game is running in the left corner you will see a timer -
              the time for which you need to answer the question. If you do not
              have time to answer the question, it will not be protected. You
              can see whether your answer is correct or not by highlighting the
              button pressed: if it is red, you answered incorrectly. If green -
              you guessed it, well done.
            </Typography>
            <img
              src={playingGameImage}
              className={classes.image}
              alt="Playing Game"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6bh-content"
            id="panel6bh-header"
            className={classes.summary}
          >
            <Typography className={classes.heading}>
              <b>Step 6:</b> Finish Table
            </Typography>
            <Typography className={classes.secondaryHeading}>
              You can see the results
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.content}>
            <Typography>
              After completing all the answers, you will see a summary table in
              which you can see the number of correct answers and compare the
              total number of points scored by you and your partners.
            </Typography>
            <img
              src={finishTableImage}
              className={classes.image}
              alt="Finish Table"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </AnimatedList>
    </div>
  );
};
