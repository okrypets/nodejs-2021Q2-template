import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;
  @Column('varchar')
  title = "base title";
  @Column({ type: "json", nullable: true })
  columns?: string;
}

export {Board};