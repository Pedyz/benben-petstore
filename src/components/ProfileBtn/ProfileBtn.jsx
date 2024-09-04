import Style from './ProfileBtn.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";

function ProfileBtn() {
    const [isOpen, setIsOpen] = useState(false)
    const open = `${Style.open}`
    const closed = `${Style.closed}`

    const navigate = useNavigate()

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
    const db = getDatabase(app);
    const userAuthListRef = ref(db, 'UsersAuthList')

    const userCreds = sessionStorage.getItem('user-creds')

    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (userCreds) {
              const userCredsObj = JSON.parse(userCreds);
              const uid = userCredsObj.uid;

              const snapshot = await get(userAuthListRef);
              
              if (snapshot.exists()) {
                const data = snapshot.val();
                const obj = data[uid]
                
                if(obj.isAdmin) {
                    setAdmin(true) 
                } else {
                    setAdmin(false)
                }
              } 
            } 
          } catch (error) {
            console.error(error);
          }
        }

        fetchData()
      }, [])

      const logOut = () => {
        sessionStorage.removeItem('user-creds')
        sessionStorage.removeItem('user-info')
        window.location.reload()
      }

    return (
        <div>
            <img onClick={() => setIsOpen(!isOpen)} className={Style.mainBtn} src="./images/user.png" />
            <div className={`${Style.sideBar} ${isOpen ? open : closed}`} >
                <ul>
                    <li className={Style.pagina} onClick={() => navigate('/')}>Inicio</li>
                    <li className={Style.pagina} onClick={() => navigate('/perfil')}>Perfil</li>
                    <li className={Style.pagina} onClick={() => navigate('/carrinho')}>Carrinho</li>
                    <li className={Style.pagina} onClick={() => navigate('/produtos')} >Produtos</li>
                    {admin === true ? <li className={Style.pagina} onClick={() => navigate('/adicionar')}>Adicionar produto</li> : <></>}
                </ul>
                <button className={Style.deslogarBtn} onClick={logOut} >Sair</button>
            </div>
        </div>
    )
}

export default ProfileBtn