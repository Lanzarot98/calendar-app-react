import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

const loginFormFields = {
    loginEmail:    '',
    loginPassword: '',
}

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}


export const LoginPage = () => {

    const { startRegister, startLogin, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields )
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields )

    const loginSubmit = ( event ) => {
        event.preventDefault();
        // console.log({ loginEmail, loginPassword });
        startLogin({ email: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Register failed', 'Passwords not equals', 'error');
            return;
        }
        //console.log({ registerName, registerEmail, registerPassword, registerPassword2 });
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Authentication failed', errorMessage, 'error');
      }

    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Login to <strong>Calendar App</strong>📆</h3>
                    <form onSubmit={ loginSubmit } >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2 text-center">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Sign up</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Full name"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group mb-2 text-center">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Sign up" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
