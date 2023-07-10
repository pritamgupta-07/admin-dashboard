function handleUserAccess(req,res,next)
{
    if (req.params.access === 'admin'){
        next()
    }
    else{
        res.status(401).send({msg:'access denied'})
    }
}


export {handleUserAccess}