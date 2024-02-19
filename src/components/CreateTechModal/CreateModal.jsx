import { useForm } from 'react-hook-form';
import { CreateModalSchema } from './CreateModalSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './createModal.module.scss';
import { useContext } from 'react';
import { DashboardContext } from '../../providers/dashboardContext';

export const CreateModal = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CreateModalSchema),
    });

    const { closeModal, createListItem } = useContext(DashboardContext);

    const submit = (formData) => {
        const objPost = {
            title: formData.name,
            status: formData.status
        };
        createListItem(objPost);
        closeModal();
    }

    return (
        <div role='dialog' className={styles.dialogContainer} >
            <section>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <h3>Cadastrar Tecnologia</h3>
                        <button onClick={closeModal}>x</button>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit(submit)} noValidate>
                        <div>
                            <label>Nome</label>
                            <input name='name' placeholder='Digite aqui o nome' type='text' {...register('name')} />
                            <span>{errors.name?.message}</span>
                        </div>

                        <div>
                            <label>Status</label>
                            <select name='status' {...register('status')} >
                                <option value='Iniciante'>Iniciante</option>
                                <option value='Intermediário'>Intermediário</option>
                                <option value='Avançado'>Avançado</option>
                            </select>
                        </div>
                        <button type='submit'>Cadastrar Tecnologia</button>
                    </form>
                </div>
            </section>

        </div>
    )
}