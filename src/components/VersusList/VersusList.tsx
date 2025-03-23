import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface VersusResult {
  player1: string;
  player2: string;
  result: string;
}

interface CardItem {
  date: string;
  versusResults: VersusResult[];
}

const VersusList: React.FC = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [newCard, setNewCard] = useState<CardItem>({
    date: "",
    versusResults: [],
  });
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [newVersusResult, setNewVersusResult] = useState<VersusResult>({
    player1: "",
    player2: "",
    result: "",
  });

  const handleAddCard = () => {
    setCards([...cards, newCard]);
    setNewCard({ date: "", versusResults: [] });
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddVersusResult = () => {
    setNewCard({
      ...newCard,
      versusResults: [...newCard.versusResults, newVersusResult],
    });
    setNewVersusResult({ player1: "", player2: "", result: "" });
    handleCloseDialog();
  };

  const handleDeleteCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  return (
    <div>
      <TextField
        label="Data do Card"
        value={newCard.date}
        onChange={(e) => setNewCard({ ...newCard, date: e.target.value })}
      />
      <Button variant="contained" onClick={handleOpenDialog}>
        Adicionar Versus
      </Button>
      <Button variant="contained" onClick={handleAddCard}>
        Adicionar Card
      </Button>

      <List>
        {cards.map((card, cardIndex) => (
          <ListItem key={cardIndex}>
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{card.date}</Typography>
                <List>
                  {card.versusResults.map((result, resultIndex) => (
                    <ListItem key={resultIndex}>
                      <ListItemText
                        primary={`${result.player1} vs ${result.player2}`}
                        secondary={`Resultado: ${result.result}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <IconButton onClick={() => handleDeleteCard(cardIndex)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Adicionar Resultado Versus</DialogTitle>
        <DialogContent>
          <TextField
            label="Jogador 1"
            value={newVersusResult.player1}
            onChange={(e) =>
              setNewVersusResult({
                ...newVersusResult,
                player1: e.target.value,
              })
            }
          />
          <TextField
            label="Jogador 2"
            value={newVersusResult.player2}
            onChange={(e) =>
              setNewVersusResult({
                ...newVersusResult,
                player2: e.target.value,
              })
            }
          />
          <TextField
            label="Resultado"
            value={newVersusResult.result}
            onChange={(e) =>
              setNewVersusResult({ ...newVersusResult, result: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddVersusResult}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VersusList;
