// orders.js
let cachedOrders = []; // Store the orders data

router.get('/Orders', async (req, res) => {
    try {
        // ... your existing code ...

        // Store the mappedOrders in the cachedOrders variable
        cachedOrders = mappedOrders;

        res.status(200).json(mappedOrders);
    } catch (error) {
        console.log('Error fetching orders: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Another route where you want to use the cachedOrders
router.get('/CachedOrders', (req, res) => {
    res.status(200).json(cachedOrders);
});

module.exports = router;
