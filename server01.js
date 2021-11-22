const Datastore = require('nedb');

const collection = new Datastore({
    filename: 'collection.db',
    autoload: true
});

// console.log("PRZED FOR: " + new Date().getMilliseconds())
// for (var i = 0; i < 3; i++) {
//     var doc = {
//         a: "a"+i,
//         b: "b"+i
//     };
//     collection.insert(doc, function (err, newDoc) {
//         console.log("id dokumentu: " + newDoc._id, "DODANO: " + new Date().getMilliseconds())
//     });
// }
// console.log("PO FOR: " + new Date().getMilliseconds())

// collection.findOne({ _id: 'bJAekUMNq73ADKKd' }, function (err, doc) {
//     console.log("----- obiekt pobrany z bazy: ",doc)
//     console.log("----- formatowanie obiektu js na format JSON: ")
//     console.log(JSON.stringify(doc, null, 5))
// });

// collection.find({ }, function (err, docs) {
//     //zwracam dane w postaci JSON
//     console.log("----- tablica obiektów pobrana z bazy: \n")
//     console.log(docs)
//     console.log("----- sformatowany z wcięciami obiekt JSON: \n")
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// collection.find({ a: "a1" }, function (err, docs) {
//     console.log(JSON.stringify({ "docsy": docs }, null, 5))
// });

// collection.count({}, function (err, count) {
//     console.log("dokumentów jest: ",count)
// });

// collection.count({ a: "a1" }, function (err, count) {
//     console.log("dokumentów jest: ",count)
// });

// collection.remove({ a:"a2" }, {}, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ",numRemoved)
// });

// collection.remove({ a:"a1" }, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto dokumentów: ",numRemoved)
// });

// collection.remove({}, { multi: true }, function (err, numRemoved) {
//     console.log("usunięto wszystkie dokumenty: ",numRemoved)
// });