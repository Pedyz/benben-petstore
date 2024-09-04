import Style from './NavBar.module.css'
import AuthBtns from '../AuthBtns/AuthBtns'
import ProfileBtn from '../ProfileBtn/ProfileBtn'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()

    const userCreds = sessionStorage.getItem('user-creds')
    const userInfo = sessionStorage.getItem('user-info')

    return (
        <nav className={Style.navBar}>
            <h1 onClick={() => navigate('/')}>Ben Ben Pet Store</h1>
            <input type='text' placeholder='Pesquisar'/>
            {userCreds && userInfo ? <ProfileBtn/> : <AuthBtns/>}
        </nav>
    )
}

export default NavBar