const User = require('../db');

const findByUserName = async (name)=>{
    if (name){
        let user =await User.findOne({
            where:{
                name
            },
        });
        if (!user) {
            throw new Error("User not found");
          }
          return user;
        } else {
          throw new Error("User not found");
        }
      };
    
    



// const getUserByEmail = async (email) => {
//     if (email) {
//       let user = await User.findOne({
//         where: {
//           email,
//         },
//       });
//       if (!user) {
//         throw new Error("User not found");
//       }
//       return user;
//     } else {
//       throw new Error("User not found");
//     }
//   };
module.exports={
    findByUserName

}