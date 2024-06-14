import Button from "../UI/Button"
import background from "../../images/BG_Main.webp"
 function Baner() {
  return (
    <div className='banner center-flex'>
      <img src={background} alt="main background" className="banner__background" fetchpriority="high" />
        <div className="banner__wrapper">
          <div>
              <h1>Test assignment for front-end developer</h1>
              <p>
                  What defines a good front-end developer is one
                  that has skilled knowledge of HTML, CSS, JS with a
                  vast understanding of User design thinking as they'll
                  be building web interfaces with accessibility in mind.
                  They should also be excited to learn,
                  as the world of Front-End Development keeps evolving.
              </p>
          </div>
        <Button text="Sign up"/>
        </div>
    </div>
  )
}

export default Baner
