import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function CadastrarContato(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [contato, setContato] = useState(
        {
            id: null,
            nome: '',
            telefone: '',
            data_nascimento: null,
            detalhes: '',
        }
    )
    const [erros, setErros] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has("id")) {
            let id_contato = searchParams.get("id")
            let endpoint = "contatos";
            let api_host = process.env.API_HOST ? process.env.API_HOST : "localhost:5000";
            fetch(`http://${api_host}/${endpoint}/${id_contato}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                },
            })
                .then(res => {
                    if (res.ok) {
                        return res.json()
                    } else {
                        throw new Error(res.json())
                    }
                })
                .then(json => {
                    setContato(json)
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response)
                    }
                });


            setContato(anterior => ({
                ...anterior, id: searchParams.get("id")
            }));
        }
    }, [setContato, searchParams, props.token]
    )


    function cadastrar(event) {

        let endpoint = "contatos";
        let api_host = process.env.API_HOST ? process.env.API_HOST : "localhost:5000";
        let method = "POST";
        let url = `http://${api_host}/${endpoint}`;
        if (contato.id) {
            method = "PATCH";
            url += `/${contato.id}`;
        }
        fetch(url, {
            method: method,
            body: JSON.stringify(contato),
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                if (res.ok) {
                    navigate("/contatos");
                } else {
                    return res.json();
                }
            })
            .then(error_json => {
                setErros(error_json)
            })
            .catch((error) => {
                if (error.response) {
                  
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            });

        event.preventDefault()
    }


    function handleChange(event) {
        const { value, name } = event.target
        setContato(anterior => ({
            ...anterior, [name]: value
        })
        )
    }

    return (<>
        <form className="cadastrar_contato ">
            <input type="text" id="id" name="id" value={contato.id ? contato.id : ''} hidden={true} readOnly />

            <label>Nome: </label>
            <input onChange={handleChange} type="text" id="nome" name="nome" value={contato.nome ? contato.nome : ''} required minLength="3" />
            {erros && erros.nome ? erros.nome : ''} <br />

            <label>Telefone: </label>
            <input onChange={handleChange} type="tel" id="telefone" name="telefone" value={contato.telefone ? contato.telefone : ''} required minLength="8"
                maxLength="12" /> {erros && erros.telefone ? erros.telefone : ''}<br />

            <label>Data de nascimento: </label>
            <input onChange={handleChange} type="date" id="data_nascimento" name="data_nascimento"
                value={contato.data_nascimento ? contato.data_nascimento : ''} /><br />

            <label>Detalhes: </label>
            <textarea onChange={handleChange} id="detalhes" name="detalhes" rows="4" cols="50" value={contato.detalhes ? contato.detalhes : ''}></textarea><br />

            <button onClick={cadastrar}>Enviar</button>
        </form>
    </>)
}