// Import required modules
const express = require('express');
const router = express.Router()
const OrderDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/OrderDto');
const CustomerDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/CustomerDto');
const TicketCategoryDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/TicketCategoryDto')
const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');

async function mapOrdersToDto(prismaOrders) {
    const orderDtos = [];

    for (const prismaOrder of prismaOrders) {
        const customer = prismaOrder.Customer;
        const ticketCategory = prismaOrder.TicketCategory;

        const customerDto = new CustomerDto(customer.customerId, customer.name, customer.email);
        const ticketCategoryDto = new TicketCategoryDto(ticketCategory.ticketCategoryId, ticketCategory.description, ticketCategory.price);

        const orderDto = new OrderDto(
            ticketCategory.eventId,
            ticketCategory.Events.name,
            prismaOrder.orderId,
            prismaOrder.numberOfTickets,
            prismaOrder.orderedAt,
            prismaOrder.totalPrice,
            customerDto,
            ticketCategoryDto
        );

        orderDtos.push(orderDto);
    }

    return orderDtos;
}


async function fetchAndMapAllOrders() {
    const prismaOrders = await prisma.orders.findMany({
        include: {
            Customer: true,
            TicketCategory: {
                include: {
                    Events: true
                }
            }
        }
    });

    const orderDtos = await mapOrdersToDto(prismaOrders);
    return orderDtos;
}

fetchAndMapAllOrders()
    .then(orderDtos => console.log(orderDtos))
    .catch(error => console.error(error))
    .finally(() => prisma.$disconnect());


router.get('/Orders', async (req, res) => {
    try {
        const orderDtos = await fetchAndMapAllOrders();
        res.status(200).json(orderDtos);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router