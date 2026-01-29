import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    // CONNECTION: Which seller owns this item?
    ItemId: {
        type: String,
        default: crypto.randomUUID(),
        unique: true,
        index: true,
    },
    sellerId: {
        type: String,
        ref: 'Seller',
        required: true
    },

    name: { type: String, required: true },
    price: { type: Number, required: true },

    // Inventory Logic
    quantity: { type: Number, default: 0 },

    // Optional: separate active/inactive status
    // isAvailable: { type: Boolean, default: true}
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
ItemSchema.virtual('sellerDetails', {
    ref: 'Seller',           // The model to use
    localField: 'sellerId',  // The field in THIS schema (Item.sellerId)
    foreignField: 'uid',     // The field in the SELLER schema (Seller.uid)
    justOne: true            // We expect only 1 seller per item
});
export default mongoose.models.Item || mongoose.model('Item', ItemSchema);