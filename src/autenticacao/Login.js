import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login(props) {

    const [loginForm, setLoginForm] = useState(
        {
            username: "",
            senha: ""
        }
    )

    const navigate = useNavigate();

    function logar(event) {
        // console.log("LOGANDO!!!")
        // console.log(loginForm)
        let url_base = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL: "http://localhost:5000";
        let url = `${url_base}/token`

        fetch(url,
            {
                method: "POST",
                body: JSON.stringify(loginForm),
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
                // localStorage.setItem("zuera", "neverends")
                // console.log(json.access_token)
                props.setToken(json.access_token)

                // REDIRECIONAR PARA A TELA DE CONTATOS
                navigate("/contatos")
                
            })
            .catch(err => {
                console.log(err.response)
                // TODO: TRATAR QUANDO OCORRE
            })

        event.preventDefault()
    }

    function handleChange(event) {
        const { value, name } = event.target
        setLoginForm(anterior => ({
          ...anterior, [name]: value
        })
        )
      }

    return (
    <div>
      <h1>Login</h1>
      <form className="form-group">
        <input onChange={handleChange}
          type="text"
          text={loginForm.username}
          name="username"
          placeholder="username"
          value={loginForm.username} />
        <input onChange={handleChange}
          type="password"
          text={loginForm.senha}
          name="senha"
          placeholder="senha"
          value={loginForm.senha} />

        <button onClick={logar}>Submit</button>
      </form>
    </div>
    )
}