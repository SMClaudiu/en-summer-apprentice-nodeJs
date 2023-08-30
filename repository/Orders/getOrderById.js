const express = require('express')
const router = express.Router()
const mapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/OrderToOrderDtoMapper')
const {status} = require("express/lib/response");



async function getOrderById(id){
    try{
        const orders = await mapper.fetchAndMapAllOrders()
        for(const  order of orders){
            if(order.orderId === parseInt(id)){
                return order
            }
        }
    }
    catch(error)
    {
        console.log("Error" + error)
    }
}
router.get('/Order/:id', async(req, res) =>
{
    try{
        const id = req.params.id;
        const order = await getOrderById(id)
        if(order != null){
                res.status(200).json(order);
        }
    }
    catch(error)
    {
        console.log("Error" + error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports =  router
