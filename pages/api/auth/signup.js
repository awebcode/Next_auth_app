
import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema'
import { hash } from 'bcryptjs';

export default async function handler(req, res){
    connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

    // only post method is accepted
    if(req.method === 'POST'){
       try {
         let newUser;
         if (!req.body)
           return res.status(404).json({ error: "Don't have form data...!" });
         const { username, email, password } = req.body;

         // check duplicate users
         const checkexisting = await Users.findOne({ email });
         // if(checkexisting) return res.status(422).json({ message: "User Already Exists...!"});
         if (checkexisting) {
           newUser = await Users.updateOne(
             {
               email: email,
             },
             {
               $set: {
                 email: email,
                 username,
                 email,
                 password,
               },
             }
           );
         } else {
           newUser = await Users.create(
             { username, email, password: await hash(password, 12) }
            
           );
         }
         // hash password
        return res.status(201).json({ status: true, user: newUser });
       } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
       }

    } else{
       res.status(500).json({ message: "HTTP method not valid only POST Accepted"})
    }

}
