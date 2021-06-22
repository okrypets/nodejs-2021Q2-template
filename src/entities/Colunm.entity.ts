import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm"

@Entity({name: 'Column'})
export class Columns extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string | undefined;
    @Column('varchar')
    title = "base column";
    @Column('int')
    order = 0;
}

