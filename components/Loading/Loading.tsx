import React from "react";
import { Typography, Box, CircularProgress } from "@mui/material";

const Loading: React.FC = () => {
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
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress color="primary" />
        <Typography
          sx={{
            mt: 2,
            color: "primary.main",
            fontFamily: "'Vazirmatn', sans-serif",
            fontWeight: "bold",
          }}
        >
          در حال بارگذاری...
        </Typography>
      </Box>
    </Box>
  );
};

export default Loading;
