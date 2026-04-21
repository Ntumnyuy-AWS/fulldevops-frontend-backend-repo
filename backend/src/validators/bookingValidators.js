export const validateBooking = (data) => {
    const { items, pickupLocation, deliveryLocation} = data

    if (!items || items.length === 0) {
        return "Items are required";
    }

    if (!pickupLocation || !deliveryLocation) {
        return "Pickup adn delivery location are required";
    }

    return null;

};