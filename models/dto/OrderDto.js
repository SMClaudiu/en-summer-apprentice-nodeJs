class OrderDto{
    constructor(eventId, eventName, orderId, numberOfTickets, orderedAt, totalPrice, customer, ticketCategory) {
        this.eventId = eventId;
        this.eventName = eventName;
        this.orderId = orderId;
        this.numberOfTickets = numberOfTickets;
        this.orderedAt = orderedAt;
        this.totalPrice = totalPrice
        this.customer = customer;
        this.ticketCategory = ticketCategory
    }
}

module.exports = OrderDto