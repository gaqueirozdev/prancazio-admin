import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	/*
    useGlobalPipes
    pipes são usados para validar dados, transformar dados, filtrar ou modificar requisições
    useGlobalPipes() aplica esses pipes globalmente, ou seja: para todas as requisições da API.

    ValidationPipe
    é um pipe do nest que faz validações automáticas com class-validator (decorator), rejeita requisições malformadas e
    converte automaticamente os tipos

    whitelist: true -> faz com que os dados que não são esperados pelo DTO sejam removidos da requisição
    Exemplo: DTO -> { name: string } e recebemos { name: 'Guilherme', role: 'Dev' }
    o 'role' será ignorado pelo ValidationPipe, poupando trabalho e aumentando segurança

    transform: true -> faz a transformação do tipo do dado para o tipo esperado pelo DTO
    Exemplo: DTO -> { id: number } e recebemos /users?id=5 isso será uma string, portanto o transform
    faz com que o id seja automaticamente transformado
  */
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
	await app.listen(3000)
}
bootstrap()
