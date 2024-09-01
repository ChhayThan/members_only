#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const sql = `
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    membership_status BOOLEAN,
    admin BOOLEAN
);
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    title VARCHAR(255),
    date TIMESTAMP,
    description TEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES members(id)
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      "postgresql://ericchhour:Chhaythan2308@localhost:5432/members_only",
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
