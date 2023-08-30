const express = require('express')
const router = express.Router()
const findById = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/repository/Orders/getOrderById')
const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');
async function deleteById(id){
    try{
        return  await prisma.orders.delete({where: {orderId: parseInt(id)}});
    }
    catch(error){
        console.log("Error" + error)
    }
     finally {
        await prisma.$disconnect();
    }
}

router.get('/Delete/:id', async(req, res) =>{
    try{
        const orderId = req.params.id;
        deleteById(orderId)
            .then((deletedOrder) =>{
            if(deletedOrder){
                res.status(200).json ({message: "Order deleted succesfully"})
            }
            else res.status(404).json({message: "Order not found"})
        })
    }
    catch (error){
        console.log("Error" + error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router