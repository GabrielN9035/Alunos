import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import {handleErrors} from "../helpers/handleErrors";
 
export default {
    list: async (request: Request, response: Response) => { // criar a lista para listar os alunos
        try {
            const users = await prisma.alunos.findMany({
                include: { cursos : true }
            });
            return response.status(200).json(users);
        } catch (e) {
            
            return handleErrors(e, response);}
    },
    create: async (request: Request, response: Response) => { // cria um alno
        try {
            const { name, email, idade, cpf } = request.body;
            const user = await prisma.alunos.create({
                data: {
                    name,
                    email,
                    idade,
                    cpf,
                },
            })
            
            return response.status(201).json(user);
        } catch (e: any) {
            return handleErrors(e, response);}
    },
    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { name, idade, email,cpf } = request.body;
            const students = await prisma.alunos.update({


                where: { id: +id },
                data: {
                    name,
                    email,
                    idade,
                    cpf
                },
            });
            return response.status(200).json(students);
        } catch (e) {
            return handleErrors(e, response);


        }
    },
    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params; 
            const students = await prisma.alunos.findUnique({ 
                where: { 
                    id: +id 
                },
            });
            return response.status(200).json(students) 
        } catch (e) {
            return handleErrors(e, response);

            }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const students = await prisma.alunos.delete({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(students);

        } catch (e) {
            return handleErrors(e, response);

        }

    },
    matricular: async (request: Request, response: Response) => {
    try {
        const { alunoId, cursosIds } = request.body;

        const matricula = await prisma.alunos.update({
            where: { id: alunoId },
            data: {
                cursos: {
                    create: cursosIds.map((cursoId: number) => ({
                        cursos: {
                            connect: { id: cursoId }
                        }
                    }))
                }
            },
            include: {
                cursos: {
                    include: {
                        cursos: true
                    }
                }
            }
        });

        return response.status(200).json(matricula);
    } catch (e) {
        return handleErrors(e, response);}
}
,


desmatricular: async (request: Request, response: Response) => {
    try {
        const { alunoId, cursosIds } = request.body;

        const resultado = await prisma.alunosCursos.deleteMany({
            where: {
                alunosId: alunoId,
                cursosId: {
                    in: cursosIds
                }
            }
        });

        return response.status(200).json({
            message: "Matrículas removidas com sucesso",
            removidos: resultado.count
        });
    } catch (e) {
    return handleErrors(e, response);
    }
}
}