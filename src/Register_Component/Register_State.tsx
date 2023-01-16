import React from 'react'
import { Formik, Form } from "formik";
import InputField from '../shared/InputField';
import User_Service from '../Services/User_Service';
import { validate } from '../shared/formvalid_register'
import Buttons from '../shared/Buttons';

type Props = {

}
export type State_Register = {

    fname: string;
    lname: string;
    email: string;
    phone: string;
    password: string
    type: string;
}
class Register extends React.Component<Props, State_Register> {
    constructor(props: Props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            password: '',
            type: 'client',
        };
    }
    handleRegister(formValue: { fname: string, lname: string, email: string, phone: string, password: string, type: string }) {
        const { fname, lname, email, phone, password, type } = formValue;
        User_Service.register(fname, lname, email, phone, password, type);

    }

    render() {
        const initialValues = {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            password: '',
            type: 'client',
        };
        return (
            <div className='d-flex justify-content-center align-items-center text-dark ' style={{ height: "100vh" }}>
                <Formik initialValues={initialValues} onSubmit={this.handleRegister} validationSchema={validate}>
                    {formik => (
                        <div className='justify-content-center align-items-center p-5 bg-light ' style={{ borderRadius: "15px" }}>
                            <h1>Register Form</h1>
                            <Form>
                                <InputField label="First Name" name='fname' type='text' placeholder="First Name"></InputField>
                                <InputField label="Last Name" name='lname' type='text' placeholder="Last Name"></InputField>
                                <InputField label="Email" name='email' type='email' placeholder="Email Name"></InputField>
                                <InputField label="Phone" name='phone' type='phone' placeholder="Phone"></InputField>
                                <InputField label="Password" name='password' type='password' placeholder="Password"></InputField>
                                <div className='d-flex justify-content-end'>
                                    <Buttons label="Sign Up" type="submit" disabled={!(formik.dirty && formik.isValid)} className="btn btn-success btn-block"></Buttons>
                                    <Buttons label="Reset form" type="reset" disabled={!(formik.dirty)} onClick={() => formik.resetForm()} className="btn btn-danger btn-block ms-3"></Buttons>
                                </div>
                            </Form>
                        </div>)}
                </Formik>
            </div>
        );
    }
}

export default Register;