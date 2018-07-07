import {
  Get,
  JsonController,
  Param,
  Body,
  Post,
  HttpCode,
  Patch,
  NotFoundError,
  BadRequestError
} from "routing-controllers";
import Game from "./entity";
import { randomColor, defaultBoard, validColor, moves } from "./game_creator";

@JsonController()
export default class GameController {
  @Get("/games/:id")
  async getGame(@Param("id") id: number) {
    const game = await Game.findOne(id);
    return { game };
  }

  @Get("/games")
  async allGames() {
    const games = await Game.find();
    return { games };
  }

  @Post("/games")
  @HttpCode(201)
  async createGame(@Body() name: string) {
    console.log(`Incoming POST body param with name:`, name);
    const newBoard = await new Game();
    newBoard.name = await name;
    newBoard.board = await defaultBoard;
    newBoard.color = await randomColor();
    console.log("Created New Game, with color " + newBoard.color);
    return newBoard.save();
  }

  @Patch("/games/:id")
  @HttpCode(200)
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const updatedGame = await Game.findOne(id);
    if (!updatedGame) {
      throw new NotFoundError("HTTP 404 Not Found: No Games Here");
    }
    if (update.color && !validColor(update.color)) {
      throw new BadRequestError("HTTP 400 Bad Request: No Such Color");
    }
    if (
      update.board !== undefined &&
      moves(update.board, updatedGame.board) > 1
    ) {
      throw new BadRequestError(
        "HTTP 400 Bad Request:  Only one move allowed. Wait your turn"
      );
    }
    console.log("Game has been updated");
    return Game.merge(updatedGame, update).save();
  }
}
