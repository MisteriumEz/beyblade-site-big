/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Link,
  Divider,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { Google } from "@mui/icons-material";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  function login() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, " " + errorMessage);
      });
  }

  function loginformGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;

        console.log(user);
        console.log(token);
        console.log(error);
      })
      .catch((error) => {
        console.log(error);

        login();
      });
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#121212", // Cor de fundo escura
        color: "white",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bem-vindo de volta
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Endereço de e-mail"
          variant="outlined"
          sx={{
            margin: "8px 0",
            width: "300px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          sx={{
            margin: "8px 0",
            width: "300px",
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link
          href="/register"
          variant="body2"
          sx={{
            alignSelf: "flex-start",
            marginLeft: "2px",
            color: "lightblue",
            textDecoration: "none",
          }}
        >
          Esqueceu a senha?
        </Link>

        <Button
          variant="contained"
          sx={{
            margin: "16px 0",
            width: "300px",
            backgroundColor: "#00bcd4", // Cor do botão
            "&:hover": {
              backgroundColor: "#0097a7",
            },
          }}
          type="submit"
        >
          Continuar
        </Button>
      </form>
      <Typography variant="body2" sx={{ margin: "8px 0" }}>
        Não tem uma conta?{" "}
        <Link href="#" sx={{ color: "lightblue", textDecoration: "none" }}>
          Inscrever-se
        </Link>
      </Typography>

      <Divider
        sx={{ width: "300px", margin: "16px 0", backgroundColor: "gray" }}
      >
        OU
      </Divider>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Button
          variant="outlined"
          startIcon={<Google />}
          sx={{ width: "300px", color: "white", borderColor: "gray" }}
          onClick={loginformGoogle}
        >
          Continuar com Google
        </Button>
      </Box>

      <Box sx={{ marginTop: "24px", display: "flex", gap: "16px" }}>
        <Link
          href="#"
          variant="body2"
          sx={{ color: "gray", textDecoration: "none" }}
        >
          Política de Privacidade
        </Link>
        <Link
          href="#"
          variant="body2"
          sx={{ color: "gray", textDecoration: "none" }}
        >
          Termos de Serviço
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;

//   return (
//     <Container maxWidth="xs">
//       <Box sx={{ mt: 8, textAlign: "center" }}>
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleLogin}>
//           <TextField
//             fullWidth
//             label="Email"
//             variant="outlined"
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             fullWidth
//             label="Senha"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//             Entrar
//           </Button>
//         </form>
//       </Box>
//     </Container>

//   );
// };

// export default LoginPage;
