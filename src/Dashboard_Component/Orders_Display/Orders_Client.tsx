import { Orders_Model, registrationModelType } from "./Orders_State";
import * as React from 'react';
import { get_registrations } from "../../Services/User_Service";
import Modal_Add from "../Modals/Modal_Add";
type MyProps = {
    orders: Orders_Model[];
    registrations: registrationModelType[];
}

function Orders_Client(props: MyProps) {
    const [registrations_x, setRegistrations] = React.useState([...props.registrations]);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const toggleModal = () => {
        setModalVisible(wasModalVisible => !wasModalVisible);
        get_registrations().then((data: registrationModelType[]) => {
            setRegistrations([...data])
        });
    }
    React.useEffect(() => {
        get_registrations().then((data: registrationModelType[]) => {
            setRegistrations([...data])
        });
        console.log("UPDATE FN");
    }, [props.registrations, isModalVisible])
    return (<div className="bg-light mt-5 container p-5" style={{ borderRadius: "15px" }}>
        <div className="bg-light mt-5 container ">
            <h3>Lista zleceń: </h3>
            <table className="table table-striped text-center mt-3">
                <thead>
                    <tr>
                        <th>Id Zlecenia:</th>
                        <th>Data Akceptacji:</th>
                        <th>Email:</th>
                        <th>Opis Zlecenia:</th>
                        <th>Wycena:</th>
                        <th>Data odbioru:</th>
                        <th>Status:</th>
                    </tr>
                </thead>
                <tbody>
                    {props.orders.map((e, index) => {
                        if (e.email === sessionStorage.getItem('email')) {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" >
                                    <td className="py-4 px-6">{e.id}</td>
                                    <td className="py-4 px-6">{e.accept_date.toString().split('T')[0]}</td>
                                    <td className="py-4 px-6">{e.email}</td>
                                    <td className="py-4 px-6">{e.description}</td>
                                    <td className="py-4 px-6">{e.wycena}</td>
                                    <td className="py-4 px-6"> {e.date_collect.toString().split('T')[0]}</td>
                                    {e.completed ? <td>Zakonczona</td> : <td>W toku</td>}
                                </tr>
                            )
                        }
                    })
                    }
                </tbody>
            </table >
        </div>
        <div className="bg-light mt-5 container">
            <h3>Lista zgloszeń: </h3>
            <table className="table table-striped text-center mt-3">
                <thead>
                    <tr>
                        <th>Id Zlecenia:</th>
                        <th>Imie:</th>
                        <th>Nazwisko:</th>
                        <th>Email:</th>
                        <th>Model:</th>
                        <th>Description:</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations_x.map((e, index) => {
                        if (e.email === sessionStorage.getItem('email')) {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" >
                                    <td className="py-4 px-6">{e.id}</td>
                                    <td className="py-4 px-6">{e.firstName}</td>
                                    <td className="py-4 px-6">{e.lastName}</td>
                                    <td className="py-4 px-6">{e.email}</td>
                                    <td className="py-4 px-6">{e.model_type}</td>
                                    <td className="py-4 px-6">{e.des_of_problem}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            <button type="button" onClick={() => {
                toggleModal();

            }} className="btn btn-success">Add registration</button>
        </div>
        <Modal_Add opened={isModalVisible} onBackdropClick={(toggleModal)} registration={props.registrations}></Modal_Add>
    </div>);
}

export default Orders_Client;