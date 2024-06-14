import { useContext, useState, useLayoutEffect } from "react"
import axios from 'axios'
import UserCard from "./UserCard"
import Button from "../../UI/Button"
import { FetchContext } from '../../context/RefetchUsersContext';


function GetUsersSection() {

  const [users, setUsers] = useState([])
  const [nextUrl, setNextUrl] = useState("https://frontend-test-assignment-api.abz.agency/api/v1/users?count=6") 
  const [prevUrl, setPrevUrl] = useState(null)
  const {shouldRefetch, cleanUpRefetch} = useContext(FetchContext)

  async function getUsers(url) { 
    try {

        axios
            .get(url)
            .then(response => {
              setUsers(response.data.users)
              setNextUrl(response.data.links.next_url)
              setPrevUrl(response.data.links.prev_url)
        
            })
            
      } catch(error) {
    
        console.log(error)
      }
    }

//has shouldRefetch dep to listen postUser action
  useLayoutEffect(() => { 
    console.log('i have worked')
    getUsers(shouldRefetch ? shouldRefetch : nextUrl)
    .then(()=>{
      cleanUpRefetch()
      setNextUrl("https://frontend-test-assignment-api.abz.agency/api/v1/users?count=6")
      setPrevUrl(null)
    })

    
    }, [shouldRefetch])


  return (
    <div id="get-user" className="get_request">
        <h1>Working with GET request</h1>
        <div className="get_request__grid">
          {users && users.map(user => {
            return (
            <UserCard
                key={user.id}
                img={user.photo}
                name={user.name}
                position={user.position}
                email={user.email}
                phone={user.phone}
            />)
            })}
        </div>
        {/* once Show More button is cleclked its being replaced with 2 buttons that are navigating by prev and next link received from API and storead in state */}
        {prevUrl ? 
                  <div className="page_navigation">
                    <Button handleClick={()=> {getUsers(prevUrl)}} text='Back'/>
                    <Button disabled={nextUrl ? false : true} handleClick={()=>{getUsers(nextUrl)}} text='Next'/>
                  </div>  
                    :
                    <Button handleClick={()=>{getUsers(nextUrl)}} text='Show more' /> }

      
    </div>
  )
}

export default GetUsersSection