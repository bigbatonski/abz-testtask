import Baner from './components/header-baner/Banner'
import GetUsersSection from './components/sections/get-user/GetUsersSection'
import Header from './components/header-baner/Header'
import PostUserSection from './components/sections/post-user/PostUserSection'

export default function App() {
  return (
    <>
            <section>
                <Header/>
                <Baner/>
            </section>
        <div className='container'>
            <section>
                <GetUsersSection />
            </section>
            <section>
                    <PostUserSection /> 
            </section>
        </div>
    </>
  )
}
