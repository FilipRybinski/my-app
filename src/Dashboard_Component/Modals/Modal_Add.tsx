import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Buttons from '../../shared/Buttons';
import { Formik, Form } from "formik";
import InputField from '../../shared/InputField';
import { validate } from '../../shared/formvalid_registration';
import { add_registration } from '../../Services/User_Service';
import { registrationModelType } from '../Orders_Display/Orders_State';
type Myprops = {
    opened: boolean;
    onBackdropClick: () => void;
    registration: registrationModelType[];
}
function Modal_Add(props: Myprops) {

    const handleAdd = (formValue: { firstName: string, lastName: string, email: string, model_type: string, des_of_problem: string, des_of_demage: string }) => {
        let tmp: number;
        props.registration.length === 0 || NaN ? tmp = 1 : tmp = props.registration[props.registration.length - 1].id + 1;
        const { firstName, lastName, email, model_type, des_of_problem, des_of_demage } = formValue;
        add_registration(tmp, firstName, lastName, email, model_type, des_of_problem, des_of_demage);
    }
    const initialValues = {
        firstName: "",
        lastName: "",
        email: sessionStorage.getItem('email')!,
        model_type: "",
        des_of_problem: '',
        des_of_demage: ''
    }
    return (
        <Modal show={props.opened} onHide={props.onBackdropClick} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Registration:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialValues} onSubmit={handleAdd} validationSchema={validate}>
                    {formik => (
                        <div className='justify-content-center align-items-center p-5 bg-light ' style={{ borderRadius: "15px" }}>
                            <h1>Register Form</h1>
                            <Form>
                                <InputField label="First Name" name='firstName' type='text' placeholder="First Name"></InputField>
                                <InputField label="Last Name" name='lastName' type='text' placeholder="Last Name"></InputField>
                                <InputField label="Email" name='email' type='email' placeholder="Email Name" readOnly></InputField>
                                <InputField label="Model Type" name='model_type' type='text' placeholder="Model Type"></InputField>
                                <InputField label="Description of the problem" name='des_of_problem' type='text' placeholder="Enter Description"></InputField>
                                <InputField label="What probably made this demage" name='des_of_demage' type='text' placeholder="Enter Description"></InputField>
                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" onClick={props.onBackdropClick}>Close</Button>
                                    <Buttons label="Send" type='submit' className="btn btn-success btn-block ms-3" onClick={async () => {
                                        await handleAdd;
                                        props.onBackdropClick();

                                    }} disabled={!(formik.dirty && formik.isValid)} >Save Changes</Buttons>
                                </div>
                            </Form>
                        </div>)}
                </Formik>
            </Modal.Body >
        </Modal >);
}

export default Modal_Add;