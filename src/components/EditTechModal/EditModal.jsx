import { useContext } from 'react';
import { DashboardContext } from '../../providers/dashboardContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditModalSchema } from './EditModalSchema';
import styles from './editModal.module.scss';

export const EditModal = () => {
    const { closeEditModal, editCard, editingCard } = useContext(DashboardContext);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(EditModalSchema),
        values: {
            title: editingCard.title,
            status: editingCard.status,
        },
    });

    const submit = (formData) => {
        editCard(formData)
        closeEditModal()
    }

    return (
        <div role='dialog' className={styles.dialogContainer} >
            <section>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <h3>Tecnologia Detalhes</h3>
                        <button onClick={closeEditModal}>x</button>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit(submit)}>
                        <div>
                            <label>Nome do projeto</label>
                            <input name='title' placeholder='Material UI' type='text' disabled {...register('title')} />
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
                        <button type='submit'>Salvar alterações</button>
                    </form>
                </div>
            </section>
        </div>
    )
}