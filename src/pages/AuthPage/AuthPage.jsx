import Style from './AuthPage.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, get, set, ref, child } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { useState, useEffect } from 'react';

function AuthPage() {
    useEffect(() => {
        const userCreds = sessionStorage.getItem('user-creds')
        const userInfo = sessionStorage.getItem('user-info')

        if (userCreds && userInfo) {
            navigate('/')
        }
    }, [])

    const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
    }

    const app = initializeApp(firebaseConfig);
    const db = getDatabase()
    const auth = getAuth(app)
    const dbref = ref(db)

    const RegisterUser = evt => {
        evt.preventDefault()
    
        createUserWithEmailAndPassword(auth, regEmail, regPassword)
        .then((credentials) => {
            set(ref(db, 'UsersAuthList/' + credentials.user.uid), {
                firstname: regFirstName,
                lastname: regLastName,
            })
            window.alert('Cadastro concluído. Você já pode entrar com sua conta!')
            setRegEmail('')
            setRegFirstName('')
            setRegLastName('')
            setRegPassword('')
            navigate('/login')
        })
        .catch((error) => {
            if (!regEmail || !regFirstName || !regLastName || !regPassword) {
                window.alert('Preença os espaços corretamente')
            } else {
                window.alert('Email ou senha inválida.')
            }
            
            console.log(error)
        })
    
    
    }
    
    const SignInUser = evt => {
        evt.preventDefault()
    
        signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((credentials) => {
            get(child(dbref, 'UsersAuthList/' + credentials.user.uid)).then((snapshot) => {
                if(snapshot.exists) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        firstname: snapshot.val().firstname,
                        lastname: snapshot.val().lastname
                        
                    }))
                    sessionStorage.setItem("user-creds", JSON.stringify(credentials.user))
                    setLoginEmail('')
                    setLoginPassword('')
                    navigate('/')
                }
            })
        }) 
        .catch((error) => {
            if (!loginEmail || !loginPassword) {
                window.alert('Preencha os espaços corretamente')
            } else {
                window.alert('Email ou senha inválida.')
            }
            console.log(error)
        })
    }

    const location = useLocation()
    const locationPath = location.pathname

    const navigate = useNavigate()

    const pinkClass = `${Style.pink}`
    const blueClass = `${Style.blue}`

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const loginBlock = 
    <form onSubmit={SignInUser} className={Style.authForm} id='loginForm'>
        <h2>Entre na sua conta</h2>
        <input className={Style.formInput} placeholder='Email' id='loginEmail' type='email' onChange={e => setLoginEmail(e.target.value)} value={loginEmail} required/>
        <input className={Style.formInput} placeholder='Senha' id='loginPassword' type='password' onChange={e => setLoginPassword(e.target.value)} value={loginPassword} required/>    
        <button type='submit' className={locationPath == '/register' ? Style.pinkBtn : Style.blueBtn}>Entrar</button>   
        <p onClick={() => navigate("/register")}>Quero criar uma conta</p>     
    </form>

    const [regFirstName, setRegFirstName] = useState('')
    const [regLastName, setRegLastName] = useState('')
    const [regPassword, setRegPassword] = useState('')
    const [regEmail, setRegEmail] = useState('')

    const registerBlock = 
    <form onSubmit={RegisterUser} className={Style.authForm} id='loginForm'>
        <h2>Crie sua conta</h2>
        <input className={Style.formInput} placeholder='Nome' type='text' onChange={e => setRegFirstName(e.target.value)} value={regFirstName} />
        <input className={Style.formInput} placeholder='Sobrenome' type='text' onChange={e => setRegLastName(e.target.value)} value={regLastName} />
        <input className={Style.formInput} placeholder='Email' type='email' onChange={e => setRegEmail(e.target.value)} value={regEmail} />
        <input className={Style.formInput} placeholder='Senha' type='password' onChange={e => setRegPassword(e.target.value)} value={regPassword} />    
        <button type='submit' className={locationPath == '/register' ? Style.pinkBtn : Style.blueBtn}>Criar</button>        
        <p onClick={() => navigate('/login')}>Já tenho uma conta</p>
    </form>
    
    
    return (
        <div className={`${Style.background} ${locationPath == '/register' ? pinkClass : blueClass}`}>
            <img className={Style.returnBtn} onClick={() => navigate('/')} src='./images/left-arrow.png' />
            <div className={`${Style.window} ${locationPath == '/register' ? pinkClass : blueClass}`}>
                {locationPath == '/register' ? registerBlock : loginBlock}
            </div>
        </div>
    )
}

export default AuthPage