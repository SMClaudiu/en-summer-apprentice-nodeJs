const express = require('express')
const router = express.Router()
const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');


async function post(customerId, ticketCategoryId, numberOfTickets){
    try{
        const currentDate = new Date()
        const ticketCategory = await prisma.TicketCategory.findUnique({
            where:{ticketCategoryId: parseInt(ticketCategoryId)}
        })
        const customer = await prisma.Customer.findUnique({
            where: {customerId: customerId}
        })
        if(ticketCategory){
            if(customer){
                console.log(currentDate)
                return await prisma.orders.create({
                    data:{
                        customerId: parseInt(customerId),
                        ticketCategoryId: parseInt(ticketCategoryId),
                        numberOfTickets: parseInt(numberOfTickets),
                        orderedAt: currentDate,
                        totalPrice: parseInt(numberOfTickets) * ticketCategory.price
                    }
                })
            }
            else return null
        }
        else return null
    }
    catch (error){
        console.log("Error" + error)
    }
}

router.get('/Post/:customerId/:ticketCategoryId/:numberOfTickets', async(req, res) =>{
    try{
        const customerId = req.params.customerId
        const ticketCategoryId = req.params.ticketCategoryId
        const numberOfTickets = req.params.numberOfTickets
        console.log(customerId, ticketCategoryId, numberOfTickets)
            .then((postOrder) =>{
                if(postOrder){
                    res.status(200).json( {message: "Order added succsefully"})
                }
                else res.status(409).json({message:"Order already eists"})
            })
    }
    catch(error){
        console.log("Error" + error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router