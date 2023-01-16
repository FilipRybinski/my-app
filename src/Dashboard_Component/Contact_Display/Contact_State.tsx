import * as React from 'react';
import Contact_Display from './Contact';
interface Contact_StateProps {

}

interface Contact_StateState {

}

class Contact_State extends React.Component<Contact_StateProps, Contact_StateState> {
    constructor(props: Contact_StateProps) {
        super(props);
        // this.state = { : };
    }
    render() {
        return (<Contact_Display></Contact_Display>);
    }
}

export default Contact_State;