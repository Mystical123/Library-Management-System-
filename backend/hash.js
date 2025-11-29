const bcrypt = require("bcrypt");

async function run() 
{
  const password = "admin123"; // choose your password
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);
}

run();
