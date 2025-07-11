import { useRef } from "react"
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup () {
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value;
        
        try {
            await axios.post(BACKEND_URL + "/api/v1/signup", {
                    username,
                    password
             });

            alert("You are signed-up successfully.");

            if(usernameRef.current) usernameRef.current.value = "";
            if(passwordRef.current) passwordRef.current.value = "";

            navigate("/signin");


            } catch (e){
            alert("Sign-up is unsuccessful");
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
                <Button onClick={signup} variant="primary" text="Sign Up" fullWidth/>
            </div>
        </div>
    </div> 
}