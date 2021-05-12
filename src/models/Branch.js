"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var branchSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    localization: {
        type: String,
        required: false
    },
    active: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "active"
        }],
    company: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "company"
    }
});
var Branch = mongoose_1.default.model('branch', branchSchema);
exports.default = Branch;
