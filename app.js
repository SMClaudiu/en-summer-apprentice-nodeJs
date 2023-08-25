const express = require('express');
const orderRouter = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/OrderToOrderDtoMapper');
const {$disconnect} = require("./service/prismaService");

const app = express();


app.use('/api', orderRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
process.on('beforeExit', () => {
    $disconnect();
});
