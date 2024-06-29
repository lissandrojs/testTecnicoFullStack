import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from '@mui/material';
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import api from "../../services/api.js";
import { toast } from "react-toastify";


const Dashboard = () => {
    const [infoUser,setInfoUser] = useState()
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const exitPage = () => {
        logout();
        navigate("/login");
    };

    useEffect(()=>{
        api.get("auth/profile").then((resp) => {
            toast.success("Conta criada com sucesso");
            setInfoUser(resp.data)
        })
        .catch((error) => {
            console.log(error);
            toast.error("Erro ao criar a conta, tente um email diferente");
        });
    },[  ])

    return (
        <Container>
            <Box>
                <Typography variant="h5">
                    Bem vindo
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={exitPage} >
                        Sair
                </Button>
            </Box>

            <Box>
                <Typography variant="h6">
                    Olá, {infoUser ? infoUser?.name : "Usuário"}
                </Typography>
                <Typography variant="body1">
                    {infoUser ? infoUser?.email : ""}
                </Typography>
            </Box>
        </Container>
    );
};

export default Dashboard;