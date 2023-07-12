// Importing the Pool object from the 'pg' module
const { Pool } = require('pg');

// Creating a new Pool instance with the database connection configuration
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// SQL query string for selecting student information based on cohort name
const queryString = `
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;`;
// Building the values array for parameterized query
// $1: Pattern for LIKE query, $2: Limit for the number of results
const values = [`%${process.argv[2]}%`, process.argv[3] || 2];

// Executing the query using the pool
pool.query(queryString, values)
.then(res => {
// Looping through the query result rows and logging the information
  res.rows.forEach(row => {
    console.log(`${row.name} has an id of ${row.student_id} and was in the ${row.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));