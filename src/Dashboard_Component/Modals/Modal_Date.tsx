import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Buttons from '../../shared/Buttons';
import { Formik, Form } from "formik";
import InputField from '../../shared/InputField';
import { validate } from '../../shared/formvalid_price';
import { add_registration, delete_registrations, post_order } from '../../Services/User_Service';
import { registrationModelType, Orders_Model } from '../Orders_Display/Orders_State';
type Myprops = {
    opened: boolean;
    onBackdropClick: () => void;
    registration: registrationModelType;
    orders: Orders_Model[];

}
function Modal_Date(props: Myprops) {
    let date: string = new Date().toISOString().split("T")[0];
    // const apply = () => {
    //     let tmp: number;
    //     props.orders.length === 0 || NaN ? tmp = 1 : tmp = props.orders[props.orders.length - 1].id + 1;
    //     let new_order: Orders_Model = {
    //         id: tmp,
    //         accept_date: new Date(),
    //         description: props.registration.des_of_problem,
    //         completed: false,
    //         email: props.registration.email,
    //         wycena: price,
    //         date_collect: new Date(date_recive)
    //     }
    //     console.log(new_order)
    // }
    const handleAdd = (formValue: { wycena: string, data_collect: string }) => {
        const { wycena, data_collect } = formValue;
        let price: number = Number(wycena);
        let new_date: Date = new Date(data_collect);
        let tmp: number;
        props.orders.length === 0 || NaN ? tmp = 1 : tmp = props.orders[props.orders.length - 1].id + 1;
        let new_order: Orders_Model = {
            id: tmp,
            accept_date: new Date(),
            description: props.registration.des_of_problem,
            completed: false,
            email: props.registration.email,
            wycena: price,
            date_collect: new_date
        }
        post_order(new_order);
    }
    const initialValues = {
        wycena: '',
        data_collect: '',
    }
    return (
        <Modal show={props.opened} onHide={props.onBackdropClick} centered>
            <Modal.Header closeButton>
                <Modal.Title>Zmien status zamówienia:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik initialValues={initialValues} onSubmit={handleAdd} validationSchema={validate}>
                    {formik => (
                        <div className='justify-content-center align-items-center p-5 bg-light ' style={{ borderRadius: "15px" }}>
                            <h1>Pricing Form</h1>
                            <Form>
                                <InputField label="Price" name='wycena' type='number' placeholder="Price"></InputField>
                                <InputField label="Date" name='data_collect' type='date' min={date} placeholder="Last Name"></InputField>
                                <div className='d-flex justify-content-end'>
                                    <Button variant="secondary" onClick={props.onBackdropClick}>Close</Button>
                                    <Buttons label="Send" type='submit' className="btn btn-success btn-block ms-3" onClick={async () => {
                                        await handleAdd;
                                        await delete_registrations(props.registration.id);
                                        props.onBackdropClick();
                                    }} disabled={!(formik.dirty && formik.isValid)} >Save Changes</Buttons>
                                </div>
                            </Form>
                        </div>)}
                </Formik>
            </Modal.Body>
        </Modal>);
}

export default Modal_Date;