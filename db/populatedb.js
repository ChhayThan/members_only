#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    username VARCHAR(255)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
    //   ssl: {
    //     rejectUnauthorized: false, // This allows self-signed certificates. Set to true for strict SSL.
    //   },
  });

  await client.connect();
  await client.query(sql);
  await client.end();
  console.log("Done");
}

main();
