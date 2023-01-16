import axios from "axios";
import { State_Register } from "../Register_Component/Register_State";
import { Orders_Model, registrationModelType } from "../Dashboard_Component/Orders_Display/Orders_State";
const API = "http://localhost:3000/"
class User_Service {
    register(firstName: string, lastName: string, email: string, phone: string, password: string, type: string) {
        return axios.post(API + "singup", {
            firstName,
            lastName,
            email,
            phone,
            password,
            type
        });
    }
    login(email: string, password: string) {
        let UserType: boolean = false;
        let Name: string = '';
        return axios.get(API + "singup").then(data => {
            const user = data.data.find((a: State_Register) => {
                a.type === 'client' ? UserType = false : UserType = true;
                Name = a.fname;
                return a.email === email && a.password === password
            });
            if (user) {
                sessionStorage.setItem('token', '5QvJ6Taggymns8a2LPvn');
                sessionStorage.setItem('name', Name);
                sessionStorage.setItem('email', email);
                UserType === true ? sessionStorage.setItem('userType', 'admin') : sessionStorage.setItem('userType', 'client');
            } else {
                return false;
            }
        })
    }
}
export default new User_Service();

export const get_orders = async (): Promise<Orders_Model[]> => {
    let orders: Orders_Model[];
    try {
        const { data } = await axios.get(API + "orders");
        orders = data;
        return orders;
    } catch {
        return [];
    }
}
export const get_registrations = async (): Promise<registrationModelType[]> => {
    let registrations: registrationModelType[];
    try {
        const { data } = await axios.get(API + "registration_order");
        registrations = data;
        return registrations;
    } catch {
        return [];
    }
}
export const delete_order = async (id: number): Promise<void> => {
    await axios.delete(API + "orders/" + id);
}
export const delete_registrations = async (id: number): Promise<void> => {
    await axios.delete(API + "registration_order/" + id);
}
export const post_order = async (object: Orders_Model): Promise<number | null> => {
    try {
        const { data, status } = await axios.post(API + 'orders', object)
        return status;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}
export const update_order = async (object: Orders_Model, id: number) => {
    try {
        console.log('dziala')
        await axios.put(API + 'orders/' + id, object)
    } catch (error) {
        console.log("error", error);
        return null;
    }
}
export const add_registration = async (id: number, firstName: string, lastName: string, email: string, model_type: string, des_of_problem: string, des_of_demage: string) => {
    try {
        const { data, status } = await axios.post(API + 'registration_order', {
            firstName,
            lastName,
            email,
            model_type,
            des_of_problem,
            des_of_demage
        })
        return status;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}