import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetUser = (loginData) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

  useEffect(()=>{
    setLoading(true)
    
    axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents:runQuery',
            {
                structuredQuery: {
                    from: [{ collectionId: 'users' }],
                    where: {
                        fieldFilter: {
                            field: {
                                fieldPath: 'email'
                            },
                            op: 'EQUAL',
                            value: { stringValue: loginData.email }
                        }
                    }
                }
            }
        ).then((response) => {
            setData(response.data[0].document)
        }).catch((err) => {
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
  }, [])

  return {data, loading, error}
};

export default useGetUser;
