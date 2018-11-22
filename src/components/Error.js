import React from 'react'
const Error = (props) => (
    <div>
        Ooop. Something goes wrong.
        <br/>
        {props.error}
    </div>
)

export default Error