const express = require('express')
const router = express.Router()
const eventToEventDtoMapper = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/EventToEventDtoMapper')


router.get('/Events', async(req, res) =>{
    try{
        const eventDtos = await eventToEventDtoMapper.fetchAndMapAllEvents();
        console.log(eventDtos)
        res.status(200).json(eventDtos)
    }
    catch (error){
        console.log('Error', error);
        res.status(500).json({error: 'Internal server error'})
    }
});

module.exports = router