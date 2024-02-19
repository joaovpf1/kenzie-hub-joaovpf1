import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from './RegisterSchema.js';
import styles from './register.module.scss';
import logo from '../../assets/Logo.svg';
import { useContext } from 'react';
import { UserContext } from '../../providers/userContext.jsx';

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterSchema),
    });

    const {PostRegister} = useContext(UserContext);

    const submit = (formData) => {
        const objPost = {
            email: formData.email,
            password: formData.password,
            name: formData.name,
            bio: formData.bio,
            contact: formData.contact,
            course_module: formData.module
        };
        PostRegister(objPost);
    }

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <img src={logo} alt='Logo kenzie hub' />
                <Link to='/' >
                    <button className={styles.headerBttn}>Voltar</button>
                </Link>
            </div>

            <div className={styles.fromContainer}>

                <div className={styles.description}>
                    <h1>Crie sua conta</h1>
                    <p>Rápido e grátis, vamos nessa!</p>
                    
                </div>

                <form onSubmit={handleSubmit(submit)} noValidate>
                    <div className={styles.divInput}>
                        <label>Nome</label>
                        <input placeholder='Digite aqui seu nome' type='text' name='nome' {...register('name')} />
                        <span>{errors.name?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Email</label>
                        <input placeholder='Digite aqui seu email' type='email' {...register('email')} />
                        <span>{errors.email?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Senha</label>
                        <input placeholder='Digite aqui sua senha' type='password' name='password' id='password' {...register('password')} />
                        <span>{errors.password?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Confirmar Senha</label>
                        <input placeholder='Digite novamente sua senha' type='password' name='confirmPassword' id='confirmPassword' {...register('confirmPassword')} />
                        <span>{errors.password?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Bio</label>
                        <input placeholder='Fale sobre você' type='text' name='bio' {...register('bio')} />
                        <span>{errors.bio?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Contato</label>
                        <input placeholder='Opção de contato' type='text' name='contact' {...register('contact')} />
                        <span>{errors.contact?.message}</span> 
                    </div>

                    <div className={styles.divInput}>
                        <label>Selecionar</label>
                        <select name='modulo' {...register('module')}>
                            <option value='Primeiro Módulo (Front-end iniciante)'>Primeiro Módulo</option>
                            <option value='Segundo Módulo (Front-end intermediário)'>Segundo Módulo</option>
                            <option value='Terceiro Módulo (Front-end avançado)'>Terceiro Módulo</option>
                        </select>
                    </div>

                    <button type='submit'> Cadastrar</button>
                </form>
            </div>
        </section>
    )
}