import React from 'react'
type MyProp = {
    valid: boolean;
    message: string;
}
const Error = (props: MyProp) => {

    return (
        <div>
            {props.valid ? (
                <p style={{ color: "green" }}>Valid Form</p>
            ) : (
                <p style={{ color: "red" }}>InValid Form</p>
            )}
        </div>
    )
}

export default Error