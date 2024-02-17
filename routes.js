import express from "express";
import { create, erase, read, update, auth ,createTable,insertTable,selectId,deleteId,insertUser,readId} from "./controller.js";

export const router = express.Router();

//read endpoint
router.get("/read", auth, read);

//update endpoint
router.put("/update", auth, update);

//create endpoint
router.post("/create", auth, create);

//delete endpoint
router.delete("/delete", auth, erase);

//create table
router.post('/createtable',createTable);

//insert table
router.put('/inserttable',insertTable);

//findid
router.get('/selectId/:id', selectId);

//delete 
router.delete('/delete/:id',deleteId);

//insert from request
router.post('/insertUser',insertUser);

//read with ID
router.get('/readId/:id',readId);
