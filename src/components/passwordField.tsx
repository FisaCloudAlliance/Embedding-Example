import React, { useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { isEdge } from "react-device-detect";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const PasswordField: React.FCX<TextFieldProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  if (isEdge) {
    return <TextField type={showPassword ? "text" : "password"} {...props} />;
  }
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={() => setShowPassword(!showPassword)}
              color="primary"
            >
              {showPassword ? (
                <VisibilityOutlinedIcon />
              ) : (
                <VisibilityOffOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
