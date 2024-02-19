import editicon from '../../../src/assets/editIcon.svg'
import deleteicon from '../../assets/deleteIcon.svg'
import styles from './techCard.module.scss'
import { useContext } from 'react';
import { DashboardContext } from '../../providers/dashboardContext';

export const TechCard = () => {
    const { setEditVisible, cardList, deleteCard, setEditingCard } = useContext(DashboardContext);

    const editBttn = (card) => {
        setEditVisible(true);
        setEditingCard(card);
    }

    return (
        <ul>
            {cardList.map(card => (
                <li key={card.title} className={styles.cardList}>
                    <h2>{card.title}</h2>
                    <div>
                        <p>{card.status}</p>
                        <div className={styles.bttnContainer}>
                            <button onClick={() => editBttn(card)}><img src={editicon} /></button>
                            <button onClick={() => deleteCard(card.id)}><img src={deleteicon} /></button>
                        </div>
                    </div>
                </li>
            ))}

        </ul>
    )
}