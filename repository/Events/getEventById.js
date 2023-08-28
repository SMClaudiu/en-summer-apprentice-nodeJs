const express = require('express')
const router = express.Router()

const getEvents = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/mapper/EventToEventDtoMapper')


router.get(`/Event/:id`, async(req, res ) =>
{
    console.log("WE in")
    try {
        const id = req.params.id
        const events = await getEvents.fetchAndMapAllEvents();
        for (const ev of events){
            if(ev.eventId === parseInt(id)){
                res.status(200).json(ev);
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