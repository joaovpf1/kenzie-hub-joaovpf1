import loadingSpin from '../../assets/loadingSpin.svg';
import styles from './Spinner.module.scss';

export const LoadingSpinner = () =>{
    return(
        <div className={styles.spinner}>
            <img src={loadingSpin} alt='Carregando...' />
        </div>
    )
}