import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import { IsString, IsJSON } from "class-validator";

@Entity()
export default class Game extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @Column("text", { nullable: false })
  name: string;

  @IsString()
  @Column("text", { nullable: false })
  color: string;

  @IsJSON()
  @Column("json", {
    nullable: true,
    default: [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]]
  })
  board: object;
}
