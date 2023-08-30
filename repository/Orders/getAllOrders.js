const express = require('express');
const router = express.Router()
const orderToOrderDtoMapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/OrderToOrderDtoMapper')
router.get('/Orders', async (req, res) => {
    try {
        const orderDtos = await orderToOrderDtoMapper.fetchAndMapAllOrders();
        res.status(200).json(orderDtos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router