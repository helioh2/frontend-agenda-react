import { useEffect, useState } from "react";

export function Pokemon(props) {

    const [enderecoImagem, setEnderecoImagem] = useState("")

    useEffect(() => {
        //// CARREGAR DADOS DO POKEMON

        fetch(`https://pokeapi.co/api/v2/pokemon/${props.nome}`,
            {
                method: "GET",
                headers: {
                    "content-type": "application/json; charset=utf-8"
                }
            },
        )
        .then(res => {
            if (res.ok) {
                return res.json()
            }    
        })
        .then(json => {
            setEnderecoImagem(json["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"])
        })
    }, [props, setEnderecoImagem]
    )


    return (
        <>
        <img width={100} src={enderecoImagem} alt="IMAGEM NAO CARREGADA" />
        </>
    )

}