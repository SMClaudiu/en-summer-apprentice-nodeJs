class EventDto{
    constructor(eventId, name, startDate, endDate, description,ticketCategory,venue,eventType) {
    this.eventId = eventId;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.ticketCategory = ticketCategory;
    this.venue = venue;
    this.eventType = eventType;
    }
}

module.exports = EventDto