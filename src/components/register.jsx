import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { register } from "../services/userService";
import auth from '../services/authService';

class Register extends Form {
    state = { 
        data: {
            username: '',
            password: '',
            name: ''
        },
        errors: {}
     }

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password").min(5),
        name: Joi.string().required().label("Name")
    }

    async doSubmit() {

        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers['x-auth-token']);
            window.location = '/';
        }
        catch(ex) {
            if (ex.response && ex.response.status >= 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    }

    render() { 
        return (
            <div>
                <h1>Register</h1>

                <form action="" onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("name", "Name", "text")}
                    {this.renderButton("Register")}
                </form>

            </div>
        );
    }
}
 
export default Register;