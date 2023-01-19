import * as React from 'react';
import InputField_standard from '../../shared/InputField_standard';
import Buttons from '../../shared/Buttons';
import Error from '../../shared/Error';
import { validateString, validateNumber, validateemail, validatetext } from '../../shared/validate';
import { delete_message, get_messages, post_message } from '../../Services/User_Service';
export type Message = {
    id: number;
    age: number;
    fname: string;
    lname: string;
    email: string;
    message: string;
}
type MyState = {
    NewMessage: Message;
    errorMsg: Array<{ name: string, msg: boolean }>;
    DataMessage: Message[];
}
class Contact_State extends React.Component<{}, MyState> {
    state: MyState = {
        NewMessage: { id: 1, age: 0, fname: '', lname: '', email: '', message: '' },
        errorMsg: [{ name: 'age', msg: false }, { name: 'fname', msg: false }, { name: 'lname', msg: false }, { name: 'email', msg: false }, { name: 'message', msg: false }],
        DataMessage: []
    }
    componentDidMount(): void {
        console.log("DID MOUNT")
        get_messages().then((data: Message[]) => {
            this.setState({ DataMessage: data });
        })
    }
    componentDidUpdate(): void {
        console.log('UPDATED')
    }
    changeValue = (value: string, ctrlName: string): void => {
        console.log(ctrlName);
        if (validateString(value)) {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = true;
                    }
                });
                return { errorMsg: erros }
            })
            let { NewMessage } = this.state;
            if (ctrlName === 'fname') {
                NewMessage.fname = value;
            }
            if (ctrlName === 'lname') {
                NewMessage.lname = value;
            }
            if (ctrlName === 'email') {
                NewMessage.email = value;
            }
            if (ctrlName === 'message') {
                NewMessage.message = value;
            }
            if (ctrlName === 'age') {
                NewMessage.age = Number(value);
            }
            this.setState({ NewMessage: NewMessage });

        } else {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = false;
                    }
                    console.log(erros);
                });
                return { errorMsg: erros }
            })
        }
    }
    changeAge = (value: string, ctrlName: string): void => {
        console.log(ctrlName);
        if (validateNumber(value)) {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = true;
                    }
                });
                return { errorMsg: erros }
            })
            let { NewMessage } = this.state;
            if (ctrlName === 'age') {
                NewMessage.age = Number(value);
            }
            this.setState({ NewMessage: NewMessage });

        } else {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = false;
                    }
                });
                return { errorMsg: erros }
            })
        }
    }
    changeEmail = (value: string, ctrlName: string): void => {
        if (validateemail(value)) {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = true;
                    }
                });
                return { errorMsg: erros }
            })
            let { NewMessage } = this.state;
            if (ctrlName === 'email') {
                NewMessage.email = value
            }
            this.setState({ NewMessage: NewMessage });

        } else {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = false;
                    }
                });
                return { errorMsg: erros }
            })
        }
    }
    changeTEXT = (value: string, ctrlName: string): void => {
        if (validatetext(value)) {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = true;
                    }
                });
                return { errorMsg: erros }
            })
            let { NewMessage } = this.state;
            if (ctrlName === 'message') {
                NewMessage.message = value;
            }
            this.setState({ NewMessage: NewMessage });

        } else {
            this.setState(prevSate => {
                let erros = prevSate.errorMsg;
                erros.find(e => {
                    if (e.name === ctrlName) {
                        e.msg = false;
                    }
                });
                return { errorMsg: erros }
            })
        }
    }
    render() {
        console.log(this.state.errorMsg[0].msg)
        return (
            <div>
                {sessionStorage.getItem('userType') === 'client' ? <div className=' d-flex justify-content-center align-items-center ' style={{
                    margin: "100px"
                }
                }>
                    <form style={{ width: "500px" }} className="bg-light p-5 rounded">
                        <div className='form-group text-dark '>
                            <InputField_standard label='Enter Age' placeholder='Age' className="form-control" type='text' name='age' Onchangevalue={this.changeAge}></InputField_standard >
                            <Error valid={this.state.errorMsg[0].msg} message='Invalid form'></Error>
                            <InputField_standard label='Enter First Name' placeholder='Name' className="form-control" type="text" name='fname' Onchangevalue={this.changeValue}></InputField_standard >
                            <Error valid={this.state.errorMsg[1].msg} message='Invalid form'></Error>
                            <InputField_standard label='Enter Last Name' placeholder='Surname' className="form-control" type="text" name='lname' Onchangevalue={this.changeValue}></InputField_standard >
                            <Error valid={this.state.errorMsg[2].msg} message='Invalid form'></Error>
                            <InputField_standard label='Enter Email' placeholder='Email' className="form-control" type="text" name='email' Onchangevalue={this.changeEmail}></InputField_standard >
                            <Error valid={this.state.errorMsg[3].msg} message='Invalid form'></Error>
                            <InputField_standard label='Enter Message' placeholder='Message' className="form-control" type="text" name='message' Onchangevalue={this.changeTEXT}></InputField_standard >
                            <Error valid={this.state.errorMsg[4].msg} message='Invalid form'></Error>

                        </div>
                        <div>
                            <Buttons label="Send it" disabled={!(this.state.errorMsg[0].msg && this.state.errorMsg[1].msg && this.state.errorMsg[2].msg && this.state.errorMsg[3].msg && this.state.errorMsg[4].msg)} type="submit" className="btn btn-success btn-block" onClick={() => {
                                let tmp: number = this.state.DataMessage[this.state.DataMessage.length - 1].id + 1;
                                this.state.NewMessage.id = tmp;
                                post_message(this.state.NewMessage);
                            }}></Buttons>
                        </div>
                    </form >
                </div > :
                    <div className="center bg-light rounded m-5">
                        <h3>Wiadomosci: </h3>
                        <table className="table table-striped text-center mt-3">
                            <thead>
                                <tr>
                                    <th>Age:</th>
                                    <th>First Name:</th>
                                    <th>Second Name:</th>
                                    <th>Email:</th>
                                    <th>Message:</th>
                                    <th>Delete:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.DataMessage.map((e, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
                                            <td className="py-4 px-6">{e.age}</td>
                                            <td className="py-4 px-6">{e.fname}</td>
                                            <td className="py-4 px-6">{e.lname}</td>
                                            <td className="py-4 px-6">{e.email}</td>
                                            <td className="py-4 px-6">{e.message}</td>
                                            <td><button className="btn btn-outline-danger" onClick={async () => {
                                                await delete_message(e.id);
                                                await get_messages().then((data: Message[]) => {
                                                    this.setState({ DataMessage: data });
                                                })
                                            }}>Delete</button></td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>
                    </div>}
            </div>);
    }
}

export default Contact_State;