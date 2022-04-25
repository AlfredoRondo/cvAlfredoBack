const jwt = require('jwt-simple');
const moment = require('moment');
//Función que comprueba si en las cabeceras de las peticiones del servidor viene el token incorporado
exports.checkToken =(req,res,next)=>{
    //comprobar interior de cabecera
    if(!req.headers['access-token']){//si la cabecera es access-token
        return res.status(403).json({error: 'Debes incluir la cabecera acces-token'});//como respuesta cambiamos el estado
    }

    //variable token 
    const token = req.headers['access-token'];
    let payload = null;

    try{     
        payload = jwt.decode(token, process.env.SECRET_KEY);//llamar al payload y hacer la decodificación del token que está llegando como segundo parámetro le paso la clave secreta
    }catch{
        return res.status(403).json({error: 'El token es incorrecto'});
    }

    //En el token ya tendremos la fecha de expiración ahora comprobamos si la fecha es válida
    if(payload.expiredAt < moment().unix()){//fecha del momento en formato unix
         return res.status(403).json({error: 'El token ha expirado'});
    }

    if(payload.usuario !== 'Alfredo'){
        return res.status(403).json({erro: 'Usuario no encontrado'});
    }
    //Nos aseguramos que tenemos e payload guardando el payload en una variable
    req.payload = payload;

    next();
}
//Comprobarel usuario con acceso y fecha de expiración 