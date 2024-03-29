import React, { useState } from 'react';
import ButtonIcon from 'core/components/ButtonIcon';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import AuthCard from '../Card';
import './styles.scss';
import { makeLogin } from 'core/utils/request';
import { saveSessionData } from 'core/utils/auth';

type FormState = {
    username: string;
    password: string;  
}

type LocationState = {
    from: string;
}

const Login = () => {
    const { register, handleSubmit, errors } = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const { from } = location.state || { from: { pathname: "/" } }

    const onSubmit = (data: FormState) => {
        //chama a API
        makeLogin(data)
        .then(response => {
            setHasError(false);
            saveSessionData(response.data);
            history.replace(from);
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
                
                <div className="margin-bottom-30">
                    <input 
                        type="email" 
                        className={`form-control input-base ${errors.username ? 'is-invalid' : '' }`}
                        placeholder="Email"
                        name="username"             
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                               message: "Email inválido"
                            }
                        })}                         
                    />
                    {errors.username && (
                       <div className="invalid-feedback d-block">
                          {errors.username.message}
                       </div>
                    )}                    
                </div>

                <div className="margin-bottom-30">
                    <input 
                        type="password" 
                        className={`form-control input-base ${errors.password ? 'is-invalid' : '' }`}
                        placeholder="Senha"
                        name="password"
                        ref={register({required: true})}
                    />
                     {errors.password && (
                       <div className="invalid-feedback d-block">
                          Campo inválido
                       </div>
                    )}
                </div>
                
                <Link to="/auth/recover" className="login-link-recover">
                    Esqueci a senha?
                </Link>
                <div className="login-submit">
                    <ButtonIcon text="logar" />
                </div>  
                <div className="text-center">
                   <span className="not-registered"> 
                       Não tem cadastro?
                   </span>
                   <Link to="/auth/register" className="login-link-register">
                      CADASTRAR
                    </Link>    
                </div>              
            </form>

        </AuthCard>            
    )
}

export default Login;