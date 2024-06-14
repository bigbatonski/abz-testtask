
function Button( {style={}, text, disabled, handleClick, type, href=null}) {
  return (
    <a href={href}>
    <button style={style} type={type} disabled={disabled} onClick={handleClick} className={disabled ? 'button-disabled center-flex' : 'button-active center-flex'}>
       <p>{text}</p> 
    </button>
    </a>
  )
}

export default Button
