const express = require('express')
const router = express.Router()
const customerMapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/CustomerMapper')


router.get('/Customer/:id', async( req, res) =>
{ try{
    const id = req.params.id;
    console.log(id)
    const customers = await customerMapper.fetchAndMappAllCustomers();
    for(const customer of customers) {
        if (customer.customerId === parseInt(id)) {
            res.status(200).json(customer);
            return
        }
    }
}
catch(error){
    console.log("Error " + error)
    res.status(500).json({error: "Internal server error"})
}
})

module.exports = router