import Router, { Request, Response } from "express";
import mongoose from 'mongoose'

import  ActiveController  from "./controllers/ActiveController";
import  BranchController  from "./controllers/BranchController";
import  CompanyController from "./controllers/CompanyController";
import  UserController    from "./controllers/UserController";

import multer from 'multer'

const router = Router()
const conn = mongoose.connection;

conn.once("open",()=>{
})

router.get('/active', ActiveController.index)
router.post('/active', ActiveController.create)
router.delete('/active/:id', ActiveController.delete)
router.put('/active/:id', ActiveController.update)

router.get('/branch', BranchController.index)
router.post('/branch', BranchController.create)
router.delete('/branch/:id', BranchController.delete)
router.put('/branch/:id', BranchController.update)

router.get('/company', CompanyController.index)
router.post('/company', CompanyController.create)
router.delete('/company/:id', CompanyController.delete)
router.put('/company/:id', CompanyController.update)

router.get('/users', UserController.index)
router.post('/user', UserController.create)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update)



export default router