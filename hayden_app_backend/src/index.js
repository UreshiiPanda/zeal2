// Step 1. Import the 'mysql' and 'dotenv' packages.
import { createConnection, createPool, format } from "mysql";
import dotenv from "dotenv";
import * as fs from "fs";
import * as util from "util";

dotenv.config();

/**
 * 🔌 Step 3 (Option 1). Establish a connection to TiDB cluster with connection URL.
 *
 * @returns {Promise<Connection>}
 */
export async function connectWithURL() {
    try {
        const url = process.env.DATABASE_URL || 'mysql://root@localhost:4000/test';
        return createConnection(url);
    } catch (err) {
        throw new Error(`Failed to connect to TiDB cluster: ${err.message}`);
    }
}

/**
 * 🔌 Step 3 (Option 2). Establish a connection to TiDB cluster with connection options.
 *
 * @returns {Promise<Connection>}
 */
export async function connectWithOptions() {
    try {
        const options = {
            host: process.env.TIDB_HOST || '127.0.0.1',
            port: process.env.TIDB_PORT || 4000,
            user: process.env.TIDB_USER || 'root',
            password: process.env.TIDB_PASSWORD || '',
            database: process.env.TIDB_DATABASE || 'test',
            ssl: process.env.TIDB_ENABLE_SSL === 'true' ? {
                minVersion: 'TLSv1.2',
                ca: process.env.TIDB_CA_PATH ? fs.readFileSync(process.env.TIDB_CA_PATH) : undefined
            } : null,
        }
        return createConnection(options);
    } catch (err) {
        throw new Error(`Failed to connect to TiDB cluster: ${err.message}`);
    }
}