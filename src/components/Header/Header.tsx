import React from "react";
import { AppBar, Toolbar, Avatar, IconButton, Button } from "@mui/material";
import { useAppContext } from "../../provider/AppContext";
import { Link, useLocation } from "react-router-dom";

interface HeaderProps {
  avatarUrl?: string;
  onAvatarClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ avatarUrl, onAvatarClick }) => {
  const location = useLocation();
  const { selectedTab, setSelectedTab } = useAppContext();

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            color={
              location.pathname === "/decks" && "Deck" === selectedTab
                ? "primary"
                : "inherit"
            }
            component={Link}
            to="/decks"
            onClick={() => handleTabClick("Deck")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Deck
          </Button>
          <Button
            color={
              location.pathname === "/resultados" &&
              "Resultados" === selectedTab
                ? "primary"
                : "inherit"
            }
            component={Link}
            to="/resultados"
            onClick={() => handleTabClick("Resultados")}
            sx={{ textTransform: "none", fontWeight: 600, marginLeft: 2 }}
          >
            Resultados
          </Button>
        </div>
        {avatarUrl && (
          <IconButton onClick={onAvatarClick} sx={{ padding: 0 }}>
            <Avatar src={avatarUrl} sx={{ width: 40, height: 40 }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
