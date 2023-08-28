// Import required modules
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
            ticketCategory.Events.eventId,
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




module.exports = { fetchAndMapAllOrders }
