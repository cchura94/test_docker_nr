import react, { useState, useEffect } from "react"
import authService from "./../../services/auth.service"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const subtitulo = "Ingrese sus credenciales"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function funIngresar() {
        const credenciales = {
            email: email,
            password: password
        }
        console.log(credenciales)
        try {
            const { data } = await authService.loginConNode(credenciales)
            console.log(data)
            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refreshToken", data.refreshToken)


            navigate("/usuario")

        } catch (error) {
            console.log(error);
            alert("Credenciales incorrectas!!");
        }
    }

    return (
        <div>
            {/* 
           <h1>Login (Ingresar)</h1>
            <h2>{ subtitulo }</h2>
            
                <label htmlFor="e">Ingrese su Correo:</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="e">Ingrese su Contraseña:</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <br />
                <input type="button" value="Ingresar" onClick={() => funIngresar()} />
            */
            }
            <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 class="font-bold text-2xl">Ingresar</h3>
                    <p class="text-gray-600 pt-2">Para continuar ingrese sus credenciales .</p>
                </section>

                <section class="mt-10">
                    <form class="flex flex-col" method="POST" action="#">
                        <div class="mb-6 pt-3 rounded bg-gray-200">
                            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                            <input type="text" id="email" onChange={(e) => setEmail(e.target.value)} class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div class="mb-6 pt-3 rounded bg-gray-200">
                            <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
                            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div class="flex justify-end">
                            <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                        </div>
                        <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="button" onClick={() => funIngresar()} >Ingresar</button>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default Login;