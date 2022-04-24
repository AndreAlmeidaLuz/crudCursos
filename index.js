const express = require('express')

const server = express()

server.use(express.json())

//array para adicionar cursos
const courses = []

//retornar um curso especifico
server.get('/cursos/:index', (request, response) => {
	const { index } = request.params

	return response.json(courses[index])
})

//retornar todos os cursos
server.get('/cursos', (request, response) => {
	return response.json(courses)
})

//cadastrar novo curso
server.post('/create', (request, response) => {
	const { name } = request.body

	const courseAlreadyExists = courses.find((course) => course.name == name)
	if (courseAlreadyExists) {
		return response
			.status(400)
			.json({ error: 'Name of course already exists' })
	}

	const newCourse = {
		name,
	}

	courses.push(newCourse)

	return response.status(201).json(newCourse)
})

//atualizar um curso
server.put('/update/:index', (request, response) => {
	const { index } = request.params
	const { name } = request.body

	courses[index] = name

	return response.status(201).json(courses[index])
})

//deletar um curso
server.delete('/delete/:index', (request, response) => {
	const { index } = request.params

	courses.splice(index, 1)

	return response
		.status(201)
		.json({ message: 'the course has been deleted ' })
})

server.listen(3000)
