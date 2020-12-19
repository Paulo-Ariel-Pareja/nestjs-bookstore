import {MigrationInterface, QueryRunner} from "typeorm";

export class addStatus1608090570322 implements MigrationInterface {
    name = 'addStatus1608090570322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_detail" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "lastname" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."lastname" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."updated_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."lastname" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "lastname" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user_detail"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_detail" DROP COLUMN "status"`);
    }

}
