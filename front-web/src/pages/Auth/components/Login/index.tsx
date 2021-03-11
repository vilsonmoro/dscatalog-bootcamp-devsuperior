import React, { useState } from 'react';
import ButtonIcon from 'core/components/ButtonIcon';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    
    const onSubmit = (data: FormData) => {
        //chama a API
        makeLogin(data)
        .then(response => {
            setHasError(false)
        })
        .catch(() => {
            setHasError(true);
        });
    }

    return (
        <AuthCard title="Login">
            {hasError && (
                <div className="alert alert-danger">
                    Usuário ou senha inválidos!
                </div>
            )}
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                     type="email" 
                     className="form-control input-base margin-bottom-30"
                     placeholder="Email"
                     name="username"
                     ref={register}
                />
                <input 
                     type="password" 
                     className="form-control input-base"
                     placeholder="Senha"
                     name="password"
                     ref={register}
                />
                <Link to="/admin/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>  
                <div className="text-center">
                   <span className="not-registered"> 
                       Não tem cadastro?
                   </span>
                   <Link to="/admin/auth/register" className="login-link-register">
                      CADASTRAR
                    </Link>    
                </div>              
            </form>

        </AuthCard>            
    )
}

export default Login;