import { useNavigate } from "react-router-dom"
import styles from "./styles/LogoutComponent.module.css"

export default function Logout() {

    const navigate = useNavigate()

    async function logout() {
        localStorage.removeItem("TOKEN")
        navigate('/')
    }



    return (

        <div className={styles.logoutContainer}>
            <button type="button" onClick={logout} className={styles.logoutButton}>Logi välja</button>
        </div>

    )

}