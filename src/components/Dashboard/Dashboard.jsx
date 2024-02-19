import logo from '../../assets/Logo.svg';
import styles from './dashboard.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../providers/userContext';
import { TechList } from '../TechList/TechList';
import { CreateModal } from '../CreateTechModal/CreateModal';
import { EditModal } from '../EditTechModal/EditModal'
import { DashboardContext } from '../../providers/dashboardContext';

export const Dashboard = ({ }) => {
    const { user, module, dashboardLogout } = useContext(UserContext);
    const { isVisible, editVisible } = useContext(DashboardContext);

    return (
        <>
            <section className={styles.container}>
                <div className={styles.header}>
                    <img src={logo} alt='Logo kenzie hub' />
                    <button onClick={() => dashboardLogout()} >Sair</button>
                </div>

                <div className={styles.userInfo}>
                    <div className={styles.divUser}>
                        <h2>Olá, {user}</h2>
                        <p>{module}</p>
                    </div>
                </div>

                <div className={styles.main}>
                    <TechList />
                </div>

            </section>
            {isVisible ? <CreateModal /> : null}
            {editVisible ? <EditModal /> : null}
        </>
    )
}