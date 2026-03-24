/*
  Warnings:

  - You are about to drop the column `creatdAt` on the `Alunos` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Alunos` table. All the data in the column will be lost.
  - You are about to drop the column `cargoHoraria` on the `Cursos` table. All the data in the column will be lost.
  - You are about to drop the column `descrição` on the `Cursos` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Cursos` table. All the data in the column will be lost.
  - Added the required column `name` to the `Alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cargaHoraria` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cursos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "AlunosCursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alunosId" INTEGER NOT NULL,
    "cursosId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AlunosCursos_alunosId_fkey" FOREIGN KEY ("alunosId") REFERENCES "Alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AlunosCursos_cursosId_fkey" FOREIGN KEY ("cursosId") REFERENCES "Cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Alunos" ("cpf", "email", "id", "idade", "updatedAt") SELECT "cpf", "email", "id", "idade", "updatedAt" FROM "Alunos";
DROP TABLE "Alunos";
ALTER TABLE "new_Alunos" RENAME TO "Alunos";
CREATE UNIQUE INDEX "Alunos_cpf_key" ON "Alunos"("cpf");
CREATE UNIQUE INDEX "Alunos_email_key" ON "Alunos"("email");
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professor" TEXT,
    "cargaHoraria" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Cursos" ("createdAt", "id", "nome", "professor") SELECT "createdAt", "id", "nome", "professor" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
