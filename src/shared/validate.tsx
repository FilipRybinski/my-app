export const validateString = (stringValue: string): boolean => {
    const regex = new RegExp(/^[a-z\s]{0,10}$/i);
    console.log("validation", stringValue);
    if (stringValue.match(regex)) return true;
    return false;
}
export const validateNumber = (stringValue: string): boolean => {
    const regex = new RegExp(/^[0-9]{0,2}$/i);
    console.log("validation", stringValue);
    if (stringValue.match(regex)) return true;
    return false;
}
export const validateemail = (stringValue: string): boolean => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    console.log("validation", stringValue);
    if (stringValue.match(regex)) return true;
    return false;
}
export const validatetext = (stringValue: string): boolean => {
    const regex = new RegExp(/^[a-z\s]{0,100}$/i);
    console.log("validation", stringValue);
    if (stringValue.match(regex)) return true;
    return false;
}