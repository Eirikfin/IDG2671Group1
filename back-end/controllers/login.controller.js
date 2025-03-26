import Researcher from "../models/researchers.model.js";
import { comparePassword } from "../middleware/passwordhandling.js";

export const logIn = async (req, res) => {
   try{
        const username = req.body.email; //provided email address
        const password = req.body.password; //provided password
        const foundUser = await Researcher.findOne({email: username }); //find object with right email in database
        if(!foundUser){ //if no user was found
           return res.status(404).json({message: "No researcher with provided email was found"}) 
        }
        if(await comparePassword(password, foundUser.password)){ //compare password-input with password in database
            //TO DO: add authentication so user can do crud actions/ access to front end.
            return res.status(200).json({message: "Log in was successful"}) 
        }else{
            return res.status(400).json({message: "Wrong password."})
        }
    }catch(err){
        return res.status(500).json({ message: "Server error", error: err.message});
    }
}