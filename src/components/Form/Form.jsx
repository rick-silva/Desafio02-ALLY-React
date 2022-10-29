
import axios from 'axios'
import { useEffect } from 'react'
import './Form.css'

const Form = () =>{

    useEffect(() => {
        let paises = axios.get("https://amazon-api.sellead.com/country")
        .then((response) => {
            //data -> informa cada dado da resposta(response) da api
            console.log(response.data.map((pais) => pais.name))
        }).catch(() => {
            console.log("Falha na API")
        })
    }, [])

    // console.log(paises.map((pais) => pais.code))

    return(
        // Fragment, encapsular os elementos com uma "div fantasma"
        <>
        <form action="">
            <label htmlFor="nome">Nome: </label>
            <input type="text" minLength={3} placeholder='Digite seu nome' required/>

            <label htmlFor="email">Email: </label>
            <input type="email" minLength={5} placeholder='Digite seu email' required/>

            <label htmlFor="telefone">Telefone: </label>
            <input type="tel" minLength={11} name="telefone" id="" placeholder='Digite seu telefone' required/>

            <label htmlFor="cpf">CPF: </label>
            <input type="text" minLength={11} placeholder='Digite seu CPF' required/>

            <label htmlFor="pais">Pais: </label>
            <select name="" id="" required>
                <option value="brasil" disabled>Brasil</option>
            </select>

            <label htmlFor="cidade">Cidade: </label>
            <select name="" id="" required>
                <option value="" disable>Rio de Janeiro</option>
                {/* {paises.data.map((pais) => <option value={pais.code}>{pais.name}</option>)} */}
            </select>

            <input type="submit" value="Enviar" />
        </form>
        </>
    )
}

export default Form