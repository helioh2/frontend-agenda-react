import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Cadastro(props) {

    const [usuario, setUsuario] = useState(
        {
            username: "",
            senha: ""
        }
    )

    const navigate = useNavigate();

    function cadastrar(event) {
        console.log("LOGANDO!!!")
        console.log(usuario)

        let url = "http://localhost:5000/usuarios"

        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: { 'Content-Type': 'application/json' },
            }
            )
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                // return Error(res.json())
                else {
                    console.log("ERRO")
                }
            })
            .then(json => {
                // REDIRECIONAR PARA A TELA DE LOGIN
                navigate("/login")
                
                
            })
            .catch(err => {
                console.log(err.response)
                // TODO: TRATAR QUANDO OCORRE
            })

        event.preventDefault()
    }    


    function handleChange(event) {
        const { value, name } = event.target
        setUsuario(anterior => ({
          ...anterior, [name]: value
        })
        )
      }

    return (
    <div>
      <h1>Tela de cadastro</h1>
      <form className="login">
        <input onChange={handleChange}
          type="text"
          text={usuario.username}
          name="username"
          placeholder="username"
          value={usuario.username} />
        <input onChange={handleChange}
          type="password"
          text={usuario.senha}
          name="senha"
          placeholder="senha"
          value={usuario.senha} />

        <button onClick={cadastrar}>Submit</button>
      </form>
    </div>
    )
}