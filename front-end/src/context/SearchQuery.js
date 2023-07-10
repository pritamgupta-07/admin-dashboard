import {useState} from 'react'

export const useQuery = ()=>{

    const [query, setQuery] = useState('')

    return [query, setQuery]

}