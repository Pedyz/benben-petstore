import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import PrincipalPage from "./pages/PrincipalPage/PrincipalPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PerfilPage from "./pages/PerfilPage/PerfilPage";
import HomePage from "./pages/HomePage/HomePage";
import ProdutosPage from "./pages/ProdutosPage/ProdutosPage";
import AdicionarProdutoPage from "./pages/AdicionarProdutoPage/AdicionarProdutoPage";
import Products from "./components/Products/Products";

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route path="/" element={ <PrincipalPage/> }>
        <Route path="/" element={ <HomePage/> }/>
        <Route path="/perfil" element={ <PerfilPage/> }/>
        <Route path="/carrinho" element={ <></> }/>
        <Route path="/produtos" element={ <ProdutosPage/> } >
          <Route path=":produto" element={<Products/>} />
        </Route> 
        <Route path="/adicionar" element={ <AdicionarProdutoPage/> } />
      </Route>
     
      <Route path="/login" element={ <AuthPage/> }/>
      <Route path="/register" element={ <AuthPage/> }/>
    </>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;
