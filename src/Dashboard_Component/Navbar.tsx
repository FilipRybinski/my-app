import { Link, Outlet } from 'react-router-dom'
import '../style/NavbarCSS.css'
function Content() {
    return (
        <div>
            <nav >
                <ul >
                    <li >
                        <Link to={'orders'}>Orders</Link>
                    </li>
                    <li >
                        <Link to={'contact'}>Contact</Link>
                    </li>
                    <li >
                        <Link to={'faq'}>FAQ</Link>
                    </li>
                    <li >
                        <Link to={'/'} onClick={() => { sessionStorage.clear(); }}>Logout</Link>
                    </li>
                    <li className='user'>Welcome, {sessionStorage.getItem('name')}</li>
                </ul>
            </nav>
            <Outlet></Outlet>
        </div>
    );
}

export default Content;