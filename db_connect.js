import pg from 'pg';
const {Pool} =pg;

export const pool=new Pool({
    user:'postgres',
    password:'1819',
    host:'localhost',
    port:5432,
    database:'steam-aTestDB'
});


