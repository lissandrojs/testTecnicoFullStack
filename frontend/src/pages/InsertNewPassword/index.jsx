import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Button, TextField, Typography, Box, FormControl } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';


const InsertNewPassword = () =>{
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    const idUser =  searchParams.get('id')

    const schema = yup.object().shape({
        password: yup.string().required("Campo Obrigatório"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmitRecover = ({ password }) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        api.patch(`users/recover/${idUser}`, {password},config).then((resp) => {
            toast.success("senha alterada com sucesso");
            navigate('/login')
        })
        .catch((error) => {
            toast.error("Algo de errado ao alterar a senha. ");
            console.log(error);
        });
    };

    return (
            <Box component="form" onSubmit={handleSubmit(onSubmitRecover)}>
                    <Typography variant="h4" component="h3" gutterBottom>
                        Cadastrar nova Senha
                    </Typography>
                    <TextField
                        label="Senha"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Box mt={1}>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                        >
                            Enviar
                        </Button>
                    </Box>
            </Box>
    )
}

export default InsertNewPassword