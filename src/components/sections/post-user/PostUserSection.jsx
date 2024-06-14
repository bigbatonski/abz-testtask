import { useState } from "react"
import Form from "./Form"
import successIcon from "../../../images/success-image.svg"


function PostUserSection() {

  
  const [success, setSucces] = useState(false)

  const showSuccessIcon = () => {
    setSucces(true)
          setTimeout(()=>{
            setSucces(false)
          }, 2800)
  }

  return (
    <div id="post-user" className='post_user flex-center-col'>
        <h1>{success ?  "User successfully registered" : "Working with POST request"}</h1>
        <div className='post_user__wrapper'>
            {success ? <img src={successIcon} className="success_register" alt="User successfully registered" /> : <Form showSuccessIcon={showSuccessIcon} /> }
        </div>
    </div>
  )
}

export default PostUserSection