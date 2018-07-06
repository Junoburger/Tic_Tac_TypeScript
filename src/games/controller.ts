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

  @Post("/games")
  @HttpCode(201)
  @HttpCode(418)
  createGame(@Body() name: Game) {
    console.log(`Incoming POST body param:`, name);
    return name.save();
  }

  @Patch("/games/:id")
  async updateGame(@Param("id") id: number, @Body() update: Partial<Game>) {
    const game = await Game.findOne(id);
    if (!game) throw new NotFoundError("No Games Here");

    return Game.merge(game, update).save();
  }
}
