import { useState } from 'react'

export const useSidebar = () => {
    const [toggleSidebar, setToggleSidebar] = useState(false)
    
  return [toggleSidebar, setToggleSidebar]
}


