import * as Yup from "yup";
export const validate = Yup.object({
    wycena: Yup.string()
        .required('Required'),
    data_collect: Yup.string()
        .required('Required')
});
