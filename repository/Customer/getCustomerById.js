const express = require('express')
const router = express.Router()
const customerMapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/CustomerMapper')

async function getCustomerById(id){
    try{
        const customers = await customerMapper.fetchAndMappAllCustomers();
        for(const customer of customers) {
            if (customer.customerId === parseInt(id)) {
                return customer
            }
        }
    }
    catch(error){
        console.log("Error " + error)
    }
}
router.get('/Customer/:id', async( req, res) =>
{ try{
    const id = req.params.id;
    const customer = await getCustomerById(id);
    if(customer != null)
            res.status(200).json(customer);
}
catch(error){
    console.log("Error " + error)
    res.status(500).json({error: "Internal server error"})
}
})

module.exports = router