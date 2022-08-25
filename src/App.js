import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import imagemJuca from './13.gif'

export function Car(props) {
  return <h2 style={{color:props.color}}>I am a {props.color} Car! Meu nome é {props.nome}</h2>;
}

export function Contador(props) {

  const [contador, setContador] = useState(0)

  function aumentaContador(){
    setContador(contador + 1)
  }

  return (
    <>
    {contador}
    <button onClick={aumentaContador}>Aumenta</button>
    </>
  )

}


function App() {  // componente
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

        <Contador />
      </header>
    </div>
  );
}

export default App;
