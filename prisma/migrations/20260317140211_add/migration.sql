-- CreateTable
CREATE TABLE "Alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "cpf" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "creatdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "professor" TEXT,
    "cargoHoraria" INTEGER NOT NULL,
    "descrição" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL
);




-- CreateIndex
CREATE UNIQUE INDEX "Alunos_cpf_key" ON "Alunos"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Alunos_email_key" ON "Alunos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cursos_nome_key" ON "Cursos"("nome");
