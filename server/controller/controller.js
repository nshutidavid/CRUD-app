 const Userdb = require("../model/model");

// Create and save new users
 exports.create=(req,res)=>{
   // validate requests
   if(!req.body) {
     res.status(400).send({message: "content can not be empty"})
     return;
   }

   // new user
   const user = new Userdb({
     name:req.body.name,
     email:req.body.email,
     gender:req.body.gender,
     status:req.body.status,

   })
   // save user in the database
   user
     .save(user)
     .then(data => {
       //res.send(data)
       res.redirect("/add-user")
     })
     .catch(err => {
       res.status(500).send({
         message:err.message || "some error occured while creating a create operation"
       });
     });


 }

//Retrieve and return all users/a single user
exports.find=(req,res)=>{

  if(req.query.id){
    const id = req.query.id;
    Userdb.findById(id)
     .then(data => {
       if(!data){
         res.status(404).send({message:"Not found user"})
       } else{
         res.send(data)
       }
     })
     .catch(err=> {
       res.status(500).send({message:`error retrieving user with id ${id}`})
     })

  } else {
    Userdb.find()
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.status(500).send({message:err.message || "Error occured while retrievinf data"})
    })

  }




}

//Update a user by id
exports.update=(req,res)=>{
  // validate requests
  if(!req.body) {
    return res
      .status(400)
      .send({message:"Data to update can not be empty"})
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data => {
      if(!data){
        res.status(404).send({message:`can not update user with ${id}.Maybe user not found!`})
      } else {
        res.send(data)
        
      }
    })
    .catch(err => {
      res.status(500).send({message:"Error Update user information"})
    })

}

//Delete a user by id
exports.delete=(req,res)=>{
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then(data => {
      if(!data){
        res.status(404).send({message:`Cannot Delete user with ${id}. Maybe Id is wrong`})
      } else{
        res.send({
          message:"User was deleted successfully"
        })
      }
    })
    .catch(err => {
      res.status(500).send({message:`Could not delete user with ${id}`});
    });

}
