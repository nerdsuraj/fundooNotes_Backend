var amqp = require('amqplib/callback_api');

import { passMail } from './sendmail';



// for producer  

 function producer(data) {

    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';
        var msg =  JSON.stringify(data) ;
        //  userMailID = data.email;
        
        // console.log("this is inside rabbitmq",userMailID)

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        // process.exit(0);
    }, 500);
});

// for consumer

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            let messages  = JSON.parse(msg.content) 
            let userMailID = messages.email;
            console.log("inside the rabbitmq------>>",userMailID)
            passMail(userMailID);
            console.log(" [x] Received %s",messages );
            

        }, {
            noAck: true
        });
    });
});


};

export {producer};
