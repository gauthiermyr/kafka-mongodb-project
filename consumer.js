const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

async function main(){
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    const db = await client.db("iss");

    try {
        const data = await db.collection('position').find({}).toArray();
        console.log('All:', data, data.length);

        const req1 = await db.collection('position').find({}).sort({timestamp:-1}).toArray();
        console.log('All datas (sorted by timestamp in descending order):', req1, req1.length);

        const req2 = await db.collection('position').find({latitude:{$regex:'^48'}}).toArray();
        console.log('Datas where the latitude starts by 48:', req2, req2.length);

        //print a data by knowing the latitude
        const req3 = await db.collection('position').find({latitude: {$eq:49.148174989081}}).toArray();
        console.log('Datas where the latitude is equal to an already known latitude:):', req3, req3.length);

        //print a data by knowing his exact coordinates.
        const req4 = await db.collection('position').find({$and:[ {latitude: {$eq:49.148174989081}} , {longitude: {$eq:34.672614962578}} ]}).toArray();
        console.log('Datas for precisely asked coordinates:):', req4, req4.length);

        //print all datas where latitude > longitude
        //const req5 = await db.collection('position').find({latitude: {$gt:db.collection('position').find({})}}).toArray();

        //print all data where latitude is superior to a defined latitude.
        const req5 = await db.collection('position').find({latitude: {$gt:50}}).toArray();
        console.log('Datas where the latitude is superior to something:):', req5, req5.length);

    }
    catch(err){
        console.log(err);
    }
    finally {
        await client.close();
    }

}

main();
