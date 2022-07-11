import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  // console.log('inside middleware',req.body)
  try {
    var bearerToken = req.header('Authorization');
    // console.log(bearerToken);
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const  user    = await jwt.verify(bearerToken, process.env.SECRATEKEY);
  //  console.log(user);
   req.body.UserID = user.email;
    next();
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: data,
      message: `UnAuthorised token`
  });
  }
};


//making the middleware for reset password

export const emailAuth = async (req, res, next) => {
  // console.log('inside middleware',req.body)
  try {
    var emailToken = req.params.token;
    // console.log(emailToken);
    if (!emailToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const  user    = await jwt.verify(emailToken, process.env.ForgetSecretKey);
  //  console.log(user);
   req.body.email = user.email;
    next();
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: data,
      message: `UnAuthorised token`
  });
  }
};



// exports.auth = (req, res, next) => {
   
//   var token1 = req.headers['token'];
//   if (token1) { 
//       jwt.verify(token1, process.env.SECRATEKEY, (err, decoded) => {
//           if (err) {
//               return res.send({
//                   status: false,
//                   message: 'Token is not valid..!'
//               });
//           } else {
//               req.decoded = decoded;
//               next();
//           }
//       });
//   } else {
//       return res.send({
//           status: false,
//           message: 'No token provided!!'
//       });
//   }
// }
