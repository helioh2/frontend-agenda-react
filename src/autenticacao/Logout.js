import { useEffect } from "react"
import { useNavigate } from 'react-router-dom';

export function Logout(props) {

    const navigate = useNavigate();

    useEffect(() => {
        
        let url_base = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL: "http://localhost:5000";
        let url = `${url_base}/token`

        fetch(url,
            {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer "+props.token
                }
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
                props.removeToken(json.access_token)
                navigate("/login")
                
            })
            .catch(err => {
                console.log(err.response)
                // TODO: TRATAR QUANDO OCORRE
            })
    }, [props, navigate])

    return (<></>)
}