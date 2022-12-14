
// importação para consumir as apis utilizando o metodo get, fazendo suas requisições
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

    /*State(estado) -> elemento que armazena valores de propriedade 
    do componente, quando o estado dos objetos muda 
    eles são renderizados novamente*/


    //recebe por padrão um array vazio
    const [paises, setpaises] = useState([])
    const [cidades, setcidades] = useState([])

    // Loading
    const [loading, setloading] = useState([true])

    /*utilizado para fazer a requisição get. A cada vez renderização do componente 
    será executada a função de "request"*/
    useEffect(() => {
        //executa o metodo get na API, recuperando seus dados JSON
        axios.get("https://amazon-api.sellead.com/country")
        //caso a requisição retorne uma resposta positiva
        .then((response) => {
            //data -> informa cada dado da resposta(response) da api
            setpaises(response.data)
            setloading(false)

            //catch -> caso a requisição retorne uma resposta positiva
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
    //"componente" condicional
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
    /*O componente Select espera receber dois valores, "value" e "label" que
    se referem ao "id" e "nome" de cada dado json da api. Valor informado como code(nome do id da api) e
    name(apelido da propriedade que carrega o valor do nome). O mesmo se refere para a API de cidade
    */
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

                    {/* chamada do input Mask, passando a propriedade da mascara com expressoes regulares */}
                    <MaskedInput placeholder='Digite seu telefone' mask={['(',/\d/,/\d/,/\d/,')',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]} minLength={11} required/>
                    
                    <br />

                    <label htmlFor="cpf">CPF: </label>
                    <br />
                    {/* utilizando a biblioteca MaskedImput com expressão regular(regex) */}
                    <MaskedInput placeholder='Digite seu CPF' mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]} minLength={11} required/>
                    
                </div>
                <div id='div-destinos'>
                    <label htmlFor="pais" required>Pais: </label>
                    {/* Chamada do componente "Select" passando todos os elementos da api por meio da
                    variavel "paisesOptions" que recebe um metodo MAP(). Propriedade "isMulti" permite a seleção de multiplos elementos no input*/}
                    <Select className='select' isMulti options={paisesOptions} required/>
                    {/* <select name="" id="" >
                        <option value="" >Selecione</option>
                        {paises.map((pais) => <option required> {pais.name} </option>)}
                    </select> */}
                    
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