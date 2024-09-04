import NavBar from '../../components/NavBar/NavBar'
import Style from './PrincipalPage.module.css'
import { Outlet } from 'react-router-dom'

function PrincipalPage() {
    return(
        <>
            <NavBar />
            <Outlet/>
            
        </>  
    )
}

export default PrincipalPage