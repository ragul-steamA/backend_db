import { pool } from "./db_connect.js";
import { validator } from "./validator.js";
let map = { name: "", age: "" };

let credentials = {
  user: "ragul",
  pass: "1234",
};

//read function for get API
export const read = (req, res) => {
  try {
    console.log(map);
    res.status(200).json(map);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//update function for put API
export const update = (req, res) => {
  try {
    const { name, age } = req.body;
    map.name = name;
    map.age = age;
    console.log(map);
    res.status(200).json({ msg: "updated successfully" });
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//create function for post API
export const create = (req, res) => {
  try {
    const { name, age } = req.body;
    let newMap = { name, age };
    console.log(newMap);
    res.status(200).json(newMap);
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

//erase function for delete API
export const erase = (req, res) => {
  try {
    map.name = "";
    map.age = "";
    console.log(map);
    res.status(200).json({ msg: "deleted successfully" });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//auth function for middleware
export const auth = (req, res, next) => {
  try {
    if (
      req.body.user == credentials.user &&
      req.body.pass == credentials.pass
    ) {
      next();
    } else {
      res.status(401).json({ msg: "Access Denied" });
    }
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

//function for creating table
export const createTable = async (req, res) => {
  try {
    let tableQuery =
      "CREATE TABLE thalaivar(id INTEGER, name VARCHAR(50), city VARCHAR(30), PRIMARY KEY(id))";
    const result = await pool.query(tableQuery);
    console.log("result", result);
    if (result) {
      res.status(201).json({
        error: false,
        msg: "table created successfully",
        data: result,
        code: 201,
      });
    } else {
      res.status(500).json({
        error: true,
        errorMsg: "table not created successfully",
        code: 500,
      });
    }
  } catch (e) {
    res.status(500).json({ err: e.message });
  }
};

export const insertTable = async (req, res) => {
  try {
    const insertQuery =
      "INSERT INTO thalaivar VALUES(2, 'Anjana', 'coimbatore'),(3,'Periyanayaki','Dharapuram'),(4,'Raagull Sakthivel','CBE'),(5,'Ragul','karur')";
    const result = await pool.query(insertQuery);
    console.log("result", result);
    if (result) {
      res.status(200).json({
        code: 200,
        error: false,
        data: result,
        msg: "data is inserted",
      });
    } else {
      res.status(500).json({
        error: true,
        errorMsg: "data is not inserted successfully",
        code: 500,
      });
    }
  } catch (e) {
    res.status(500).json({ code: 500, error: true, err: e.message });
  }
};

export const selectId = async (req, res) => {
  try {
    const getID = req.params.id;
    const selectedID = `SELECT * FROM thalaivar WHERE id=${getID}`;
    const result = await pool.query(selectedID);
    console.log("result", result);
    if (result.rows.length != 0) {
      res.status(200).json({
        code: 200,
        error: false,
        data: result.rows,
        msg: "data found",
      });
    } else {
      res.status(404).json({
        error: true,
        errorMsg: "data not found",
        code: 404,
      });
    }
  } catch (e) {
    res.status(500).json({ code: 500, error: true, err: e.message });
  }
};

export const deleteId = async (req, res) => {
  try {
    const deleteQuery = `DELETE  from  thalaivar where id=${req.params.id}`;
    const result = await pool.query(deleteQuery);
    if (result) {
      res.status(200).json({
        code: 200,
        error: false,
        message: "Deleted Successfully",
        data: result,
      });
    }
  } catch (e) {
    res.status(500).json({ error: true, code: 500, errorMsg: e.message });
  }
};

//function for inserting user data

export const insertUser = async (req, res) => {
  try {
    const { data, success, code, message } = validator(req.body);
    if (!success) {
      return res.status(code).json({ error: true, errorMsg: message, code });
    }
    // const values = [data.id, data.name, data.city];
    // const insertQuery = `INSERT INTO thalaivar (id,name,city) VALUES ($1, $2, $3) RETURNING *`;
    // const result = await pool.query(insertQuery, values);
    // if (result) {
    //   res.status(201).json({
    //     error: false,
    //     message: "Insert Successfully",
    //     data: result,
    //     code: 201,
    //   });
    // } else {
    //   res.status(500).json({ error: true, errorMsg: e.message, code: 500 });
    // }
  } catch (e) {
    res.status(500).json({ error: true, errorMsg: e.message, code: 500 });
  }
};

export const readId = async (req, res) => {
  try {
    const ids = [req.params.id];
    const selectQuery = "SELECT * FROM thalaivar WHERE ID=$1";
    const result = await pool.query(selectQuery, ids);
    if (result) {
      res.status(200).json({
        error: false,
        message: "selected",
        data: result.rows,
        code: 201,
      });
    } else {
      res
        .status(500)
        .json({ error: true, errorMsg: " Not selected", code: 500 });
    }
  } catch (e) {
    res.status(500).json({ error: true, errorMsg: e.message, code: 500 });
  }
};



