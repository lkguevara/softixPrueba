import {useState, useEffect} from 'react'

const useFetch = (url, token) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(token)
          })
          .then(response => response.json())
          .then(data => setAuth(data))
        }
        , [])
        
    return {auth}
}

export default useFetch