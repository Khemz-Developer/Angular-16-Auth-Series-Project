
import Role from "../models/Role.js";

//create a new role in db
const createRole = async (req, res, next) => {
  try {
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);
      await newRole.save();
      return res.status(201).send("Role Created");
    } else {
      return res.status(400).send("Role is required");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//update role in db
const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findById({ _id: req.params.id });
    if (role) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).send("Role Updated");
    } else {
      return res.status(404).send("Internal Server Error !");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};


//get all roles from db
const getAllRoles = async (req,res,next)=>{
    try{
        const roles = await Role.find();
        if(roles){
            return res.status(200).send(roles);
        }else{
            return res.status(404).send("No Role Found !");
        }
    }catch(error){
        return res.status(500).send(error.message);
    }
}

//delete role from db
const deleteRole = async (req,res,next)=>{
    try{
        const role = await Role.findById(req.params.id);
        if(role){
            const deletedRole = await Role.findByIdAndDelete(req.params.id);
            return res.status(200).send("Role Deleted !");
        }else{
            return res.status(404).send("Role not found !");
        }
    }catch(error){
        return res.status(500).send(error.message);
    }
}




export { createRole, updateRole, getAllRoles, deleteRole};