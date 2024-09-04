import Style from './HomePage.module.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

function HomePage() {

        const teste = process.env.REACT_APP_TESTE_DOIS
    useEffect(() => {

        console.log(teste)
    }, [])

    return (
        <div className={Style.mainDiv} >
            <div className={Style.announce}>
                <h2>Bem-vindo ao paraíso dos pets!<br/> Encontre os acessórios perfeitos para deixar seu amigo ainda mais encantador.</h2>
            </div>
            <div className={Style.produtos}>
                <h2>Conheça nossos produtos!</h2>
                <ul>
                    <Link className={Style.produto} to="/produtos/babadores">Babadores</Link>
                    <Link className={Style.produto} to="/produtos/bandanas">Bandanas</Link>
                    <Link className={Style.produto} to="/produtos/boinas">Boinas</Link>
                    <Link className={Style.produto} to="/produtos/gravatas">Gravatas</Link>
                    <Link className={Style.produto} to="/produtos/laços">Laços</Link>
                </ul>
            </div>
            <div className={Style.imagens}>

            </div>
        </div>
    )
}

export default HomePage