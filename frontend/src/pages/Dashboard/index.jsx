import { useNavigate } from "react-router-dom";
import { Button, Typography, Box, Container } from '@mui/material';
import { useAuth } from "../../context/AuthContext.jsx";


const Dashboard = ({ infoUser, authenticated }) => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const exitPage = () => {
        logout();
        navigate("/login");
    };

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