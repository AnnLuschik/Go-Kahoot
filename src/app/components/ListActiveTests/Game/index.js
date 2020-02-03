import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useSubscription } from "@apollo/react-hooks";
import { Backdrop, CircularProgress, LinearProgress } from "@material-ui/core";

import CircleTimer from "./CircleTimer";

import {
  ON_PLAYING_GAME,
  QUESTION_BY_UUID,
  ANSWER_QUESTION_DY_UUID
} from "./graphql";

import { ALPHABET } from "./constants";

import {
  CustomTypography,
  ButtonAnswer,
  ContainerAnswers,
  ContainerTimer,
  Wrapper,
  WrapperComponent
} from "./styles";

const StartTestPage = () => {
  const history = useHistory();
  const {
    location: { pathname }
  } = history;
  const urlArray = pathname.split("/");
  const urlUUIDPlayer = urlArray[urlArray.length - 1];
  const urlCode = urlArray[urlArray.length - 3];

  const [data, setNewData] = useState({
    currentQuestionUUID: "",
    gameCode: "",
    gameStatusEnum: "",
    startTimeSec: 0,
    currentTimeSec: 0
  });
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

  const handleAnsweredQuestion = (index, ID) => () => {
    answeredQuestion({
      variables: {
        playerUUID: urlUUIDPlayer,
        questionUUID: questionData.questionByUUID.UUID,
        answerID: ID
      }
    }).then(data => {
      data.data && setIsAnswer(index);
      setIsRightAnswer(
        questionData.questionByUUID.rightAnswer === index ? "Yes" : "No"
      );
    });
  };

  const handleRedirectToFinishPage = () => {
    history.push(`/activetests/${urlCode}/finishtable`);
  };

  useEffect(() => {
    if (!playingLoading && playingData) {
      const { onPlayingGame } = playingData;
      setNewData(onPlayingGame);

      if (data.currentQuestionUUID !== onPlayingGame.currentQuestionUUID) {
        setIsAnswer(null);
        setIsRightAnswer("");
      }
    }
  }, [playingData, playingLoading, data]);

  if (loading) return <LinearProgress />;
  if (error)
    return (
      <Backdrop open={true}>
        <CircularProgress />
      </Backdrop>
    );

  return (
    <>
      <LinearProgress variant={loading ? "indeterminate" : "determinate"} />
      <Wrapper>
        {data.gameStatusEnum !== "FINISHED" ? (
          <>
            {questionData && (
              <>
                <ContainerTimer>
                  <CircleTimer
                    startTimeSec={data.startTimeSec}
                    currentTimeSec={data.currentTimeSec}
                  />
                </ContainerTimer>
                <WrapperComponent>
                  <CustomTypography variant="h5" gutterBottom>
                    {questionData && questionData.questionByUUID.text}
                  </CustomTypography>
                  <ContainerAnswers>
                    {questionData &&
                      questionData.questionByUUID.answers.map(
                        ({ ID, text }, index) => {
                          const isRed =
                            isRightAnswer === "No" && isAnswered === index;
                          const isGreen =
                            isRightAnswer === "Yes" && isAnswered === index;

                          return (
                            <ButtonAnswer
                              variant="outlined"
                              isred={isRed}
                              isgreen={isGreen}
                              disabled={!(isAnswered === null)}
                              onClick={handleAnsweredQuestion(index, ID)}
                            >
                              {`${ALPHABET[index]}) ${text}`}
                            </ButtonAnswer>
                          );
                        }
                      )}
                  </ContainerAnswers>
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

export default StartTestPage;
