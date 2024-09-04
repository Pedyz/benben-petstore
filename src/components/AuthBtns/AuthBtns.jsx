import Style from './AuthBtns.module.css'
import { useNavigate } from 'react-router-dom'

function AuthBtns() {
    const navigate = useNavigate()
    return (
        <div className={Style.btnDiv} >
            <button onClick={() => navigate('register')}>Registrar</button>
            <button onClick={() => navigate('login')}>Entrar</button>
        </div>
    )
}

export default AuthBtns