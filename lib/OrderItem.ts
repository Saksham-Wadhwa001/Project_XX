import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    // CONNECTION 1: Which Order does this belong to?
    orderId: {
        type: String,
        ref: 'Order',
        required: true
    },

    // CONNECTION 2: Which actual Product is this?
    ItemId: {
        type: String,
        ref: 'Item',
        required: true
    },

    quantity: { type: Number, required: true, min: 1 },

    // HISTORICAL DATA: Keep the price here in case the seller changes it later
    priceAtBooking: { type: Number, required: true }

}, { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
OrderItemSchema.virtual("subtotal").get(function () {
    return this.priceAtBooking * this.quantity;
});

export default mongoose.models.OrderItem || mongoose.model('OrderItem', OrderItemSchema);