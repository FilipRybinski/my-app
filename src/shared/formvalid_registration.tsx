import * as Yup from "yup";
export const validate = Yup.object({
    firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    model_type: Yup.string()
        .required('Password is required'),
    des_of_problem: Yup.string()
        .required('Password is required'),
    des_of_demage: Yup.string()
        .required('Password is required')
});
