import { db } from "./server.js";
db.query(`
    CREATE TABLE IF NOT EXISTS taskList (
  id SERIAL PRIMARY KEY,
  complete boolean,
  category text,
  task text,
  priority text, 
  complete_by date
)
    `);
db.query(`INSERT INTO tasklist (complete, category, task , priority, complete_by)
    VALUES  
    (FALSE, 'personal', 'Walk my dog', 'high', '2024-11-11'),
    (FALSE, 'personal', 'drink some water', 'medium', '2024-11-11'),
    (FALSE, 'personal', 'buy some milk', 'high', '2024-11-11'),
    (FALSE, 'personal', 'buy some bread', 'medium', '2024-11-11')
`);
