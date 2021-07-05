import React, { useEffect, useState } from "react";
import * as showdown from "showdown";
import ReactMarkdown from "react-markdown";
import { useHistory } from "react-router-dom";
import { AnimatedList } from "react-animated-list";
import * as showdownHighlight from "showdown-highlight";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Backdrop, CircularProgress, LinearProgress } from "@material-ui/core";

import { CircleTimer } from "./CircleTimer";
import { Chart } from "../../../Chart";

import {
  ON_PLAYING_GAME,
  QUESTION_BY_UUID,
  ANSWER_QUESTION_DY_UUID
} from "./graphql";

import { ALPHABET } from "./constants";

import useStyles, {
  ButtonAnswer,
  ContainerAnswers,
  ContainerTimer,
  Wrapper,
  WrapperComponent
} from "./styles";
import { Typography } from "@material-ui/core";

const converter = new showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  openLinksInNewWindow: true,
  extensions: [showdownHighlight]
});

export const Game = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    location: { pathname }
  } = history;
  const urlArray = pathname.split("/");
  const urlUUIDPlayer = urlArray[urlArray.length - 1];
  const urlCode = urlArray[urlArray.length - 3];

  const [rightAnswers, setRightAnswers] = useState([]);
  const [data, setNewData] = useState({
    currentQuestionUUID: "",
    gameCode: "",
    gameStatusEnum: "",
    startTimeSec: 0,
    currentTimeSec: 0
  });
  const [isDoubleAnswer, setIsDoubleAnswer] = useState(false);
  const [isAnswered, setIsAnswer] = useState(null);
  const [isRightAnswer, setIsRightAnswer] = useState("");

  const { loading, error, data: questionData } = useQuery(
    QUESTION_BY_UUID(data.currentQuestionUUID)
  );
  const [answeredQuestion] = useMutation(ANSWER_QUESTION_DY_UUID);
  const { data: playingData, loading: playingLoading } = useSubscription(
    ON_PLAYING_GAME,
    {
      variables: { gameCode: urlCode, playerUUID: urlUUIDPlayer }
    }
  );

  const handleAnsweredQuestion = (sequential, ID) => () => {
    answeredQuestion({
      variables: {
        playerUUID: urlUUIDPlayer,
        questionUUID: questionData.questionByUUID.UUID,
        answerID: ID
      }
    }).then(data => {
      data.data && setIsAnswer(sequential);
      setIsRightAnswer(
        questionData.questionByUUID.rightAnswer === sequential ? "Yes" : "No"
      );
    });
  };

  const handleRedirectToFinishPage = () => {
    history.push(`/activetests/${urlCode}/game/${urlUUIDPlayer}/finishtable`);
  };

  useEffect(() => {
    setIsDoubleAnswer(false);
    if (!playingLoading && playingData) {
      const { onPlayingGame } = playingData;
      setNewData(onPlayingGame);

      onPlayingGame.answers.length &&
        setRightAnswers(
          questionData &&
            questionData.questionByUUID.answers.map(({ ID }, index) => {
              const answersForID = onPlayingGame.answers.filter(
                answer => answer.answerID === ID
              );

              const count =
                answersForID &&
                answersForID.length &&
                answersForID[0].players &&
                answersForID[0].players.length;

              // TODO Some logic for count right answers.
              // const count =
              //   answersForID.length &&
              //   answersForID[0].players &&
              //   answersForID[0].players.filter(
              //     ({ wasRight }) => wasRight === true
              //   ).length;

              return {
                answerID: ID,
                name: ALPHABET[index],
                rightAnswers: count
              };
            })
        );

      if (data.currentQuestionUUID !== onPlayingGame.currentQuestionUUID) {
        setIsAnswer(null);
        setIsRightAnswer("");
        setRightAnswers([]);
      }
    }
  }, [playingData, playingLoading, data, questionData]);

  if (loading) return <LinearProgress value={100} />;
  if (error)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <>
      <LinearProgress
        variant={loading ? "indeterminate" : "determinate"}
        value={100}
      />
      <Wrapper>
        {data.gameStatusEnum !== "FINISHED" ? (
          <>
            {questionData && (
              <>
                <div
                  style={{
                    height: "max-content",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}
                >
                  <ContainerTimer>
                    <CircleTimer
                      startTimeSec={data.startTimeSec}
                      currentTimeSec={data.currentTimeSec}
                    />
                  </ContainerTimer>
                  <Chart data={rightAnswers} />
                </div>

                <WrapperComponent>
                  <AnimatedList animation={"grow"}>
                    <div>
                      <ReactMarkdown
                        className={classes.markDownQuestion}
                        source={converter.makeHtml(
                          questionData && questionData.questionByUUID.text
                        )}
                        escapeHtml={false}
                      />
                    </div>
                    <ContainerAnswers>
                      {questionData &&
                        questionData.questionByUUID.answers.map(
                          ({ ID, text, sequential }, index) => {
                            const isRed = (
                              isRightAnswer === "No" &&
                              isAnswered === sequential
                            ).toString();
                            const isGreen = (
                              isRightAnswer === "Yes" &&
                              isAnswered === sequential
                            ).toString();

                            return (
                              <ButtonAnswer
                                key={ID + index}
                                variant="outlined"
                                isred={isRed}
                                isgreen={isGreen}
                                disabled={
                                  !(isAnswered === null) || isDoubleAnswer
                                }
                                onClick={handleAnsweredQuestion(sequential, ID)}
                              >
                                <div
                                  style={{
                                    borderRight: "1px solid #c2c2c2",
                                    borderBottom: "1px solid #c2c2c2"
                                  }}
                                >
                                  <Typography color="primary">&nbsp;&nbsp;{ALPHABET[index]})&nbsp;&nbsp;</Typography>
                                </div>
                                <ReactMarkdown
                                  className={classes.markDownAnswer}
                                  source={converter.makeHtml(text)}
                                  escapeHtml={false}
                                />
                              </ButtonAnswer>
                            );
                          }
                        )}
                    </ContainerAnswers>
                  </AnimatedList>
                </WrapperComponent>
              </>
            )}
          </>
        ) : (
          handleRedirectToFinishPage()
        )}
      </Wrapper>
    </>
  );
};
