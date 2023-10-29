/*
  Warnings:

  - You are about to drop the `BackupLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EffortLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BackupLog";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EffortLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "effortlog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "lifeCycle" TEXT NOT NULL,
    "effortCategory" TEXT NOT NULL,
    "deliverable" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "backuplog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "lifeCycle" TEXT NOT NULL,
    "effortCategory" TEXT NOT NULL,
    "deliverable" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
