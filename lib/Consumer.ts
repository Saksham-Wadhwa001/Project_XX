import mongoose from 'mongoose';

const ConsumerSchema = new mongoose.Schema({
    // Basic Identity
    uid: {
        type: String,
        default: () => crypto.randomUUID(), // Auto-generates like: "c186877e-29a4-4c4c..."
        unique: true,   // Ensures database rejects duplicates
        index: true     // Makes searching by this ID very fast
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact_no: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Consumer || mongoose.model('Consumer', ConsumerSchema);