class EventDto{
    constructor(eventId, venueId,eventTypeId, name, startDate, endDate, description) {
    this.eventId = eventId;
    this.venueId = venueId;
    this.eventTypeId = eventTypeId;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    }
}

module.exports = EventDto