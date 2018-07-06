import {
  Get,
  JsonController,
  Param,
  Body,
  Post,
  HttpCode,
  Patch,
  NotFoundError
} from "routing-controllers";
import Game from "./entity";

@JsonController()
export default class GameController {
  @Get("/games")
  async allGames() {
    const games = await Game.find();
    return { games };
  }

  @Get("/games/:id")
  getGame(@Param("id") id: number) {
    return Game.findOne(id);
  }

  @Patch("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const game = await Game.findOne(id);
    if (!game) throw new NotFoundError("No Games Here");

    return Game.merge(game, update).save();
  }

  @Post("/games")
  @HttpCode(201)
  @HttpCode(418)
  createGame(@Body() game: Game) {
    console.log(`Incoming POST body param:`, game);
    return game.save();
  }
}
