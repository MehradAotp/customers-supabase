import React from "react";
import { Typography, Box, Paper } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        direction: "rtl",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          p: 4,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "error.main",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "error.main",
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            fontFamily: "'Vazirmatn', sans-serif",
          }}
        >
          خطا
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "text.primary",
            fontFamily: "'Vazirmatn', sans-serif",
          }}
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ErrorMessage;
