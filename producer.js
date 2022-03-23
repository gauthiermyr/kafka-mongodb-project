const axios = require('axios').default;
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'test',
  brokers: ['localhost:9092']
})

const producer = kafka.producer({
    allowAutoTopicCreation: true,
    transactionTimeout: 30000
})

async function getData() {
    await producer.connect();

    const { data } = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');

    await producer.send({
        topic: 'iss-final',
        messages: [
            { 
                key: 'position', 
                value: `${JSON.stringify(
                    {
                        timestamp: data.timestamp,
                        altitude: data.altitude,
                        latitude: data.latitude,
                        longitude: data.longitude
                    }
                        
                )}`
                , partition: 0
            },
        ],
    
    });

    console.log(`New entry at: ${data.timestamp}`)
}

setInterval(getData, 5100); //5.1s