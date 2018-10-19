import React from 'react';
import TextField from '@material-ui/core/TextField';

const textFieldInput = (props) => {
  return (
    <TextField
          id={props.name}
          label={props.label}
          value={props.input.value}
          margin="normal"
          onChange={props.input.onChange}
          helperText={props.helperText}
        />
  );
};

export default textFieldInput;