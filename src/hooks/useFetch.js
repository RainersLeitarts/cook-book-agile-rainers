import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (url, refresh, arrayOfObjects) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (arrayOfObjects != undefined) {
      setLoading(true)
      axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents:runQuery',
        {
          structuredQuery: {
            from: [{ collectionId: 'recipes' }],
            where: {
              fieldFilter: {
                field: {
                  fieldPath: 'search'
                },
                op: 'ARRAY_CONTAINS_ANY',
                value: { arrayValue: { values: [arrayOfObjects] } }
              }
            }
          }
        }
      ).then((response) => {
        setData(response.data)
      }).catch((err) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
    } else {
      setLoading(true)
      axios.get(url).then((response) => {
        setData(response.data)
      }).catch((err) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
    }
  }, [url, refresh])

  return { data, loading, error }
};

export default useFetch;
