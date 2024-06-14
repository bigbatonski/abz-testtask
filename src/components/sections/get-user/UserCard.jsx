import Tooltip from "../../UI/Tooltip"
import { useState } from "react"


export default function UserCard({img, name, position, email, phone}) {
  const [nameTooltip, setNameTooltip] = useState(false)
  const [emailTooltip, setEmailTooltip] = useState(false)
  
  //Togling Name tooltip 
  const showNameTooltip = () => {
    setNameTooltip(true)
  }

  const hideNameTooltip = () => {
    setNameTooltip(false)
  }
  //Toggling Email tooltip
  const showEmailTooltip = () => {
    setEmailTooltip(true)
  }

  const hideEmailTooltip = () => {
    setEmailTooltip(false)
  }



  return (
    <div className="user_card">
        <div className="user_card__wrapper">
            <div>
                <img src={img} alt="profile" />
            </div>
            <div className="user_card__wrapper__name" 
              onMouseEnter={showNameTooltip}
              onMouseLeave={hideNameTooltip}
            >
              <p>{name}</p> 
              {nameTooltip && <Tooltip text={name}   style={{top: `${position.y}px`,left: `${position.x}px`,}} />}
            </div>
            <div className="user_card__wrapper__email">
              <p>{position}</p>
              <p 
                onMouseEnter={showEmailTooltip}
                onMouseLeave={hideEmailTooltip}
              >{email}</p>
              {emailTooltip && <Tooltip text={email}  style={{top: `${position.y}px`,left: `${position.x}px`,}}/>}
              <p>{phone}</p>
            </div>        
        </div>
    </div>
  )
}
