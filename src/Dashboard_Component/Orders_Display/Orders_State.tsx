import * as React from 'react';
import Orders_Admin from './Orders_Admin';
import { get_orders, get_registrations } from '../../Services/User_Service';
import Orders_Client from './Orders_Client';

export type Orders_Model = {
    id: number;
    accept_date: Date;
    description: string;
    completed: boolean;
    email: string;
    wycena: number
    date_collect: Date;
}
export type registrationModelType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    model_type: string;
    des_of_problem: string;
    des_of_demage: string;
}

type Orders_StateState = {
    orders: Orders_Model[];
    registrations: registrationModelType[];
}
class Orders_State extends React.Component<{}, Orders_StateState> {

    state = {
        orders: [],
        registrations: []

    };
    componentDidMount(): void {
        console.log("DID MOUNT");
        get_orders().then((data: Orders_Model[]) => {
            this.setState({ orders: data })
        })
        get_registrations().then((data: registrationModelType[]) => {
            this.setState({ registrations: data })
        })
    }
    componentDidUpdate(): void {

        console.log("UPDATED")
    }
    render() {
        return (<div>
            {sessionStorage.getItem('userType') === 'client' ? <Orders_Client orders={this.state.orders} registrations={this.state.registrations}></Orders_Client> : <Orders_Admin orders={this.state.orders} registrations={this.state.registrations}></Orders_Admin>}
        </div>);
    }
}

export default Orders_State;