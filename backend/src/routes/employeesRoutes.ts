import { Router } from "express";
import { GetEmployees, AddEmployee, EditEmployee, DeleteEmployee } from "../controllers/employeesController";

const router = Router();
router.get('/', GetEmployees);
router.post('/', AddEmployee);
router.put('/', EditEmployee);
router.delete('/:id', DeleteEmployee)

export default router;
