"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var companySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false
    },
    branch: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "branch"
        }],
    users: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "user"
        }]
});
var Company = mongoose_1.default.model('company', companySchema);
exports.default = Company;
