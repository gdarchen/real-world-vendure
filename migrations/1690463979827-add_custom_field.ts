import {MigrationInterface, QueryRunner} from "typeorm";

export class addCustomField1690463979827 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_7256fef1bb42f1b38156b7449f"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_collection" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isRoot" boolean NOT NULL DEFAULT (0), "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT (0), "filters" text NOT NULL, "inheritFilters" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "parentId" integer, "featuredAssetId" integer, "customFieldsCustom_field_name" boolean DEFAULT (0), CONSTRAINT "FK_4257b61275144db89fa0f5dc059" FOREIGN KEY ("parentId") REFERENCES "collection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7256fef1bb42f1b38156b7449f5" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_collection"("createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "inheritFilters", "id", "parentId", "featuredAssetId") SELECT "createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "inheritFilters", "id", "parentId", "featuredAssetId" FROM "collection"`, undefined);
        await queryRunner.query(`DROP TABLE "collection"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_collection" RENAME TO "collection"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7256fef1bb42f1b38156b7449f" ON "collection" ("featuredAssetId") `, undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_7256fef1bb42f1b38156b7449f"`, undefined);
        await queryRunner.query(`ALTER TABLE "collection" RENAME TO "temporary_collection"`, undefined);
        await queryRunner.query(`CREATE TABLE "collection" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isRoot" boolean NOT NULL DEFAULT (0), "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT (0), "filters" text NOT NULL, "inheritFilters" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "parentId" integer, "featuredAssetId" integer, CONSTRAINT "FK_4257b61275144db89fa0f5dc059" FOREIGN KEY ("parentId") REFERENCES "collection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7256fef1bb42f1b38156b7449f5" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "collection"("createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "inheritFilters", "id", "parentId", "featuredAssetId") SELECT "createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "inheritFilters", "id", "parentId", "featuredAssetId" FROM "temporary_collection"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_collection"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_7256fef1bb42f1b38156b7449f" ON "collection" ("featuredAssetId") `, undefined);
   }

}
