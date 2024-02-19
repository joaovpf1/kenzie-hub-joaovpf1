import { TechCard } from '../TechCard/TechCard';
import styles from './techList.module.scss';
import { useContext } from 'react';
import { DashboardContext } from '../../providers/dashboardContext';

export const TechList = () => {
    const { setVisible } = useContext(DashboardContext);

    return (
        <>
            <div className={styles.headerList}>
                <h2>Tecnologias</h2>
                <button onClick={() => setVisible(true)}> + </button>
            </div>
            <TechCard />
        </>
    )
}