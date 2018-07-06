import { Get, JsonController, Put, Param, Body } from "routing-controllers";

@JsonController()
export default class GameController {
  @Get("/games")
  allGames() {}

  @Put("/games/:id")
  updateGame(@Param("id") id: number, @Body() body: Partial<Game>): Game {
    console.log(`Incoming PUT body param:`, body);
    return gamesById[id];
  }
}
