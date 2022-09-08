import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function RemoverContato(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has("id")) {
            let id_contato = searchParams.get("id")
            let url_base = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL: "http://localhost:5000";
            let url = `${url_base}/contatos/${id_contato}`
            fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json'
                    }
                }
                )
                .then(res => {
                    if (res.ok){
                        navigate("/contatos")
                    } else {
                        console.log("DEU ERRO")  //TODO: tratar erro
                    }
                })
        } else {
            // se nao passar nada, volta pra tela de contatos
            // TODO: mostrar um erro
            navigate("/contatos")
        }
    })

    return (
        <></>
    )
}