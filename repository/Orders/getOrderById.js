const express = require('express')
const router = express.Router()
const getOrderById = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/OrderToOrderDtoMapper')


router.get('/Order/:id', async(req, res) =>
{
    try{
        const id = req.params.id;
        const orders = await getOrderById.fetchAndMapAllOrders()
        for(const  order of orders){
            if(order.orderId === parseInt(id)){
                res.status(200).json(order);
                return
            }
        }
    }
    catch(error)
    {
        console.log("Error" + error)
        res.status(500).json({error: "Internal server error"})

    }
})

module.exports = router