import Style from './ProductCard.module.css'

function ProductCard({ name, price, imgUrl, isAvailable }) {
    const firstImgIndex = imgUrl.length - 1
    return (
        <div className={Style.card}>
            <img src={imgUrl ? imgUrl[firstImgIndex] : './images/white.jpg'} />
            <div className={Style.info}>
                <h2>{name}</h2>
                <div className={Style.details}>
                    <p className={isAvailable ? Style.available : Style.soldOut}>{isAvailable? 'Disponivel' : 'Esgotado'}</p>
                    <p>R${price},00</p>
                </div>
                
            </div>
        </div>
    )
}

export default ProductCard