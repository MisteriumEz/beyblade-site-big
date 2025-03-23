import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao Gerenciador de Campeonatos Beyblade!
      </Typography>
      <Typography variant="h6" component="p">
        Crie, gerencie e acompanhe torneios de Beyblade com facilidade.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate("/login")}
        >
          Entrar
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Criar Conta
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
