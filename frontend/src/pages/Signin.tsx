import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        try {
            const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
                username,
                password
            })

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);

            alert("You are signed in successfully.");

            if(usernameRef.current) usernameRef.current.value = "";
            if(passwordRef.current) passwordRef.current.value = "";

            navigate("/dashboard");

        } catch(e){
            alert("Sign-in is unsuccessfull.")
        }
    }

    return <div className={`fixed inset-0 flex justify-center items-center z-50`}>
        <div className={`absolute h-screen w-screen bg-slate-500 opacity-60`}></div>
        <div className={`bg-white-700 z-10 p-5 min-w-48 rounded-lg`} >
            <br/>
            <div>
                <Input ref={usernameRef} placeholder="User Name" />
                <Input ref={passwordRef} placeholder="Password" />
            </div>
            <div className="flex justify-center m-4">
                <Button onClick={signin} variant="primary" text="Sign In" fullWidth/>
            </div>
        </div>
    </div> 
}