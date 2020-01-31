import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
import { Backdrop, CircularProgress, LinearProgress } from '@material-ui/core';

import CircleTimer from './CircleTimer';

import { ONPLAYING_GAME, QUESTION_BY_UUID, ANSWER_QUESTION_DY_UUID } from './graphql';

import { ALPHABET } from './constants';

import {
  CustomTypography, Container, ButtonAnswer,
  ContainerAnswers, ContainerTimer, Wrapper, WrapperComponent,
} from './styles';

const StartTestPage = () => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const urlArray = pathname.split('/');
  const urlUUIDPlayer = urlArray[urlArray.length - 1];
  const urlCode = urlArray[urlArray.length - 3];

  const [data, setNewData] = useState({
    currentQuestionUUID: '',
    gameCode: '',
    gameStatusEnum: '',
    startTimeSec: 0,
    currentTimeSec: 0,
  });
  const [isAnswered, setAnswer] = useState(null);
  const [isRightAnswer, setRightAnswer] = useState('');

  const { loading, error, data: questionData } = useQuery(QUESTION_BY_UUID(data.currentQuestionUUID));

  const { data: playingData, loading: playingLoading } = useSubscription(ONPLAYING_GAME, {
    variables: {
      gameCode: urlCode,
      playerUUID: urlUUIDPlayer,
    }
  });

  const [answeredQuestion] = useMutation(ANSWER_QUESTION_DY_UUID);

  const handleAnsweredQuestion = (index) => (e) => {
    answeredQuestion({
      variables: {
        playerUUID: urlUUIDPlayer,
        questionUUID: questionData.questionByUUID.UUID,
        rightAnswer: index,
      },
    }).then((data) => {
      data.data && setAnswer(index);
      setRightAnswer(questionData.questionByUUID.rightAnswer === index ? 'Yes' : 'No');
      console.log(questionData.questionByUUID.rightAnswer, index);
    });
  };

  useEffect(() => {
    if (!playingLoading && playingData) {
      const { onPlayingGame } = playingData;
      setNewData(onPlayingGame);
      if (data.currentQuestionUUID !== onPlayingGame.currentQuestionUUID) {
        setAnswer(null);
        setRightAnswer('');
      }
    }
  }, [playingData, playingLoading]);

  if (loading) return <LinearProgress />;
  if (error) return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );

  return (
    <Wrapper>
      {data.gameStatusEnum !== 'FINISHED' ? (
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
                  <CustomTypography  variant="h5" gutterBottom >
                    {questionData && questionData.questionByUUID.text}
                  </CustomTypography>
                  <ContainerAnswers>
                    {questionData && questionData.questionByUUID.answers.map((answer, index) => (
                      <ButtonAnswer
                        variant="outlined"
                        onClick={handleAnsweredQuestion(index)}
                        disabled={!(isAnswered === null)}
                        isRed={isRightAnswer === 'No' && isAnswered === index}
                        isGreen={isRightAnswer === 'Yes' && isAnswered === index}
                      >
                        {`${ALPHABET[index]}) ${answer.text}`}
                      </ButtonAnswer>
                    ))}
                  </ContainerAnswers>
              </WrapperComponent>
            </>
          )}
        </>
      ) : (
        <p>
          Results: {data.gameStatusEnum}
        </p>
      )}
    </Wrapper>
  );
};

export default StartTestPage;
