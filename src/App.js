
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router';
import { Route } from 'react-router';
import { Home } from './Home';
import { Login } from './autenticacao/Login';
import { Logout } from './autenticacao/Logout';
import { Contatos } from './contatos/Contatos';
import { RemoverContato } from './contatos/RemoverContato';
import { CadastrarContato } from './contatos/CadastrarContato';
import { Header } from './Header';
import { Cadastro } from './autenticacao/Cadastro';
import useToken from './useToken';
import PaginaZuera from './PaginaZuera';

export function Car(props) {
  return <h2 style={{color:props.color}}>I am a {props.color} Car! Meu nome é {props.nome}</h2>;
}

function App() {  // componente

  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route index element={<Home/ >} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path="logout" element={<Logout token={token} removeToken={removeToken} />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route path="contatos" element={<Contatos token={token}/>} />
        <Route path="remover_contato" element={<RemoverContato token={token} />}></Route>
        <Route path="alterar_contato" element={<CadastrarContato token={token} />}></Route>
        <Route path="adicionar_contato" element={<CadastrarContato token={token} />}></Route>
        <Route path="pagina_zuera" element={<PaginaZuera />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
