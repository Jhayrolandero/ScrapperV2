import mysql from 'mysql2/promise';

async function Connection() {

    try {

    const pool = await mysql.createPool({
        host                    : 'localhost',
        user                    : 'root',
        password                : '',
        database                : "expressDB",
        waitForConnections      : true,
        connectionLimit         : 10,
        maxIdle                 : 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout             : 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit              : 0,
        enableKeepAlive         : true,
        keepAliveInitialDelay   : 0,
    })
    console.log("Connected to MySQL")
    return pool
    } catch(err) {
        throw err
    }
} 


export default Connection
