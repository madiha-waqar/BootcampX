// Importing the Pool object from the 'pg' module
const { Pool } = require('pg');

// Creating a new Pool instance with the database connection configuration
const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// SQL query string for selecting teachers who assisted the cohort
const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;`;
// Building array to store malicious code
// $1: Pattern for LIKE query
const values = [`%${process.argv[2]}%`];

// Executing the parameterized query using the Pool
pool.query(queryString, values)
.then(res => {
  // Looping through the query result rows and logging the information
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.error('query error', err.stack));
