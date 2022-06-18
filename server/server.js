import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

import mysql from "mysql";

const PORT = process.env.PORT || 5000;
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

db.connect((err) => {
    // if (err) console.log(err);
    console.log("Connected to MySQL database");
});

// db.query("USE WorkSpace");
db.query(
    "CREATE TABLE IF NOT EXISTS employees(s_no INT UNIQUE,name VARCHAR(32) NOT NULL,id VARCHAR(32) PRIMARY KEY ,email VARCHAR(42));"
);

const app = express();
app.listen(PORT, () => {
    console.clear();
    console.log("Port running on port:5000");
});
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(
        "Backend for CRUD App with React js, Express js and Mysql running over Node js !!"
    );
});

app.get("/home", (req, res) => {
    res.json({ message: "Working" });
});

// Sending the data for the home page
app.get("/api", (req, res) => {
    const sql = "SELECT * FROM employees ORDER BY s_no";

    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json({ sqlData: results });
    });
});

// getting a single user
app.get("/api/:Name", (req, res) => {
    const name = req.params.Name;
    const sql = `SELECT * FROM employees WHERE Name like "%${name}%"`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ sqlData: result });
    });
});

// function to create ids based on random numbers
function generateString() {
    let result = "";
    const charactersLength = CHARACTERS.length;
    for (let i = 0; i < 7; i++) {
        result += CHARACTERS.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

// creating a new record
app.post("/add", (req, res) => {
    const body = req.body;
    db.query("SELECT s_no FROM employees", (err1, result) => {
        if (err1) {
            res.sendStatus(500);
            throw err1;
        }
        let sno;
        if (result.length === 0) {
            sno = 1;
        } else {
            sno = result[result.length - 1]["s_no"];
            sno += 1;
        }
        const randomId = generateString();
        const query = `INSERT INTO employees VALUES(${sno},"${body.name}","${randomId}","${body.email}")`;
        db.query(query, (err2, queryRes) => {
            if (err2) {
                res.status(500);
                throw err2;
            } else {
                res.status(201);
            }
        });
    });
});

// updating a records
app.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updateBody = req.body;
    // now updateBody might have both empty or either one empty which means don't update this data
    // so we set the query accordingly
    let newName = updateBody["newName"];
    let newEmail = updateBody["newEmail"];

    let updateQuery = "UPDATE employees SET ";

    if (!newName && !newEmail) {
        res.sendStatus(304);
    } else if (!newName) {
        updateQuery += `email="${newEmail}" `;
    } else if (!newEmail) {
        updateQuery += `name="${newName}" `;
    } else {
        updateQuery += `name="${newName}", email="${newEmail}" `;
    }
    updateQuery += `WHERE id="${id}";`;
    console.log(updateQuery);
    db.query(updateQuery, (err, result) => {
        if (err) {
            res.status(500);
        } else {
            res.status(204);
        }
    });
});

// deleting a record
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM employees WHERE id = "${id}";`;
    db.query(query, (err, result) => {
        if (err) {
            res.status(500);
        } else {
            res.status(204);
        }
    });
});
