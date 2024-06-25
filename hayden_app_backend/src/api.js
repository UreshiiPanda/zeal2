import express from 'express'
import { connectWithURL, connectWithOptions } from './index.js';
import { format } from 'mysql';
import * as util from "util";

const app = express();
const port = 4000;
const conn = process.env.DATABASE_URL ? await connectWithURL() : await connectWithOptions();

app.listen(port, () => console.log(`Server ready on port ${port}.`));

app.get("/", (req, res) => {
    res.status(200).send("Hello World!");
})

const tidb_query = util.promisify(conn.query).bind(conn);

// GROCERY LIST API

app.get("/grocery-list-all", async (req, res) => {
    const sql = `SELECT * FROM groceries`;
    const params = [];
    tidb_query(sql, params)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(300).send({error: err}));
})

app.get("/grocery-list", async (req, res) => {
    const user_id = req.query.user_id;
    if (user_id === undefined) {
        return res.status(400).send({ error: "specify user_id in parameters" });
    }

    const sql = `
        SELECT 
            grocery,
            quantity,
            units,
            tags,
            posted,
            pickup,
            assigned,
            completed
        FROM
            groceries
        WHERE
            user_id = ?
    `;
    const params = [user_id];

    tidb_query(sql, params)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send({ error: err }));
});

app.post("/grocery-list", async (req, res) => {
    const user_id = req.headers['user_id'];
    const grocery = req.headers['grocery'];
    const quantity = req.headers['quantity'];
    const units = req.headers['units'];
    const tags = req.headers['tags'];
    const posted = req.headers['posted'];
    const pickup = req.headers['pickup'];
    const assigned = req.headers['assigned'];
    const completed = req.headers['completed'];

    if (user_id === undefined || grocery === undefined || quantity === undefined || units === undefined || tags === undefined || posted === undefined || pickup === undefined || assigned === undefined || completed === undefined)
        res.status(400).send({ error: "specify user_id, grocery, quantity, units, tags, posted, pickup, assigned, and completed in the headers" })

    const sql = `
        INSERT INTO groceries (
            user_id,
            grocery,
            quantity,
            units,
            tags,
            posted,
            pickup,
            assigned,
            completed
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `;
    const params = [user_id, grocery, quantity, units, tags, posted, pickup, assigned, completed];

    tidb_query(sql, params)
        .then(_ => res.status(200).send("success"))
        .catch(err => res.status(400).send({ error: err }));
});

app.put("/grocery-list", async (req, res) => {
    const user_id = req.headers['user_id'];
    const grocery = req.headers['grocery'];
    const quantity = req.headers['quantity'];
    const units = req.headers['units'];
    const tags = req.headers['tags'];
    const posted = req.headers['posted'];
    const pickup = req.headers['pickup'];
    const assigned = req.headers['assigned'];
    const completed = req.headers['completed'];

    if (user_id === undefined || grocery === undefined || quantity === undefined || units === undefined || tags === undefined || posted === undefined || pickup === undefined || assigned === undefined || completed === undefined)
        res.status(400).send({ error: "specify user_id, grocery, quantity, units, tags, posted, pickup, assigned, and completed in the headers" })

    const sql = `
        UPDATE groceries
        SET
            grocery = ?,
            quantity = ?,
            units = ?,
            tags = ?,
            pickup = ?,
            assigned = ?,
            completed = ?
        WHERE
            user_id = ? AND
            posted = ?
    `;
    const params = [grocery, quantity, units, tags, pickup, assigned, completed, user_id, posted];

    tidb_query(sql, params)
        .then(_ => res.status(200).send("success"))
        .catch(err => res.status(400).send({ error: err }));
});

app.delete("/grocery-list", async (req, res) => {
    const user_id = req.headers['user_id'];
    const posted = req.headers['posted'];

    if (user_id === undefined || posted === undefined)
        res.status(400).send({ error: "specify user_id and posted in the headers" });

    const sql = `
        DELETE FROM
            groceries
        WHERE
            user_id = ? AND
            posted = ?
    `;
    const params = [user_id, posted];

    tidb_query(sql, params)
        .then(_ => res.status(200).send("success"))
        .catch(err => res.status(400).send({ error: err }));
});



// ROCK PAPER SCISSORS API

// app.get("/rock-paper-scissors", async (req, res) => {
//     const sql = `
//         SELECT
//             progress
//         FROM
//             rps
//         WHERE
//             username = ?
//     `;

//     await tidb_query(conn, sql, []);
// });

// app.post("/rock-paper-scissors", async (req, res) => {
//     const username = req.headers['username'];
//     const progress = req.headers['progress'];

//     if (username === undefined || progress === undefined)
//         res.status(400).send({ error: "specify username and progress in the headers" });

//     const sql = `
//         INSERT INTO rps (
//             username,
//             progress
//         )
//         VALUES (
//             ?,
//             ?
//         )
//     `;

//     await tidb_query(conn, sql, [username, progress]);
// });

// app.put("/rock-paper-scissors", async (req, res) => {
//     const username = req.headers['username'];
//     const progress = req.headers['progress'];

//     if (username === undefined || progress === undefined)
//         res.status(400).send({ error: "specify username and progress in the headers" });

//     const sql = `
//         UPDATE rps 
//         SET (
//             progress = ?
//         )
//         WHERE 
//             username = ?
//     `;

//     await tidb_query(conn, sql, [username, progress]);
// })