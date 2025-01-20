import { useNavigate } from "react-router-dom"
import styles from "./styles/LogoutComponent.module.css"

export default function Logout() {

    const navigate = useNavigate()

    async function logout() {
        localStorage.removeItem("TOKEN")
        navigate('/')
    }



    return (


        <button type="button" onClick={logout}>Logi välja</button>
    )

}