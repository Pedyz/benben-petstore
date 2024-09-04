import Style from './ProdutosPage.module.css'
import { useNavigate, NavLink, useParams, Outlet } from 'react-router-dom'
import ProductCard from '../../components/ProductCard/ProductCard'
import { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";

function ProdutosPage() {
    const {produto} = useParams()

    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!produto) {
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
            
            get(produtosRef).then((snapshot) => {
                if(snapshot.exists()) {
                    const allProducts = snapshot.val()
                
                    setProducts(allProducts)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }, [produto])

    const productsArray = Object.values(products)

    return (
        <div className={Style.mainDiv}>
            <aside className={Style.productTypeList}>
                <h2>Produtos</h2>
                <ul>
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos" end>Todos</NavLink >
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos/babadores" >Babadores</NavLink >
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos/bandanas" >Bandanas</NavLink >
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos/boinas" >Boinas</NavLink >
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos/gravatas" >Gravatas</NavLink >
                    <NavLink className={({ isActive }) => isActive ? `${Style.produtoType} ${Style.active}` : Style.produtoType} to="/produtos/laços" >Laços</NavLink >
                </ul>
            </aside>
            <div className={Style.productList}>
                {produto ? <Outlet /> : productsArray.map((product) => (
                <ProductCard name={product.name} price={product.price} imgUrl={product.images} isAvailable={product.isAvailable} />
            ))}
            </div>
        </div>
    )
}

export default ProdutosPage