const mongoist = require('mongoist');
const db = mongoist(process.env.MONGODB_CNN)

console.log(db);

module.exports.test = async () => {
        let results = await db.documents.insertMany([ {a : 1}, {a : 2}, {a : 3}]);
        console.log(results);
}
