import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Button, TextField, Typography, Box, FormControl } from '@mui/material';


const RecoverPassword = () =>{
    const navigate = useNavigate()
    const { isAuthenticated, login } = useAuth();

    const schema = yup.object().shape({
        email: yup.string().email("E-mail inválido").required("Campo Obrigatório"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmitRecover = ({ email}) => {
        const newLog = {
            email,
        };
        
        api.post("users/resetPassword", newLog).then((resp) => {
            navigate('/login')
        })
        .catch((error) => {
            toast.error("Email incorretos");
            console.log(error);
        });
    };

    return (
        <>
        <Box>
            <FormControl onSubmit={handleSubmit(onSubmitRecover)}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Recuperar Senha
                    </Typography>
                    <TextField
                        label="E-Mail"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <Box mt={1}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Enviar
                        </Button>
                    </Box>
            </FormControl>
        </Box>
        </>
    )
}

export default RecoverPassword