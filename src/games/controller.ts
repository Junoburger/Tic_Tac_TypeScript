import { Get, JsonController } from "routing-controllers";

@JsonController()
export default class GameController {
  @Get("/pages")
  allGames() {}
}
