import { useNavigate } from "react-router-dom"
import styles from "./styles/LogoutComponent.module.css"
import { useTranslation } from 'react-i18next';

export default function Logout() {
    const { t } = useTranslation();
    const navigate = useNavigate()

    async function logout() {
        localStorage.removeItem("TOKEN")
        navigate('/')
    }



    return (

        <div className={styles.logoutContainer}>
            <button type="button" onClick={logout} className={styles.logoutButton}> {t('logoutButton')}</button>
        </div>

    )

}