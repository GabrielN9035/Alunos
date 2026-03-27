import { Router } from "express";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import funcionariosControllers from "./controllers/funcionarios";
import { prisma } from "../config/prisma";

const routes = Router();

routes.get("/", (request, response) =>
    response.status(200).json({ success: true })
);


// Rotas de alunos
// routes.get("/alunos", (request, response) =>

routes.get("/alunos", alunosController.list);
routes.get("/alunos/:id", alunosController.getById);
routes.post("/alunos", alunosController.create);
routes.put("/alunos/:id", alunosController.update);
routes.delete("/alunos/:id", alunosController.delete);

// Cursos

routes.get("/cursos", cursosController.list); // lista curso 

routes.get("/cursos/:id", cursosController.getById); // pega um curso

routes.post("/cursos", cursosController.create); // cria um curso

routes.put("/cursos/:id", cursosController.update); // atualizar curso

routes.delete("/cursos/:id", cursosController.delete); // rota para deletar um curso 


routes.post('/alunosMatricular', alunosController.matricular) // rota para matricular um aluno em um curso

routes.delete('/alunosDesmatricular', alunosController.desmatricular) // rota para desmatricular aluno de um curso



routes.get("/funcionarios", funcionariosControllers.list); // routes.get("/funcionarios", funcionariosControllers.list); para listar os funcionários usando o método list do controller de funcionários
routes.get("/funcionarios/:id", funcionariosControllers.getById); // routes.get("/funcionarios/:id", funcionariosControllers.getById); para obter um funcionário específico usando o método getById do controller de funcionários, passando o id como parâmetro
routes.post("/funcionarios", funcionariosControllers.create); // routes.post("/funcionarios", funcionariosControllers.create); para criar um novo funcionário usando o método create do controller de funcionários
routes.put("/funcionarios/:id", funcionariosControllers.update); // routes.put("/funcionarios/:id", funcionariosControllers.update); para atualizar um funcionário específico usando o método update do controller de funcionários, passando o id como parâmetro
routes.delete("/funcionarios/:id", funcionariosControllers.delete); // routes.delete("/funcionarios/:id", funcionariosControllers.delete); para deletar um funcionário específico usando o método delete do controller de funcionários, passando o id como parâmetro

export default routes;