/*
  Warnings:

  - The primary key for the `ClientOnChannel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `ClientOnChannel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ClientOnChannel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clientId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ClientOnChannel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClientOnChannel_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ClientOnChannel" ("channelId", "clientId", "createdAt", "updatedAt") SELECT "channelId", "clientId", "createdAt", "updatedAt" FROM "ClientOnChannel";
DROP TABLE "ClientOnChannel";
ALTER TABLE "new_ClientOnChannel" RENAME TO "ClientOnChannel";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
