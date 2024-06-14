import { createContext, useState } from 'react';

export const FetchContext = createContext();

//this context triggering refetch on new user register
//shouldRefetch is a base url and beingh passed to getUser useLayoutEffect func as a param
//and has own clean up func
 function FetchProvider ({ children }) {
  const [shouldRefetch, setShouldRefetch] = useState('');

  const triggerRefetch = () => {
    setShouldRefetch("https://frontend-test-assignment-api.abz.agency/api/v1/users?count=6")
  }

  const cleanUpRefetch = () => {
    setShouldRefetch('')
  }

  return (
    <FetchContext.Provider value={{ shouldRefetch, triggerRefetch, cleanUpRefetch}}>
      {children}
    </FetchContext.Provider>
  );
};

export default FetchProvider