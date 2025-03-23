import { Box } from "@mui/material";
import React from "react";
import VersusList from "../../components/VersusList/VersusList";
import { BeySpin } from "../../components/BeySpin/BeySpin";

const ResultsPage: React.FC = () => {
  return (
    <Box>
      <VersusList />
      <BeySpin src="images/DranzerSpiral.png" alt="Rotating Icon" />
    </Box>
  );
};

export default ResultsPage;
