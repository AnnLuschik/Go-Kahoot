import React, { useState } from "react";
import toast from "toastr";
import { useMutation } from "@apollo/client";
import { AnimatedList } from "react-animated-list";
import { LinearProgress } from "@material-ui/core";

import { CREATE_NEW_TEST } from "./graphql";

import { Button, TextField, Typography, Container } from "./styles";

const TestStep = ({ setID, handleNext, setUUID }) => {
  const [name, setName] = useState("");
  const [errorInput, setErrorInput] = useState(false);
  const [createNewTest, { loading, error }] = useMutation(CREATE_NEW_TEST);

  const handleChangeInput = ({ target: { value } }) => {
    setErrorInput(false);
    setName(value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (name.length > 3) {
      createNewTest({ variables: { name } }).then(data => showToast(data));

      return;
    }

    setErrorInput(true);
    toast.warning(
      "You must use at least 4 characters in each field, please make sure that you fill in everything."
    );
  };

  const showToast = ({
    data: {
      createNewTest: { name, ID, UUID }
    }
  }) => {
    toast.success(`Create ${name} Successful`);
    localStorage.setItem(`isCreator:${UUID}`, "true");
    setUUID(UUID);
    setID(ID);
    handleNext();
  };

  if (error) return <p>Error :(</p>;

  return (
    <form onSubmit={handleSubmitForm}>
      <LinearProgress
        variant={loading ? "indeterminate" : "determinate"}
        value={100}
      />
      <AnimatedList animation={"grow"}>
        <Typography variant="h4" gutterBottom>
          Create Test
        </Typography>
        <Container>
          <TextField
            type="text"
            variant="outlined"
            label="Enter Name of Test"
            value={name}
            onChange={handleChangeInput}
            error={errorInput}
            helperText={
              errorInput && "Sorry text is too short, at least 4 characters"
            }
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={errorInput}
          >
            Next
          </Button>
        </Container>
      </AnimatedList>
    </form>
  );
};

export default TestStep;
