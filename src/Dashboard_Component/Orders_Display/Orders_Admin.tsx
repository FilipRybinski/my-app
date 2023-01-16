import React from "react";
import { Orders_Model, registrationModelType } from "./Orders_State";
import { delete_order, delete_registrations, get_orders, get_registrations, post_order } from "../../Services/User_Service";
import Modal_Edit from "../Modals/Modal_Edit";
import Modal_Date from "../Modals/Modal_Date";

type MyProps = {
    orders: Orders_Model[];
    registrations: registrationModelType[];
}

function Orders_Admin(props: MyProps) {
    const [orders_x, setOrders] = React.useState([...props.orders]);
    const [registrations_x, setRegistrations] = React.useState([...props.registrations]);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [isModalVisible2, setModalVisible2] = React.useState(false);
    const [order_passed, setOrderpassed] = React.useState({ ...props.orders[0] });
    const [registration_passed, setRegistrationspassed] = React.useState({ ...props.registrations[0] });
    const toggleModal = () => {
        setModalVisible(wasModalVisible => !wasModalVisible);
    }
    const toggleModal2 = () => {
        setModalVisible2(wasModalVisible => !wasModalVisible);
    }
    React.useEffect(() => {
        get_orders().then((data: Orders_Model[]) => {
            setOrders([...data])
        });
        get_registrations().then((data: registrationModelType[]) => {
            setRegistrations([...data])
        });
        console.log("UPDATE FN");
    }, [isModalVisible, isModalVisible2])
    return (
        <div className="bg-light mt-5 container p-5" style={{ borderRadius: "15px" }}>
            <div className="bg-light mt-5 container">
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
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders_x.map((e, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" >
                                    <td className="py-4 px-6">{e.id}</td>
                                    <td className="py-4 px-6">{e.accept_date.toString().split('T')[0]}</td>
                                    <td className="py-4 px-6">{e.email}</td>
                                    <td className="py-4 px-6">{e.description}</td>
                                    <td className="py-4 px-6">{e.wycena}</td>
                                    <td className="py-4 px-6"> {e.date_collect.toString().split('T')[0]}</td>
                                    {e.completed ? <td>Zakonczona</td> : <td>W toku</td>}
                                    <td><button className="btn btn-outline-primary" onClick={() => { toggleModal(); setOrderpassed(e) }} >Edit</button></td>
                                    <td><button className="btn btn-outline-danger" onClick={async () => {
                                        await delete_order(e.id);
                                        await get_orders().then((data: Orders_Model[]) => {
                                            setOrders([...data])
                                        })
                                    }}>Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table >
            </div >
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
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations_x.map((e, index) => {
                            return (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center" >
                                    <td className="py-4 px-6">{e.id}</td>
                                    <td className="py-4 px-6">{e.firstName}</td>
                                    <td className="py-4 px-6">{e.lastName}</td>
                                    <td className="py-4 px-6">{e.email}</td>
                                    <td className="py-4 px-6">{e.model_type}</td>
                                    <td className="py-4 px-6">{e.des_of_problem}</td>
                                    <td><button type="button" onClick={async () => {
                                        toggleModal2();
                                        setRegistrationspassed(e);
                                    }} className="btn btn-success">Accept</button></td>
                                    <td><button className="btn btn-danger" onClick={async () => {
                                        await delete_registrations(e.id);
                                        await get_registrations().then((data: registrationModelType[]) => {
                                            setRegistrations([...data])
                                        })
                                    }
                                    }>Reject</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <Modal_Date opened={isModalVisible2} onBackdropClick={(toggleModal2)} registration={registration_passed} orders={orders_x}></Modal_Date>
            <Modal_Edit opened={isModalVisible} onBackdropClick={(toggleModal)} order={order_passed}></Modal_Edit>
        </div>);
}

export default Orders_Admin;