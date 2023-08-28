const express = require('express');
const getAllOrders = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Orders/getAllOrders');
const getOrderById = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Orders/getOrderById')
const getAllEvents = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Events/getEvents')
const getEventById = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Events/getEventById')
const getAllCustomers = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Customer/getAllCustomers')
const getCustomerById = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Customer/getCustomerById')
const {$disconnect} = require("./service/prismaService");

const app = express();



app.use('/api/Orders/getOrders', getAllOrders);
app.use('/api/Orders/getOrderById', getOrderById);
app.use('/api/Events/getEvents', getAllEvents);
app.use('/api/Events/getEventById', getEventById);
app.use('/api/Customers/getAllCustomers', getAllCustomers);
app.use('/api/Customers/getCustomerById', getCustomerById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on('beforeExit', () => {
    $disconnect();
});
