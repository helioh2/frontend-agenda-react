import { Link } from 'react-router-dom';

export function Header(props) {


    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/contatos">Contatos</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/cadastro">Cadastro</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                <li><Link to="/pagina_zuera">Página Zuera</Link></li>
            </ul>
        </nav>
    )
}