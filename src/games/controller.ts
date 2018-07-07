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
  @Get("/games")
  async allGames() {
    const games = await Game.find();
    return { games };
  }

  @Post("/games")
  @HttpCode(201)
  async createGame(@Body() name: string) {
    console.log(`Incoming POST body param with:`, name);
    const newBoard = await new Game();
    newBoard.name = name;
    newBoard.board = defaultBoard;
    newBoard.color = randomColor();
    console.log("Created New Game, with color " + newBoard.color);
    return newBoard.save();
  }

  @Patch("/games/:id")
  @HttpCode(200)
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const updatedGame = await Game.findOne(id);
    if (!updatedGame) {
      throw new NotFoundError("HTTP 404 Not Found: No Games Here");
    } else if (update.color !== validColor(update.color)) {
      throw new BadRequestError("HTTP 400 Bad Request: No Such Color");
    } else if (update.board && moves(update.board, updatedGame.board) > 1) {
      throw new BadRequestError(
        "HTTP 400 Bad Request:  Only one move allowed. Wait your turn"
      );
    } else {
      console.log("Game has been updated");

      return Game.merge(updatedGame, update).save();
    }
  }
}
