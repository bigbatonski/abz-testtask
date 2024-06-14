
import Button from '../UI/Button'
import logo from '../../images/Logo.svg'

 function Header() {
  return (
    <div className='header  center-flex' id='header-mobile'>
        <div className="header__wrapper">
            <div>
                <img src={logo} className="logo" alt="TEST TASK LOGO" />
            </div>
            <div className="button-container">
                <Button text="Users" href="#get-user"  />
                <Button text="Sign up" href="#post-user" />
            </div>
        </div>
    </div>
  )
}

export default Header