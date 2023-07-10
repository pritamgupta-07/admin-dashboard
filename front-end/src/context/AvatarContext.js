import { useState } from "react";

export const useAvatar = ()=>{
    const [avatarData, setAvatarData] = useState({
        url:'',
        publicId:''
    })

    return [avatarData, setAvatarData]
} 