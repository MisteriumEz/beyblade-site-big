import React from "react";
import { useLocation } from "react-router-dom";
import { ResultsPage, DeckPage } from "..";
import { Header } from "../../components";
import { Box } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";

const HomePage: React.FC = () => {
  const location = useLocation();
  const [user] = useAuthState(auth);

  const renderContent = () => {
    switch (location.pathname) {
      case "/decks":
        return <DeckPage />;
      case "/resultados":
        return <ResultsPage />;
      default:
        return <div></div>;
    }
  };

  return (
    <>
      <Header avatarUrl={user?.photoURL ?? undefined} />
      {renderContent()}
    </>
  );
};

export default HomePage;
