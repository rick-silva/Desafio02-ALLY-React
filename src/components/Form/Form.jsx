
// importação para consumir as apis utilizando o metodo get
import axios from 'axios';
import { useEffect, useState } from 'react';
import './Form.css';
import '../../assets/css/global.css';
import '../../assets/css/loading.css';



//biblioteca para personalizar o select, permitindo a seleção de multiplas opções
import Select from 'react-select';
// biblioteca para mascara de CPF e Telefone usando expressões regulares
import MaskedInput from 'react-text-mask'


const Form = () =>{


    //recebe por padrão um array vazio
    const [paises, setpaises] = useState([])
    const [cidades, setcidades] = useState([])

    // Loading
    const [loading, setloading] = useState([true])

    useEffect(() => {
        axios.get("https://amazon-api.sellead.com/country")
        .then((response) => {
            //data -> informa cada dado da resposta(response) da api
            // console.log(response.data.map((pais) => pais.name))
            setpaises(response.data)
            setloading(false)
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

    //se o setloading for veradeiro, retorna uma animação de carregamento
    if(loading){
        return(
            <div className="loading">
                <div className="loadingio-spinner-reload-sgpn4x38edq"><div className="ldio-i24j6i337l9">
                <div><div></div><div></div><div></div></div>
                </div></div>
            </div>
        );
    }

    // console.log(paises.map((pais) => pais.code))
    const paisesOptions = paises.map(pais => ({
        value: pais.code,
        label: pais.name
    }))

    const cidadesOptions = cidades.map(cidade =>({
        value: cidade.code,
        label: cidade.name
    }))

    

    

    return(
        // Fragment, encapsular os elementos com uma "div fantasma"
        <>
        <form action="">
            <div className="div-info" >
                <div id='div-dados'>
                    <label htmlFor="nome">Nome: </label>
                    <br />
                    <input type="text" minLength={3} placeholder='Digite seu nome' required/>
                    <br />

                    <label htmlFor="email">Email: </label>
                    <br />
                    <input type="email" minLength={5} placeholder='Digite seu email' required/>
                    <br />

                    <label htmlFor="telefone">Telefone: </label>
                    <br />
                    <MaskedInput placeholder='Digite seu telefone' mask={['(',/\d/,/\d/,/\d/,')',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]} minLength={11} required/>
                    {/* <input type="tel" minLength={11} name="telefone" id="" placeholder='Digite seu telefone' required/> */}
                    <br />

                    <label htmlFor="cpf">CPF: </label>
                    <br />
                    {/* utilizando a biblioteca MaskedImput com expressão regular(regex) */}
                    <MaskedInput placeholder='Digite seu CPF' mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]} minLength={11} required/>
                    
                    {/* <input type="number" minLength={11} placeholder='Digite seu CPF' required/> */}
                </div>
                <div id='div-destinos'>
                    <label htmlFor="pais" required>Pais: </label>
                    <Select className='select' isMulti options={paisesOptions} required/>
                    
                    <label htmlFor="cidade">Cidade: </label>
                    <Select className='select' isMulti options={cidadesOptions} required/>
                </div>
                
            </div>

            <input type="submit" id='btn-enviar' value="Enviar" />
        </form>
        </>
    )
}

export default Form