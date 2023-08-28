const express = require('express')
const router = express.Router()
const customerMapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/CustomerMapper')


router.get('/Customers', async( req, res) =>
{ try
    {
        const id = req.params.id
        const customers = await customerMapper.fetchAndMappAllCustomers();

    res.status(200).json(customers)
}
    catch(error){
        console.log("Error " + error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router