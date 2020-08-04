import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { VisibilityRounded, VisibilityOffRounded } from '@material-ui/icons';

const TextFieldPassword = props => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              color="inherit"
              onClick={()=>setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityRounded /> : <VisibilityOffRounded />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default TextFieldPassword;
