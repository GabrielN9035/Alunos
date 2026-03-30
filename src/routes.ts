import { Router } from "express";

import{ authentication } from "./middlewares/authentication";

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

routes.get("/alunos", authentication, alunosController.list);
routes.get("/alunos/:id", authentication, alunosController.getById);
routes.post("/alunos", authentication, alunosController.create);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);

// Cursos

routes.get("/cursos", authentication,cursosController.list); // lista curso 
routes.get("/cursos/:id", authentication, cursosController.getById); // pega um curso
routes.post("/cursos", authentication, cursosController.create); // cria um curso
routes.put("/cursos/:id", authentication, cursosController.update); // atualizar curso
routes.delete("/cursos/:id", authentication, cursosController.delete); // rota para deletar um curso 


routes.post('/alunosMatricular', authentication, alunosController.matricular) // rota para matricular um aluno em um curso
routes.delete('/alunosDesmatricular', authentication, alunosController.desmatricular) // rota para desmatricular aluno de um curso


routes.post("/funcionarios/login", funcionariosControllers.login); // rota para listar os funcionários usando o método list do controller de funcionários
routes.get("/funcionarios", authentication, funcionariosControllers.list); // routes.get("/funcionarios", funcionariosControllers.list); para listar os funcionários usando o método list do controller de funcionários
routes.get("/funcionarios/:id", authentication, funcionariosControllers.getById); // routes.get("/funcionarios/:id", funcionariosControllers.getById); para obter um funcionário específico usando o método getById do controller de funcionários, passando o id como parâmetro
routes.post("/funcionarios", authentication, funcionariosControllers.create); // routes.post("/funcionarios", funcionariosControllers.create); para criar um novo funcionário usando o método create do controller de funcionários
routes.put("/funcionarios/:id", authentication, funcionariosControllers.update); // routes.put("/funcionarios/:id", funcionariosControllers.update); para atualizar um funcionário específico usando o método update do controller de funcionários, passando o id como parâmetro
routes.delete("/funcionarios/:id", authentication, funcionariosControllers.delete); // routes.delete("/funcionarios/:id", funcionariosControllers.delete); para deletar um funcionário específico usando o método delete do controller de funcionários, passando o id como parâmetro

export default routes;