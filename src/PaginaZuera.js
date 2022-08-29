import logo from './logo.svg';
import './App.css';
import imagemJuca from './13.gif'
import { Contador } from './Contador';
import { Pokemon } from './pokemons/Pokemon';

export function Car(props) {
  return <h2 style={{color:props.color}}>I am a {props.color} Car! Meu nome é {props.nome}</h2>;
}

function PaginaZuera() {  // componente
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ola!!!
        </p>
        <img src={imagemJuca} alt="IMAGEMJUCA"/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Car color="red" nome="Relampago Marquinhos"/>

        <Car color="blue" nome="Herbie"/>

        <Contador />

        <Contador />

        <Contador />

        <Contador />


        <Pokemon nome="charizard" />

      </header>
    </div>
  );
}

export default PaginaZuera;
