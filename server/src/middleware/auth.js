const jwt = require('jsonwebtoken');

function verifyToken(req,res,next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
        return res.status(403).send('A token is required');
    
    const cle = process.env.SECRET_KEY;

    jwt.verify(token,cle,(err,data)=>{
        if(err)
            return res.status(401).send('Invalid token !');
        
        req.user=date;
        next();
    });
}
module.exports=verifyToken;