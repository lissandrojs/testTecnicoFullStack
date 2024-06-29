import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import api from "../../services/api";


const Register = () => {
    const schema = yup.object().shape({
        email: yup.string().email('Email inválido').required("Email é obrigatório"),
        password: yup.string().min(6, "Mínimo de 6 caracteres").required("Senha é obrigatória"),
        name: yup.string().required("Nome de usuário é obrigatório"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    const onSubmitForm = ({ name, password, email }) => {
        const newUser = {
            email,
            password,
            username: name,
        };

        api.post("users", newUser).then((resp) => {
            toast.success("Conta criada com sucesso");
            return navigate("/login");
        })
        .catch((error) => {
            console.log(error);
            toast.error("Erro ao criar a conta, tente um email diferente");
        });
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="h3" component="h3" color="textPrimary" gutterBottom>
                        Crie sua conta
                    </Typography>
                    {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/login")}
                    >
                        Logar
                    </Button> */}
                </Box>
                <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Box  sx={{
                                display:'flex',
                                justifyContent:'space-around',
                                margin: 5
                            }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"

                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default Register;