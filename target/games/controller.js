"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const entity_1 = require("./entity");
const game_creator_1 = require("./game_creator");
let GameController = class GameController {
    async getGame(id) {
        const game = await entity_1.default.findOne(id);
        return { game };
    }
    async allGames() {
        const games = await entity_1.default.find();
        return { games };
    }
    async createGame(name) {
        console.log(`Incoming POST body param with name:`, name);
        const newBoard = await new entity_1.default();
        newBoard.name = await name;
        newBoard.board = await game_creator_1.defaultBoard;
        newBoard.color = await game_creator_1.randomColor();
        console.log("Created New Game, with color " + newBoard.color);
        return newBoard.save();
    }
    async updateGame(id, update) {
        const updatedGame = await entity_1.default.findOne(id);
        if (!updatedGame) {
            throw new routing_controllers_1.NotFoundError("HTTP 404 Not Found: No Games Here");
        }
        if (update.color && !game_creator_1.validColor(update.color)) {
            throw new routing_controllers_1.BadRequestError("HTTP 400 Bad Request: No Such Color");
        }
        if (game_creator_1.moves(update.board, updatedGame.board) > 1) {
            throw new routing_controllers_1.BadRequestError("HTTP 400 Bad Request:  Only one move allowed. Wait your turn");
        }
        console.log("Game has been updated");
        return entity_1.default.merge(updatedGame, update).save();
    }
};
__decorate([
    routing_controllers_1.Get("/games/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "getGame", null);
__decorate([
    routing_controllers_1.Get("/games"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameController.prototype, "allGames", null);
__decorate([
    routing_controllers_1.Post("/games"),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "createGame", null);
__decorate([
    routing_controllers_1.Patch("/games/:id"),
    routing_controllers_1.HttpCode(200),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "updateGame", null);
GameController = __decorate([
    routing_controllers_1.JsonController()
], GameController);
exports.default = GameController;
//# sourceMappingURL=controller.js.map