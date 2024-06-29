import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { Button, TextField, Typography, Box, FormControl } from "@mui/material";

const Login = ({}) => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const schema = yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo Obrigatório"),
    password: yup.string().required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitLogin = ({ email, password }) => {
    const newLog = {
      email,
      password,
    };
    api
      .post("auth/login", newLog)
      .then((resp) => {
        const { token } = resp.data;
        login(token);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Email ou senha incorretos");
        console.log(error);
      });
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit(onSubmitLogin)}>
        <Typography variant="h4" component="h3" gutterBottom>
          Login
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            label="E-Mail"
            variant="outlined"
            margin="normal"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Senha"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        <Box mt={2} mb={1}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Entrar
          </Button>
        </Box>
        <Link to="/recover-password">
          <Typography variant="a" color="primary">
            Esqueceu sua minha senha? Clique aqui.
          </Typography>
        </Link>
        <Box mt={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/register")}
            fullWidth
          >
            Cadastre-se
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
