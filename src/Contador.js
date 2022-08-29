import { useState } from "react"

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