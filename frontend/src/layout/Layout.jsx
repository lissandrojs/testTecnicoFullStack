import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Avatar,
} from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Avatar alt="user" />
          <Typography variant="h6" component="div">
            New Client
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        sx={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
