class OrderPost {
    constructor(customerId, ticketCategoryId, numberOfTickets) {
        this.customerId = customerId;
        this.ticketCategoryId = ticketCategoryId;
        this.numberOfTickets = numberOfTickets;
    }

}
module.exports=OrderPost;