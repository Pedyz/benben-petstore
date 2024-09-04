import Style from './AdicionarProdutoPage.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import AddProductInputs from '../../components/AddProductInputs/AddProductInputs';

function AdicionarProdutoPage() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    }
      
    const app = initializeApp(firebaseConfig)
    const db = getDatabase(app)
    const userAuthListRef = ref(db, 'UsersAuthList')

    const userCreds = sessionStorage.getItem('user-creds')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
          try {
            if (userCreds) {
              const userCredsObj = JSON.parse(userCreds);
              const uid = userCredsObj.uid;

              const snapshot = await get(userAuthListRef);
              
              if (snapshot.exists()) {
                const data = snapshot.val()
                const obj = data[uid]
                
                if(obj.isAdmin !== true) {
                    navigate('/')
                }
                    
              } 
            } 
          } catch (error) {
            console.error(error)
          }
        }

        if (!userCreds) {
            navigate('/')
        }

        fetchData()
      }, [])

    return (
        <div className={Style.mainDiv}>
            <AddProductInputs/>
        </div>
    )
}

export default AdicionarProdutoPage