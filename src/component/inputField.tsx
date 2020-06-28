import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { IPropsText } from "../interfaces/index";

const InputField = (props: IPropsText) => {
  const [val, setValue] = useState();

  const handleEnterTeamName = (event: any) => {
    if (event.target.id === props.id) {
      setValue(event.target.value);
    }

    if (+event.keyCode === 13) {
      props.onHandleChange({ text: val, id: props.id });
    }
  };
  return (
    <div>
      <TextField
        id={props.id}
        style={{ margin: "1px", backgroundColor: "white ", width: "98%" }}
        placeholder={props.placeholder}
        fullWidth
        margin="normal"
        value={val}
        onKeyUp={handleEnterTeamName}
        onChange={handleEnterTeamName}
        InputLabelProps={{
          shrink: true
        }}
        variant="outlined"
      />
    </div>
  );
};

export default InputField;
