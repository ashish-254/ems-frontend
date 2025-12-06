import React from 'react'

export default function LableAndInputField({label_text, input_name, input_type, input_placeHolder, onChange}) {
    return (
        <div className="inputs">
            <label htmlFor="" className='input_label'>{label_text}</label>
            <textarea type={input_type} name={input_name} className="input_field_textarea" placeholder={input_placeHolder} onChange={onChange} />
        </div>
    )
}
