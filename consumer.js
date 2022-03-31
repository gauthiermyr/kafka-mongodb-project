const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

async function main(){
    const client = await MongoClient.connect(url, { useNewUrlParser: true }).catch(err => { console.log(err); });
    const db = await client.db("iss");

    try {
        //print all entries
        const data = await db.collection('position').find({}).toArray();
        console.log('All:', data, data.length);

        //print all entries starting by oldest datas
        const req1 = await db.collection('position').find({}).sort({timestamp:-1}).toArray();
        console.log('All datas (sorted by timestamp in descending order):', req1, req1.length);
        //get last position + country

        //iss speed avg

    }
    catch(err){
        console.log(err);
    }
    finally {
        await client.close();
    }

}

main();
