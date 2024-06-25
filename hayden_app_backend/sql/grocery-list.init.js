import * as fs from 'fs';
import * as util from 'util';
import dotenv from 'dotenv';
import { connectWithOptions, connectWithURL } from '../src/index.js';

dotenv.config();

const conn = process.env.DATABASE_URL ? await connectWithURL() : await connectWithOptions();

const content = fs.readFileSync('sql/grocery-list.init.sql', 'utf-8');
const sqls = content.split(';');
const query = util.promisify(conn.query).bind(conn);

for (const sql of sqls) {
    if (sql.trim() === '') {
        continue;
    }
    
    console.log(sql);
    await query(sql);
}

conn.end();