import ProductCard from "../ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import Style from './Products.module.css'
import { useParams } from "react-router-dom";

function Products() {
    const { produto } = useParams()

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
    const produtosRef = ref(db, 'Produtos')

    const [products, setProducts] = useState([])

    useEffect(() => {
        
        get(produtosRef).then((snapshot) => {
            if(snapshot.exists()) {
                const allProducts = snapshot.val()
                
                
                const filteredProducts = produto ?
                Object.values(allProducts).filter(p => p.product === produto.slice(0, -1)) :
                Object.values(allProducts)

                setProducts(filteredProducts)
            }
        })
        .catch((error) => {
            console.log(error)
        })
        
    }, [produto])

    const productsArray = Object.values(products)

    return (
        <div className={Style.cardsContainer}>
            {productsArray.map((product) => (
                <ProductCard name={product.name} price={product.price} imgUrl={product.images} isAvailable={product.isAvailable} />
            ))}
        </div>
    )
}

export default Products