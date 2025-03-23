import React from "react";
import { useLocation } from "react-router-dom";
import { ResultsPage, DeckPage } from "..";
import { Header } from "../../components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebaseConfig";
import HomeComponent from "../../components/HomeComponent/HomeComponent";

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
        return <HomeComponent />;
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
