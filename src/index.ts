import "reflect-metadata";
import { createKoaServer } from "routing-controllers";
import GameController from "./games/controller";

const app = createKoaServer({
  controllers: [GameController]
});

app.listen(4000, () => console.log("Listening on port 4000"));
