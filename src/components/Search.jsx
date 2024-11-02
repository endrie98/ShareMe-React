import React, { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';


const Search = ({ search }) => {

  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(search !== '') {

      setLoading(true)
      const query = searchQuery(search.toLowerCase())

      client.fetch(query).then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [search])

  return (
    <div>
      {loading && <Spinner message='Searching for pins...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && search !== '' && !loading && (
        <div className='mt-10 text-center text-xl'>
          No pins found!
        </div>
      )}
    </div>
  )
}

export default Search
