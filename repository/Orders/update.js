const express = require('express')
const router = express.Router()
const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');
async function patch(orderId, ticketCategoryId, numberOfTickets){
    try{
        const currentDate = new Date()
        const order = await prisma.orders.findUnique({
            where:{ orderId: parseInt(orderId) }
        })
        const ticketCategory = await prisma.TicketCategory.findUnique({
            where: { ticketCategoryId: parseInt(ticketCategoryId)}
        })
        if(order){
            return await prisma.orders.update({
                where: { orderId: parseInt(orderId)},
                data: {
                    ticketCategoryId: parseInt(ticketCategoryId),
                    numberOfTickets: parseInt(numberOfTickets),
                    orderedAt: currentDate,
                    totalPrice: parseInt(numberOfTickets) * ticketCategory.price
                    }
            })
        }
            else return null
    }
    catch(error){
        console.log("Error" +  error)
    }
}

router.get('/Update/:id/:ticketCategoryId/:numberOfTickets', async(req,res) =>{
    try{
        const orderId = req.params.id;
        const ticketCategoryId = req.params.ticketCategoryId
        const numberOfTickets = req.params.numberOfTickets
        patch(orderId, ticketCategoryId, numberOfTickets)
            .then((updatedOrder) =>{
                if(updatedOrder)
                    res.status(200).json({message: "Order updated succesfully"})
                else res.status(404).json({message: "Order not found"})
            })
    }
    catch(error){
        console.log("Error" + error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router