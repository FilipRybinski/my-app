import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Orders_Model } from './../Orders_Display/Orders_State';
import * as React from 'react';
import { async } from 'rxjs';
import { update_order } from '../../Services/User_Service';

type Myprops = {
    opened: boolean;
    onBackdropClick: () => void;
    order: Orders_Model;

}
function Modal_Edit(props: Myprops) {
    const change = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === 'W toku') {
            props.order.completed = false;
            console.log(props.order.completed);
        }
        if (value === 'Zakończony') {
            props.order.completed = true;
            console.log(props.order.completed);
        }
    }
    return (
        <Modal show={props.opened} onHide={props.onBackdropClick} centered>
            <Modal.Header closeButton>
                <Modal.Title>Zmien status zamówienia:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label className='mr-2'>Wybierz: </label>
                <select onChange={change} >
                    <option hidden>Choose one:</option>
                    <option >Zakończony</option>
                    <option >W toku</option>
                </select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onBackdropClick}>
                    Close
                </Button>
                <Button variant="primary" onClick={async () => {
                    console.log(props.order);
                    await update_order(props.order, props.order.id);
                    props.onBackdropClick();
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>);
}

export default Modal_Edit;