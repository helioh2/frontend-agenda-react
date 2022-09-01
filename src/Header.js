import { Link } from 'react-router-dom';


export function Header(props) {

    const renderAuthenticationButtons = () => {
      console.log("Token no header:", props.token)
      if (props.token) {
        return (
          <li className="nav-item">
            <Link className="nav-link" to="/logout">Logout</Link>
          </li>
        )
      } else {
        return (
          <>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cadastrar">Cadastrar-se</Link>
          </li>
        </>
        )
      }
    }

    return (
      <>
        <nav className={"navbar navbar-expand-sm bg-light navbar-light"}>
          <div id="container1" className={"container-fluid"}>
            <Link to="/" className='navbar-brand'>Agenda App</Link>
            <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
              <li className="nav-item">
                <Link to="/contatos" className="nav-link">Contatos</Link>
              </li>
            </ul>
          </div>
          <ul className={"navbar-nav me-auto mb-2 mb-rg-0"}>
          {renderAuthenticationButtons()}
          </ul>
      </nav>

    </>
        )
}