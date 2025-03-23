import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import { Autocomplete } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { bits, blades, photos, ratchets } from "../../utils/optionsValue";
// Utility function to check if an image exists
const checkImageExists = (imageName: string): boolean => {
  if (photos.includes(imageName)) {
    return true;
  } else {
    return false;
  }
};

const AnimatedCard = styled(Card)<{ expanded: boolean }>`
  transition: max-width 0.5s ease-in-out;
  max-width: ${(props) => (props.expanded ? "450px" : "345px")};
  min-width: 345px;
  margin: 16px;
`;

interface ExpandableCardProps {
  readonly card: Beyblade;
  readonly onDelete: (id: number) => void;
  readonly onSave: (card: Beyblade) => void;
}

function ExpandableCard({ onDelete, onSave, card }: ExpandableCardProps) {
  const [expanded, setExpanded] = useState(false);

  const { control, handleSubmit, getValues, setValue } = useForm<Beyblade>({
    defaultValues: card,
  });

  const handleEditClick = () => {
    setExpanded(true);
  };

  const handleSave = (data: Beyblade) => {
    console.log(data);
    setExpanded(false);
    onSave(data);
  };

  const handleCancel = () => {
    setExpanded(false);
    setValue("blade", card.blade);
    setValue("ratchet", card.ratchet);
    setValue("bit", card.bit);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSave)}>
      <AnimatedCard expanded={expanded}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="140"
            image={
              checkImageExists(getValues("blade")?.label)
                ? `src/images/${getValues("blade")?.label}.png`
                : "src/images/NoImage.png"
            }
            alt={getValues("blade")?.label || "blade image"}
          />
          {!expanded && (
            <IconButton
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
                bgcolor: "white",
                ":hover": {
                  color: "white",
                  bgcolor: "red",
                },
              }}
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              color: "blue",
              bgcolor: "white",
              ":hover": {
                color: "white",
                bgcolor: "blue",
              },
            }}
            onClick={() => onDelete(card.id)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <CardContent>
          {expanded ? (
            <Box>
              <Controller
                rules={{ required: true }}
                name="blade"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    sx={{ paddingBottom: "5px", paddingTop: "10px" }}
                    {...field}
                    onChange={(_, data) => {
                      field.onChange(data);
                    }}
                    disableClearable
                    options={blades}
                    renderInput={(params) => (
                      <TextField {...params} label="Blade" />
                    )}
                  />
                )}
              />
              <Controller
                rules={{ required: true }}
                name="ratchet"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    sx={{ paddingBottom: "5px", paddingTop: "5px" }}
                    onChange={(_, data) => {
                      field.onChange(data);
                    }}
                    disableClearable
                    options={ratchets}
                    renderInput={(params) => (
                      <TextField {...params} label="Ratchet" />
                    )}
                  />
                )}
              />
              <Controller
                rules={{ required: true }}
                name="bit"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    sx={{ paddingBottom: "10px", paddingTop: "5px" }}
                    onChange={(_, data) => {
                      field.onChange(data);
                    }}
                    disableClearable
                    options={bits}
                    renderInput={(params) => (
                      <TextField {...params} label="Bits" />
                    )}
                  />
                )}
              />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {getValues("blade")?.label +
                " " +
                getValues("ratchet")?.label +
                " " +
                getValues("bit")?.label || "Novo Bey"}
            </Typography>
          )}
        </CardContent>
      </AnimatedCard>
    </Box>
  );
}

function CardList() {
  const [cards, setCards] = useState<Beyblade[]>([]);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards") || "[]");
    setCards(storedCards);
  }, []);

  const handleAddCard = () => {
    if (cards.length < 3) {
      const newCard: Beyblade = {
        id: Date.now(),
        blade: blades[0],
        ratchet: ratchets[0],
        bit: bits[0],
      };
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      localStorage.setItem("cards", JSON.stringify(updatedCards));
    }
  };

  const handleDeleteCard = (id: number) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleSaveCard = (updatedCard: Beyblade) => {
    console.log("UPDATE CARD", updatedCard.id);
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? updatedCard : card
    );

    setCards(updatedCards);
    console.log("CARDS", updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexWrap={"wrap"}
      flexDirection={"column"}
    >
      {cards.map((card) => (
        <ExpandableCard
          key={card.id}
          card={card}
          onDelete={handleDeleteCard}
          onSave={handleSaveCard}
        />
      ))}
      {cards.length < 3 && (
        <IconButton onClick={handleAddCard}>
          <AddIcon />
        </IconButton>
      )}
    </Box>
  );
}

export default CardList;
