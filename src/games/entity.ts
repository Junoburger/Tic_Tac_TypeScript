import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, IsJSON } from "class-validator";
import { defaultBoard } from "./game_creator";

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @Column("text", { nullable: true })
  name: string;

  @IsString()
  @Column("text", { nullable: false })
  color: string;

  @IsJSON()
  @Column("json", {
    nullable: true,
    default: defaultBoard
  })
  board: string[][];
}
