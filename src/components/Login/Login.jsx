import { Link} from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from './LoginSchema';
import logo from '../../assets/Logo.svg';
import styles from '../Login/login.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../providers/userContext';

export const Login = ( ) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
    });

    const {loginRequest} = useContext(UserContext);

    const submit = (formData) => {
        loginRequest(formData)
    }

    return (
        <section className={styles.container}>

            <img src={logo} alt='Logo kenzie hub' />

            <div className={styles.formContainer}>
                <p className={styles.login}>Login</p>

                <form onSubmit={handleSubmit(submit)}>
                    <div>
                        <label>Email</label>
                        <input placeholder='Digite seu email aqui...' type='email' {...register('email')} />
                         <span>{errors.email?.message}</span> 
                    </div>

                    <div>
                        <label>Senha</label>
                        <input placeholder='Digite sua senha aqui...' type='password' {...register('password')} />
                        <span>{errors.password?.message}</span>
                    </div>

                    <button className={styles.loginBttn} type='submit'> Entrar</button>
                </form>

                <div>
                    <p>Ainda não possui uma conta?</p>
                    <Link to='/register'>
                        <button>Cadastre-se</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}