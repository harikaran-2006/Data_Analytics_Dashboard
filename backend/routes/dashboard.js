const express = require("express");
const router = express.Router();
const db = require("../db");

// ---------------- KPI ----------------

router.get("/", async (req, res) => {

    try {

        const result = await db.query(`
            SELECT
            SUM(amount) AS total_sales,
            COUNT(*) AS total_orders,
            ROUND(AVG(amount),2) AS average_sales
            FROM sales
        `);

        res.json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});


// ---------------- All Sales ----------------

router.get("/sales", async (req, res) => {

    try {

        const result = await db.query(
            "SELECT * FROM sales ORDER BY id"
        );

        res.json(result.rows);

    }

    catch(err){

        console.log(err);

    }

});


// ---------------- Category ----------------

router.get("/category", async(req,res)=>{

try{

const result=await db.query(`

SELECT

category,

SUM(amount) total

FROM sales

GROUP BY category

`);

res.json(result.rows);

}

catch(err){

console.log(err);

}

});


// ---------------- Monthly Sales ----------------

router.get("/monthly",async(req,res)=>{

try{

const result=await db.query(`

SELECT

TO_CHAR(sale_date,'Mon') month,

SUM(amount) total

FROM sales

GROUP BY month,sale_date

ORDER BY sale_date

`);

res.json(result.rows);

}

catch(err){

console.log(err);

}

});

module.exports = router;
