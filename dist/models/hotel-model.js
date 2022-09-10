"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hotelSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    distance: { type: String, required: true },
    photo: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    rating: { type: Number, Min: 0, Max: 5 },
    rooms: {
        type: mongoose_1.Schema.Types.ObjectId, ref: 'Room', required: true
    },
    cheapestPrice: { type: Number, required: true },
    featured: { type: Boolean, required: true }
});
const Hotels = (0, mongoose_1.model)('Hotels', hotelSchema);
exports.default = Hotels;
