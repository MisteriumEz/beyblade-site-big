import { Typography, Container, Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomeComponent() {
  const navigate = useNavigate();

  const StyledBox = styled(Box)({
    position: "relative", // Necessário para posicionar o texto sobre a imagem
    width: "200px",
    height: "200px",
  });

  const StyledImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "fill", // Garante que a imagem cubra o Box
  });

  const StyledText = styled(Typography)({
    textAlign: "center",
    gutterBottom: true,
    color: "black", // Cor do texto
    fontSize: "1.5rem", // Tamanho do texto
    fontWeight: "bold", // Peso do texto
  });

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80%",
        }}
      >
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          sx={{ minWidth: "auto" }}
        >
          Bem vindo ao Site (protótipo) da OBB
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          gutterBottom
          sx={{ minWidth: "auto" }}
        >
          Escolha se deseja montar seu Deck ou colocar seus resultados
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <StyledBox
            onClick={() => navigate("/decks")}
            sx={{ ":hover": { opacity: 0.7 } }}
          >
            <StyledImage src={"images/3ON3.png"} alt="Imagem com texto" />
            <StyledText>Deck</StyledText>
          </StyledBox>
          <StyledBox
            onClick={() => navigate("/resultados")}
            sx={{ ":hover": { opacity: 0.7 } }}
          >
            <StyledImage src={"images/Torneio.png"} alt="Imagem com texto" />
            <StyledText>Resultados</StyledText>
          </StyledBox>
        </Box>
      </Box>
    </Container>
  );
}
