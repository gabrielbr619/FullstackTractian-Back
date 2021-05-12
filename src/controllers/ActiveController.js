"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Active_1 = __importDefault(require("../models/Active"));
var Branch_1 = __importDefault(require("../models/Branch"));
var cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: NAMEDOTENV,
    api_key: KEYDOTENV,
    api_secret: SECRETDOTENV
});
var ActiveController = /** @class */ (function () {
    function ActiveController() {
    }
    ActiveController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Active_1.default.find().populate({ path: "branch", populate: { path: 'company' } }).then(function (data) { return res.send(data); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActiveController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var img_1, file, branch, _a, name_1, responsible, status_1, healthLevel, description, model, active, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        if (!req.files) return [3 /*break*/, 2];
                        file = req.files.image;
                        return [4 /*yield*/, cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
                                img_1 = result.url;
                                res.send(result + 'Deu certo');
                            })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        branch = void 0;
                        _a = req.body, name_1 = _a.name, responsible = _a.responsible, status_1 = _a.status, healthLevel = _a.healthLevel, description = _a.description, model = _a.model;
                        if (!!(req.body.id === "1")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Branch_1.default.findById(req.body.id)];
                    case 3:
                        branch = _b.sent();
                        _b.label = 4;
                    case 4:
                        active = new Active_1.default({
                            name: name_1,
                            responsible: responsible,
                            status: status_1,
                            healthLevel: healthLevel,
                            description: description,
                            model: model,
                            branch: branch,
                            img: img_1
                        });
                        if (!(branch === undefined)) {
                            branch.active.push(active);
                        }
                        return [4 /*yield*/, active.save(function (err) {
                                if (err)
                                    return console.error(err);
                                console.log("Document inserted sucessufully!");
                            })];
                    case 5:
                        _b.sent();
                        if (!!(branch === undefined)) return [3 /*break*/, 7];
                        return [4 /*yield*/, branch.save()];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        res.send(active);
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        console.log(err_1);
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ActiveController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Active_1.default.deleteOne({ _id: req.params.id }, function (err) {
                            if (err)
                                return console.error(err);
                            console.log("Document deleted sucessufully");
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Active_1.default.find().then(function (data) { return res.send(data); })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ActiveController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, branch, img, update, file, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = { _id: req.params.id };
                        if (!req.files) return [3 /*break*/, 2];
                        file = req.files.image;
                        return [4 /*yield*/, cloudinary.uploader.upload(file.tempFilePath, function (err, result) {
                                img = result.url;
                                res.send(result + 'Deu certo');
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(req.body.id === "1")) return [3 /*break*/, 4];
                        return [4 /*yield*/, Active_1.default.findById(req.params.id)
                            // @ts-expect-error
                        ];
                    case 3:
                        active = _a.sent();
                        // @ts-expect-error
                        active.branch = undefined;
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Branch_1.default.findOne({ _id: req.body.id })];
                    case 5:
                        branch = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (img === undefined) {
                            update = { name: req.body.name, status: req.body.status, branch: branch, responsible: req.body.responsible, healthLevel: req.body.healthLevel };
                        }
                        else {
                            update = { name: req.body.name, status: req.body.status, branch: branch, responsible: req.body.responsible, healthLevel: req.body.healthLevel, img: img };
                        }
                        return [4 /*yield*/, Active_1.default.findOneAndUpdate(query, update)];
                    case 7:
                        _a.sent();
                        console.log(update);
                        res.send('salvo com sucesso');
                        return [2 /*return*/];
                }
            });
        });
    };
    return ActiveController;
}());
exports.default = new ActiveController();
