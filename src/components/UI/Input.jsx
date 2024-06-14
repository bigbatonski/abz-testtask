


 function Input ({type="text" ,name, placeholder, errorMessage, value="", onChange, onBlur, isTouched}) {
    
    return (
        <label htmlFor={name} className="form__input_wrapper">
            {value.length ? <div className='form__label' style={errorMessage? {color: "red"} : null}>{placeholder}</div> : null}
            <input
                autoComplete='off'
                type={type}
                className="form__text_input"
                placeholder={placeholder}
                onBlur={onBlur}
                id={name}
                value={value}
                onChange={onChange}
            />
            <span className='error_message'>{errorMessage}</span>
        </label>
    );
}

export default Input

