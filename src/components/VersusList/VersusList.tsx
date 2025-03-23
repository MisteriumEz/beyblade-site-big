import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Container,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Todo {
  id: string;
  hisPoint: string;
  myPoint: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [myPoint, setMyPoint] = useState<string>("");
  const [hisPoint, setHisPoint] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (myPoint.trim() && hisPoint.trim()) {
      setTodos([
        ...todos,
        { id: Date.now().toString(), hisPoint: hisPoint, myPoint: myPoint },
      ]);
      setMyPoint("");
      setHisPoint("");
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="sm">
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Meus resultados
        </Typography>
        <Box display="flex" gap={1} alignItems="center" justifyContent="center">
          <TextField
            fullWidth
            label="Minha pontuação"
            type="number"
            value={myPoint}
            onChange={(e) => setMyPoint(e.target.value)}
          />
          <Typography>VS</Typography>
          <TextField
            fullWidth
            label="Pontuação do adversário"
            type="number"
            value={hisPoint}
            onChange={(e) => setHisPoint(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddTodo}
            disabled={!myPoint || !hisPoint}
            sx={{ height: "100%", minWidth: "auto" }}
          >
            Adicionar
          </Button>
        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                marginBottom: "8px",
                backgroundColor:
                  parseInt(todo.myPoint) > parseInt(todo.hisPoint)
                    ? "rgba(0, 255, 0, 0.1)"
                    : parseInt(todo.myPoint) < parseInt(todo.hisPoint)
                    ? "rgba(255, 0, 0, 0.1)"
                    : "inherit",
              }}
            >
              <ListItemText
                primary={`Eu: ${todo.myPoint} vs Adversário(a): ${todo.hisPoint}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default TodoList;
