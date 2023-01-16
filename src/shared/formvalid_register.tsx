import * as Yup from "yup";
export const validate = Yup.object({
    fname: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lname: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    phone: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 charaters')
        .required('Password is required')
});