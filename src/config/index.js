'use strict';

const mongoose = require('mongoose');
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASS
const db_name = process.env.MONGO_DB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${user}:${password}@${db_name}.g1xvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
}

module.exports = main()