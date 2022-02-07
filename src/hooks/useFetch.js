import axios from 'axios';
import { useEffect, useState } from 'react';
import { db } from '../firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore'

const useFetch = (id) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const recipesCollectionRef = collection(db, 'recipes')

  useEffect(() => {

    if (id != undefined) {

      const q = query(recipesCollectionRef, where('__name__', "==", id));

      setLoading(true)
      getDocs(q).then((response) => {
        setData(response.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      }).catch((err) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
    } else {


      setLoading(true)
      getDocs(recipesCollectionRef).then((response) => {
        setData(response.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      }).catch((err) => {
        setError(err)
      }).finally(() => {
        setLoading(false)
      })
    }

  }, [id])


  return { data, loading, error }
};

export default useFetch;
