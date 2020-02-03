import React from "react";

import TestStep from "../TestStep";
import FinishStep from "../FinishStep";
import QuestionStep from "../QuestionStep";
import ValidateQuestionStep from "../ValidateQuestionStep";

export const getStepContent = (
  stepIndex,
  ID,
  setID,
  UUID,
  setUUID,
  handleBack,
  handleNext,
  handleReset
) => {
  switch (stepIndex) {
    case 0:
      return (
        <TestStep setID={setID} setUUID={setUUID} handleNext={handleNext} />
      );
    case 1:
      return (
        <QuestionStep testID={ID} testUUID={UUID} handleNext={handleNext} />
      );
    case 2:
      return (
        <ValidateQuestionStep
          testID={ID}
          handleBack={handleBack}
          handleNext={handleNext}
        />
      );
    case 3:
      return <FinishStep handleReset={handleReset} />;
    default:
      return "Unknown stepIndex";
  }
};
