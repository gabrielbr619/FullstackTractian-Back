"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var activeSchema = new mongoose_1.default.Schema({
    img: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    responsible: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    healthLevel: {
        type: Number,
        required: true
    },
    branch: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: "branch",
        active: [{
                type: mongoose_1.default.Schema.Types.ObjectId, ref: "active"
            }]
    }
});
var Active = mongoose_1.default.model('active', activeSchema);
exports.default = Active;
