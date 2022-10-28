
import './Form.css'

const Form = () =>{
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
                <option value="braganca-paulista" disabled>Bragança Paulista</option>
            </select>

            <input type="submit" value="Enviar" />
        </form>
        </>
    )
}

export default Form