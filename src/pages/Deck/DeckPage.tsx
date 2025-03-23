import { Box } from "@mui/material";
import React from "react";
import CardList from "../../components/Card/CardList";

const DeckPage: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <CardList />
    </Box>
  );
};

export default DeckPage;
