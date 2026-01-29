import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    // CONNECTION 1: Who bought it?
    orderId: {
        type: String,
        default: crypto.randomUUID(),
        unique: true,
        required: true
    },
    consumerId: {
        type: String,
        required: true
    },

    // CONNECTION 2: Who sold it?
    sellerId: {
        type: String,
        required: true
    },

    // State Machine
    status: {
        type: String,
        enum: ['PENDING', 'BOOKED', 'COMPLETED', 'EXPIRED', 'DECLINED'],
        default: 'PENDING'
    },

    // TIMESTAMPS & DEADLINES
    createdAt: { type: Date, default: Date.now },

    // Snapshot of the seller's timer setting at the moment of purchase
    pickupWindowMinutes: {
        type: Number,
        ref: "Seller",
        required: true
    },

    // Calculated Deadline (Date logic must be handled in your API when saving)
    pickupDeadline: { type: Date }

});
OrderSchema.virtual("consumer", {
    ref: "Consumer",
    localField: "consumerId",
    foreignField: "uid",
    justOne: true,
});

OrderSchema.virtual("seller", {
    ref: "Seller",
    localField: "sellerId",
    foreignField: "uid",
    justOne: true,
});

OrderSchema.set("toJSON", { virtuals: true });
OrderSchema.set("toObject", { virtuals: true });
export default mongoose.models.Order || mongoose.model('Order', OrderSchema);