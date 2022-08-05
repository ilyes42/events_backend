import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
