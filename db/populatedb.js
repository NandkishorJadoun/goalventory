#! /usr/bin/env node

const { Client } = require("pg");
const { argv } = require("node:process");
const dbUrl = argv[2];
console.log(typeof dbUrl, dbUrl)

const SQL = `
CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    position_name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS leagues (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    league_name VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    player_name VARCHAR ( 255 ),
    position_id INTEGER REFERENCES positions(id),
    league_id INTEGER REFERENCES leagues(id)
);

INSERT INTO positions (position_name)
VALUES 
    ('Forward'),
    ('Midfielder'),
    ('Defender'),
    ('Goal keeper');

INSERT INTO leagues (league_name)
VALUES
    ('Premier League'),
    ('La Liga'),
    ('Serie A'),
    ('Bundesliga'),
    ('Ligue 1');

INSERT INTO players (player_name, position_id, league_id)
VALUES 
    ('Erling Haaland', 1, 1),
    ('Kylian Mbappe', 1, 2),
    ('Kevin De Bruyne', 2, 3),
    ('Cole Palmer', 2 ,1),
    ('Virgil van Dijk', 3, 1),
    ('Kyle Walker', 3, 1),
    ('Gianluigi Donnarumma', 4, 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
