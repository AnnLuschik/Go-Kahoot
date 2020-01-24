import React from 'react';

import TestStep from '../TestStep';
import FinishStep from '../FinishStep';
import QuestionStep from '../QuestionStep';
import ValidateQuestionStep from '../ValidateQuestionStep';

export const getStepContent = (
  stepIndex, ID, setID, handleBack, handleNext, handleReset,
) => {
  switch (stepIndex) {
    case 0:
      return <TestStep setID={setID} handleNext={handleNext} />;
    case 1:
      return <QuestionStep testID={ID} handleNext={handleNext} />;
    case 2:
      return <ValidateQuestionStep testID={ID} handleBack={handleBack} handleNext={handleNext}/>;
    case 3:
      return <FinishStep handleReset={handleReset}/>;
    default:
      return 'Unknown stepIndex';
  }
};
