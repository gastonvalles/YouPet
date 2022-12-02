
const { Sequelize } = require("sequelize");
const { User } = require("../db.js");








  const dbCreateUser = async (body) => {
    try {
      const {  name, lastname, username, password, confirmationpass, email, address, dni,isAdmin, isActive } = body;
      console.log( name, lastname, username, password, confirmationpass, email, address, dni,isAdmin, isActive );
      
      if (!name &&!lastname &&!username &&!password &&!confirmationpass &&!email &&!address &&!dni &&!isAdmin &&!isActive) {
        throw new Error("missing query");
      } 
      else if(password !== confirmationpass){
        
        return "the password and its confirmation do not match"

      }
      else {
        await User.create(body);
        return "User created successfully";
      }
    } catch (error) {
      throw error;
    }
  };




  module.exports = {
    dbCreateUser,
    
  };