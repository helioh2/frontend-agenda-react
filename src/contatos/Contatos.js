import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';


export function Contatos(props) {

    const [contatos, setContatos] = useState([])
    const [pageCount, setPageCount] = useState(0)
    // const [page, setPage] = useState(0)
    const navigate = useNavigate()
    const [busca, setBusca] = useState("")

    const fetchContatos = useCallback((page=1) => {
        if (props.token) {
            let url_base = process.env.REACT_APP_API_URL? process.env.REACT_APP_API_URL: "http://localhost:5000";
            let url = `${url_base}/contatos?page=${page}`
            if (busca) {   // se variável busca não é uma string vazia
                url += "&nome="+busca
                //ex: http://localhost:5000/contatos?page=1&nome=Ad
            }
            fetch(url,
                {
                    method: "GET",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+props.token
                    },
                })
                .then(res => {
                    if (res.ok){
                        return res.json()
                    } else {
                        console.log("ERRO NA LISTAGEM DE CONTATOS") //TODO: melhorar tratamento de erro
                    }
                })
                .then(json => {
                    console.log(json)
                    setPageCount(json.pages)
                    // setPage(json.page)
                    setContatos(json.items)
                })
        } else {
            navigate("/login")
        }
    }, [props, setContatos, navigate, setPageCount, busca])

    useEffect(() => {
        fetchContatos()   //default page=1
    }, [fetchContatos])


    function handlePageClick(event) {
        let page = event.selected + 1
        // setPage(page)
        fetchContatos(page)
    }

    function buscar(event) {
        let buscaStr = event.target.value
        setBusca(buscaStr)
        // TODO: Forçar o componente de paginação a voltar para a primeira página
        fetchContatos()
    }

    return (
        <div>
            <h1>Lista de contatos</h1>
            <form class="form-group">
                <label for="busca">Busca: </label>
                <input onChange={buscar} 
                    // Binding (vinculação) com a variável 'busca':
                    value={busca}   
                    type="text" 
                    className={"form-control"} 
                    id="busca" name="busca"/>
            </form>
            <table className="table table-striped">
                <thead>
                <tr> <th>Nome</th> <th>Telefone</th> <th>Data de Nascimento</th></tr>
                </thead>
                <tbody>
                {contatos.map(contato => {
                    return (
                        <tr key={contato.id}>
                            <td>{contato.nome}</td>
                            <td>{contato.telefone}</td>
                            <td>{contato.data_nascimento}</td>
                            <td><Link to={"/remover_contato?id="+contato.id}>Remover</Link></td> 
                            {/* TODO: Substituir link para remoção por botão que faz a remoção no próprio componente Contatos */}
                            <td><Link to={"/alterar_contato?id="+contato.id}>Alterar</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>    


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName = {"pagination justify-content-center"}
                pageClassName= {"page-item"}
                pageLinkClassName = {"page-link"}
                activeClassName = {"active"} 
                previousClassName = {"page-item"}
                previousLinkClassName = {"page-link"}
                nextClassName = {"page-item"}
                nextLinkClassName = {"page-link"}
                breakClassName ={"page-item"}
                breakLinkClassName ={"page-link"}
            />  

            <Link to="/adicionar_contato">Adicionar Contato</Link>
        </div>

        

    )
}