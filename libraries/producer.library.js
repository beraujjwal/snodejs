'use strict';
require('dotenv').config();
const { kafka } = require('../helpers/kafka');
let producer = null;
if(kafka) {
  producer = kafka.producer({
      allowAutoTopicCreation: true,
      transactionTimeout: 30000
  });
}
exports.sendMessage = async (messageTopic, messageBody) => {
    try{

        await producer.connect()
        .then((value) => log(`Producer connected - ${JSON.stringify(value)}`))
        .catch((ex) => error(`Kafka producer connect failed! - ${ex.message}`));

        await producer.send({
          topic: messageTopic,
          messages: [{ value: messageBody }],
        }).then((resp) => {
          log('producerData: ', resp);
        })
        .catch((err) => {
          error(`Kafka producer unable to send the message - ${ex.message}`);
        })
        await producer.disconnect();

    } catch (ex) {
      error(ex.message);
      throw new baseError(ex);
    }
};

exports.sendKafkaNotification = async (topic, payload) => {
    const message = JSON.stringify(payload);
    await sendMessage(topic, message).catch(console.error);
    log(`Message sent to ${topic}: ${message}`);
};

