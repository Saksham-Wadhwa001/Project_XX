import mongoose from 'mongoose';

const SellerSchema = new mongoose.Schema({
    // Basic Identity
    uid: {
        type: String,
        default: () => crypto.randomUUID(), // Auto-generates like: "c186877e-29a4-4c4c..."
        unique: true,   // Ensures database rejects duplicates
        index: true     // Makes searching by this ID very fast
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Shop Details
    shop: { type: String, required: true },
    contact_no: { type: String, required: true },
    // isOpen: { type: Boolean, default: true },

    // --- CRITICAL CONFIGURATION (Timers) ---
    time: {type: Number},

});

export default mongoose.models.Seller || mongoose.model('Seller', SellerSchema);