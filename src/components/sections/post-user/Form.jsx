/* eslint-disable no-control-regex */
import { useEffect, useState, useContext} from "react";
import { useForm, Controller } from "react-hook-form"
import Button from '../../UI/Button'
import axios from 'axios';
import Input from "../../UI/Input";
import Preloader from "../../UI/Loader";
import { FetchContext } from "../../context/RefetchUsersContext";

function Form({showSuccessIcon}) {
    const formData = new FormData()
    const {triggerRefetch} = useContext(FetchContext)  
    
    //useForm
    const { register, handleSubmit, formState: {errors, isValid}, control } = useForm({mode: "onChange"});
    const [isLoading, setIsLoading] = useState(false)
    //img
    const [imageError, setImageError] = useState(false)
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState(null)
  
    const [token, setToken] = useState()
    const [positions, setPositions] = useState([])

    const getPositions = async () => {
      axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        .then(response => setPositions(response.data.positions))
        .then(response => console.log(`its response${response}`))
        .then(console.log(positions))
        
        .catch(e => console.log(e))
    }

    const getToken = async () => {
      axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        .then(response => setToken(response.data.token))
    }
 
//listen to file input change, sav
    const getImage = (event) => {
      //reset if reupload
      setImageError(false)
      setFileName('')

      const file = event.target.files[0];
      
      //using Img to validate resolution
      const img = new Image();
      const objectUrl = window.URL.createObjectURL(file);
      img.src = objectUrl;
      window.URL = window.URL || window.webkitURL;
      img.onload = () => { if (file.size > 5000000 || (img.naturalWidth < 70 || img.naturalHeight < 70)) {
        if (file.size > 5000000) {
          console.log(`w${img.naturalWidth} h${img.naturalHeight}`)
          setImageError("Photo cannot exceed 5mb")
        } else {
          setImageError("Photo resolution should be at least 70x70")
        }
        
      } else {
        setFileName(file.name)
        setFile(file)
        console.log(` its from formData ${formData.get("photo")}`)
    }}
  }
  

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log(data);
    for (let form in data) {
      formData.append(`${form}`, data[form])
    }
    formData.append("photo", file)

    axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, {headers: {Token: token}})
      .then(response => {
          setIsLoading(false)
          console.log('then has worked')
          showSuccessIcon()
          
          return triggerRefetch()
      }).catch(error =>  {
        setIsLoading(false)
        console.log(`something went wrong. Error: ${error}`)
      })
  }



  useEffect(()=> {
      getPositions()
      getToken()
    }, [])

  
//using Controller to wrapp custom inputs, provided in design
    return (

isLoading ? <Preloader/> : 

<form onSubmit={handleSubmit(onSubmit)} className="form" >
{/* NAME */}
    <Controller
        key={3}
        control={control}
        name="name"
        rules={{required: "Required!", pattern: {value: /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/, message: "Wrong formatr"}}}
        
        render={({field: {name, onChange, onBlur, value}, fieldState: {isTouched, error}})=>(
        <>
          <Input
            name="name"
            placeholder="Your name"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error ? error.message : null}
            isTouched={isTouched}
          />
        </>
        )}
      />

{/*EMAIL*/}
      <Controller
        control={control}
        name="email"
        rules={{required: "Required!", pattern: {value: /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, message: "Wrong formatr"}}}
        render={({ field: {onChange, value, onBlur}, fieldState: {error, isTouched}})=>(

          <Input
            name="email"
            placeholder="Email"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            errorMessage={error ? error.message : null}
            isTouched={isTouched}
          />
 
        )}
      />
{/* PHONE*/}
      <Controller
        control={control}
        name="phone"
        rules={{required: "Required!", pattern: {value: /^(?:\+38)?(?:\(044\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})$/, message: "Wrong formatr"}}}
        render={({ field, fieldState})=>(
          
          <Input
            name="phone"
            placeholder="Phone"
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
            type="tell"
          />
        
        )}
      />

{/*POSITIONS */}
      <div>
        <p>Select your position</p>

      {positions && positions.map(pos => {
        return (
        <label className="form__radio_label" key={pos.id} htmlFor={pos.id}>
          <input  name="position_id" type="radio" value={pos.id} id={pos.id} className="form__radio_input" {...register("position_id", {required: "Please chose position"})} />
          <span className="form__custom_checkbox"></span>
          <span>{pos.name}</span>
        </label>)  
        })
      }
      </div>

{/* PHOTO*/}
      <div className="input_wrapper">
        <div className="form__file_input">
          <label htmlFor="photo" className="form__file_input__button">
            <span>Upload</span>
            <input id="photo" type="file" accept=".jpeg, .jpg" onChange={getImage} />
          </label>
          <span className="form__file_input__file_name" style={fileName ? {color: "black"} : null} >{fileName ? fileName : "Upload image"}</span>
        </div>
        {imageError ? <span className="error_message_input">{imageError}</span> : null}
      </div>
    <div style={{alignSelf: "center"}} className="center-flex">

{/*SUBMIT*/}      
    <Button  type="submit" disabled={isValid && fileName ? false : true } text="Sign up"/>
    </div>
  </form>
  )
}

export default Form