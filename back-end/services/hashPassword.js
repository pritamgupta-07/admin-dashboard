import bcrypt from 'bcrypt'

export const generateHashedPassword = async(password)=>{
    try{
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        return hashedPassword
    }catch(error){
        console.log(error)
    }
}

export const comparePassword = async (password, hashedPassword)=>{
    try{
        const result = await bcrypt.compare(password, hashedPassword)

        if(result){
            return true
        }else{
            return false
        }
    }catch(error){
        console.log(error)
    }
}