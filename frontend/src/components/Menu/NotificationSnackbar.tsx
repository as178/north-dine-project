import React from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationSnackbarProps {
  open: boolean;
  onClose: () => void;
}

const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          background: "linear-gradient(to left, #187817, #00260a)",
          color: "#ffffff",
          textShadow: "0 0 2px #ffffff",
          boxShadow: "0 5px 10px #000000",
          "& .MuiAlert-icon": {
            color: "#ffffff",
          },
        }}
      >
        Item placed in your reservation
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
