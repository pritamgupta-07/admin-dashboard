import contactModel from "../models/contactsModel.js";


async function handleGetContacts(req,res){
    try {
        const result = await contactModel.find()
        res.status(200).send(result)      
    } catch (error) {
        res.status(500).send({error:'something wrong'})
        console.log(error)
    }
}

export default handleGetContacts