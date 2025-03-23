import { Box } from "@mui/material";
import React from "react";
import CardList from "../../components/Card/CardList";
import { BeySpin } from "../../components/BeySpin/BeySpin";

const DeckPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CardList />
      <BeySpin src="images/DrigerSlash.png" alt="Rotating Icon" />
    </Box>
  );
};

export default DeckPage;
