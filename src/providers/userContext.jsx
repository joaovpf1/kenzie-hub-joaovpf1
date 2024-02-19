import { createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { hubApi } from '../service/api';
import { useState } from 'react';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cardList, setCardList] = useState([]);

    const navigate = useNavigate();
    const PostRegister = async (formData) => {
        try {
            await hubApi.post('/users', formData);
            navigate('/');
            toast.success('Cadastro realizado com sucesso.');
        } catch (error) {
            if (error.response.status >= 400) {
                toast.error('Algo deu errado, tenta novamente.')
            }
        }
    }

    const loginRequest = async (formData) => {
        try {
            const { data } = await hubApi.post('/sessions', formData);
            setUser(data.user.name);
            setModule(data.user.course_module);
            localStorage.setItem('@TOKEN', data.token);
            localStorage.setItem('@ID', data.user.id);
            navigate('/dashboard');
            toast.success('Login feito com sucesso, você será redirecionado(a) para a dashboard')
        } catch (error) {
            if (error.response.status >= 400) {
                toast.error('E-mail ou senha incorretos.')
            }
        }
    }

    const dashboardLogout = () => {
        setUser(null);
        setModule('');
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@ID');
        navigate('/');
    }

    useEffect(() => {
        const token = localStorage.getItem('@TOKEN');
        const autoLogin = async () => {
            try {
                setLoading(true);
                const { data } = await hubApi.get('/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(data.name);
                setModule(data.course_module);
                navigate('/dashboard');
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            autoLogin();
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser, PostRegister, loginRequest, module, setModule, dashboardLogout, loading, cardList, setCardList }}>
            {children}
        </UserContext.Provider>
    )
}