import Style from './AddProductInputs.module.css'
import { useState } from 'react'
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js';

function AddProductInputs() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [product, setProduct] = useState('')
    const [images, setImages] = useState([])
    const [imagePreviews, setImagePreviews] = useState([]);

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
    const novoProdutoRef = push(produtosRef)

    const storage = getStorage(app)

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    }

    const handleUploadImages = async () => {
        const uploadPromises = images.map((image) => {
            const imageRef = storageRef(storage, `images/${name}/${image.name}`)
            return uploadBytes(imageRef, image).then(() => getDownloadURL(imageRef))
        })

        try {
            const urls = await Promise.all(uploadPromises)
            return urls
        } catch (error) {
            console.error('Erro ao fazer upload das imagens:', error)
            return []
        }
    }

    const handleImageRemove = (index) => {
        setImages(images.filter((_, i) => i !== index))
        setImagePreviews(imagePreviews.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const imageUrls = await handleUploadImages()

            await set(novoProdutoRef, {
                name,
                price,
                description,
                product,
                images: imageUrls, 
                isAvailable: true
            })

            window.alert('Produto adicionado com sucesso!')
            setName('')
            setPrice('')
            setDescription('')
            setProduct('')
            setImages([])
            setImagePreviews([])
        } catch (error) {
            console.error('Erro ao adicionar produto:', error)
        }
    }

    return (
        <form className={Style.container} onSubmit={handleSubmit}>
            <div className={Style.inputsContainer}>
                <h2 className={Style.title}>Adicionar Produto</h2>
                <input type='text' placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name} />
                <input type='number' placeholder='Valor' min='1' onChange={(e) => setPrice(e.target.value)} value={price} />
                <textarea placeholder='Descrição' onChange={(e) => setDescription(e.target.value)} value={description}  />
                <input list='produtos' type='text' placeholder='Tipo de produto' onChange={(e) => setProduct(e.target.value)} value={product} />
                <button type='submit'>Adicionar</button>
                <datalist id='produtos'>
                    <option value='Bandana'></option>
                    <option value='Boina'></option>
                    <option value='Babador'></option>
                    <option value='Gravata'></option>
                    <option value='Laço'></option>
                </datalist>
            </div>
            
            <div className={Style.imgsContainer}>
                {imagePreviews.map((preview, index) => (
                            <img onClick={() => handleImageRemove(index)} className={Style.previewImg} src={preview} alt={`Preview image`} />
                        ))}
                <label htmlFor='file-upload' className={Style.addImages}>
                    <p>+</p>
                </label>
                <input id='file-upload' style={{ display: 'none' }} type='file' accept='image/*' multiple onChange={handleImageChange} />
            </div>
        </form>
    )
}

export default AddProductInputs