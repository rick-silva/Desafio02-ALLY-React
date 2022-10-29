
import axios from 'axios'
import { useEffect, useState } from 'react'
import './Form.css'

const Form = () =>{

    //recebe por padrão um array vazio
    const [paises, setpaises] = useState([])

    const [cidades, setcidades] = useState([])

    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/country")
        .then((response) => {
            //data -> informa cada dado da resposta(response) da api
            // console.log(response.data.map((pais) => pais.name))
            setpaises(response.data)
        }).catch(() => {
            console.log("Falha na API PAISES")
        })
    }, [])

    useEffect(() => {
        axios.get('https://amazon-api.sellead.com/city')
        .then((response=>{
            setcidades(response.data)
        })).catch(() =>{
            console.log("Falha API CIDADE")
        })
    })

    // console.log(paises.map((pais) => pais.code))

    return(
        // Fragment, encapsular os elementos com uma "div fantasma"
        <>
        <form action="">
            <label htmlFor="nome">Nome: </label>
            <input type="text" minLength={3} placeholder='Digite seu nome' required/>
            <br />
            <br />

            <label htmlFor="email">Email: </label>
            <input type="email" minLength={5} placeholder='Digite seu email' required/>
            <br />
            <br />

            <label htmlFor="telefone">Telefone: </label>
            <input type="tel" minLength={11} name="telefone" id="" placeholder='Digite seu telefone' required/>
            <br />
            <br />

            <label htmlFor="cpf">CPF: </label>
            <input type="text" minLength={11} placeholder='Digite seu CPF' required/>
            <br />
            <br />

            <label htmlFor="pais">Pais: </label>
            <select name="" id="" required>
                <option value="" disable="true">Brasil</option>

                {paises.map((pais,key) => {
                    return(
                        <option key={key} value={pais.code}>{pais.name}</option>
                    )
                })}
            </select>
            <br />
            <br />

            <label htmlFor="cidade">Cidade: </label>
            <select name="" id="" required>
                <option value="" disable="true">Rio de Janeiro</option>
                {cidades.map((cidade, key) => {
                    return(
                        <option key={key} value={cidade.code}>{cidade.name}</option>
                    )
                })}
            </select>
            <br />
            <br />

            <input type="submit" value="Enviar" />
        </form>
        </>
    )
}

export default Form