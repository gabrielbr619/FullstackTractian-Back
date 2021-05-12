"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var multer_1 = __importDefault(require("multer"));
var upload = multer_1.default();
var PORT = process.env.PORT || 3000;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_fileupload_1.default({ useTempFiles: true }));
app.use(routes_1.default);
mongoose_1.default.connect('mongodb+srv://gabrielbr619:gabrielbr619@cluster0.7z3nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.listen(PORT, function () { return console.log("Ouvindo PORT " + PORT); });
