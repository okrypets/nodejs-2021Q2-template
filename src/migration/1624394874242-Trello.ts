import {MigrationInterface, QueryRunner} from "typeorm";

export class Trello1624394874242 implements MigrationInterface {
    name = 'Trello1624394874242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "columns" json, CONSTRAINT "PK_a898df2ad483f1ad130bdcb56cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Column" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_df0aa166f1a3f0526fcbd77ca72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "order" integer NOT NULL, "description" character varying NOT NULL, "userId" text, "columnId" character varying, "boardId" text, CONSTRAINT "PK_95d9364b8115119ba8b15a43592" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(35), "login" character varying(35), "password" character varying(35), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Task"`);
        await queryRunner.query(`DROP TABLE "Column"`);
        await queryRunner.query(`DROP TABLE "Board"`);
    }

}
