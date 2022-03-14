import axios from 'axios';
import { useCallback, useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = useCallback(async (requestConfig, callback = ()=>{}) => {
    setLoading(false)
    setError(null)
    let header = ''

    //if user not logged in dont use auth in header
    if(JSON.parse(localStorage.getItem('loginData')) != undefined) {
      header = {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('loginData')).idToken
      }
    }

    try {
      setLoading(true)

      const response = await axios(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'get',
        data: requestConfig.data ? requestConfig.data : null,
        headers: header
      })

      const data = await response.data
      callback(data)

    } catch (e) {
      setError(e)
      console.log(e)
    }
    setLoading(false)
  }, [])

  return { loading, error, sendRequest }
};

export default useFetch;








//old
// useEffect(() => {
  //   setLoading(true)
  //   axios.get(url).then((response) => {
  //     setData(response.data)
  //   }).catch((err) => {
  //     setError(err)
  //   }).finally(() => {
  //     setLoading(false)
  //   })
  // }, [url])
