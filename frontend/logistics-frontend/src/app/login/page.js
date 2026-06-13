"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../../src/app/services/api.js";
import { AuthContext } from "../../../src/app/context/authContext.js"
import { FormContainer,
         Input,
         Button,
         Title
 } from "../../../src/app/components/Layout/FormStyle.js";

 export default function Login() {
    const Router = useRouter();
    const { login } = useContext(AuthContext);

    const [ form, setForm ] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await apiRequest("auth/login", "POST", form);
            login(data);
            Router.push("/login");
        }catch (err) {
            setError(err.message)
        }
    }


    return (
        <FormContainer>
            <Title>Login</Title>

            {error && <p style={{color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, email: e.target.value})}/>
                <Input placeholder="Name" onChange={(e) => setForm({ ...form, password: e.target.value})}/>
                <Button type="submit">Login</Button>
            </form>
        </FormContainer>
    )
 };

