import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function Buttons({ label, ...props }: any) {
    const navigate = useNavigate();
    if (label === "Sign Up") {
        return (<div>
            <button {...props} onClick={async () => {
                toast.success('Registration Successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "dark",
                });
                await delay(4000);
                navigate('/login');
            }}>{label}</button>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="dark" />
        </div>)
    }
    if (label === "Register Now!") {
        return (<div className='d-flex flex-column'>
            <button {...props} onClick={async () => {
                toast.loading('Redirecting!', {
                    position: "top-right"
                });
                await delay(2000);
                navigate('/register');
            }}>{label}</button>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} theme="dark" />
        </div>)
    } else {
        return (
            <button {...props}>{label}</button>
        );
    }
}

export default Buttons;