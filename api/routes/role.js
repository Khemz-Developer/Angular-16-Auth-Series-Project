import express from "express";
const router = express.Router();
import { createRole, deleteRole, getAllRoles, updateRole } from "../controllers/role.controller.js";


//route for create a new role
router.post("/create",createRole );

//route for Update role in db
router.put('/update/:id',updateRole)

//route for get all roles from db
router.get('/all',getAllRoles)

//delete role from db
router.delete('/delete/:id',deleteRole)

export default router; 
