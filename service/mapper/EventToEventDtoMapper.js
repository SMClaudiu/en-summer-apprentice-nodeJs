const EventTypeDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/EventTypeDto');
const VenueDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/VenueDto');
const TicketCategoryDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/TicketCategoryDto');
const EventDto = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/models/dto/EventDto')
const prisma = require('D:/Facultate/An II/Sem2/Practica/Endava/en-summer-apprentice-nodejs/service/prismaService');


async function mapEventsToDto(prismaEvents){
    const eventDtos = [];
    for(const prismaEvent of prismaEvents) {
        const ticketCategoryDtos = []

        const ticketCategorys = prismaEvent.TicketCategory
        const venue = prismaEvent.Venues
        const eventType = prismaEvent.EventType


        for(const ticketCategory of ticketCategorys){
            const ticketCategoryDto = new TicketCategoryDto(ticketCategory.ticketCategoryId, ticketCategory.description, ticketCategory.price)
            ticketCategoryDtos.push(ticketCategoryDto)
        }

        const venueDto = new VenueDto(venue.venueId, venue.location, venue.type, venue.capacity)
        const eventTypeDto = new EventTypeDto(eventType.eventTypeId, eventType.name)

        const eventDto = new EventDto(
            prismaEvent.eventId,
            prismaEvent.name,
            prismaEvent.startDate,
            prismaEvent.endDate,
            prismaEvent.description,
            ticketCategoryDtos,
            venueDto,
            eventTypeDto
        );
        eventDtos.push(eventDto);
    }
    return eventDtos
}


async function fetchAndMapAllEvents(){
    const prismaEvents = await prisma.events.findMany(
        {
            include:{
                TicketCategory: {
                    include:{
                        Events: true
                    }
                },
                Venues:true,
                EventType:true
            }
        });

    return await mapEventsToDto(prismaEvents);
}

module.exports = { fetchAndMapAllEvents }
