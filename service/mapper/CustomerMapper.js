const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');
const CustomerDto = require("../../models/dto/CustomerDto");


async function mapCustomersToDto(prismaCustomers){
    const customers = []
    for(const prismaCustomer of prismaCustomers){
        const customerDto = new CustomerDto(
            prismaCustomer.customerId,
            prismaCustomer.name,
            prismaCustomer.email,
        )
        customers.push(customerDto)
    }
    return customers
}

async function fetchAndMappAllCustomers(){
    const prismaCustomers = await prisma.customer.findMany()
    return await mapCustomersToDto(prismaCustomers)
}
module.exports = { fetchAndMappAllCustomers }