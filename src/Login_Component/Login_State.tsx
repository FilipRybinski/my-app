import * as React from 'react';
import { Navigate } from "react-router-dom";
import { Formik, Form, } from "formik";
import { validate } from '../shared/formvalid_login';
import Buttons from '../shared/Buttons';
import InputField from '../shared/InputField';
import { login } from '../Services/User_Service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { delay } from '../shared/Buttons';
type Props = {

}
type State = {
    redirect: string | null,
    email: string,
    password: string,
    success: boolean,
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            redirect: null,
            email: "",
            password: "",
            success: false,
        };
    }
    async handleLogin(formValue: { email: string, password: string }, { resetForm }: any) {
        const { email, password } = formValue;
        await login(email, password);
        if (sessionStorage.getItem('token') !== null) {
            toast.success('Success!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            await delay(2000);
            this.setState({
                redirect: "/dashboard"
            });
        } else {
            toast.error('Failed!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
            });
            resetForm();
            return (<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="dark" />)
        }


    }
    render() {
        const initialValues = {
            email: "",
            password: "",
        };
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
        return (<div className='d-flex justify-content-center align-items-center text-dark ' style={{ height: "100vh" }}>
            <Formik initialValues={initialValues} onSubmit={this.handleLogin} validationSchema={validate}>
                {formik => (
                    <div className='justify-content-center align-items-center p-5 bg-light ' style={{ borderRadius: "15px", width: "350px" }}>
                        <h1>Login Form</h1>
                        <Form>
                            <InputField label="Email" name='email' type='text' placeholder="Email"></InputField>
                            <InputField label="Password" name='password' type='password' placeholder="Password"></InputField>
                            <div className='d-flex flex-column justify-content-end'>
                                <Buttons label="Log in" type="submit" disabled={!(formik.dirty && formik.isValid)} className="btn btn-success btn-block"></Buttons>
                                <Buttons label="Register Now!" type="button" className="btn btn-primary btn-block mt-2"></Buttons>
                            </div>
                        </Form>
                    </div>)}
            </Formik>
        </div >);
    }
}

export default Login;