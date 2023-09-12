import express, { Request, Response } from 'express'
import cors from 'cors'
import { TCourse, TStudent } from './types'
import { courses, students } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/courses', (req: Request, res: Response) => {
    const result: TCourse[] = courses

    res.status(200).send(result)
})

app.get('/courses/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    const coursesByName: TCourse[] = courses.filter(course => course.name.toLowerCase() === query.toLowerCase())

    res.status(200).send(coursesByName)
})

app.post('/courses', (req: Request, res: Response) => {
    // const id: string = req.body.id
    // const name: string = req.body.name
    // const lessons: number = req.body.lessons
    // const stack: string = req.body.stack

    const { id, name, lessons, stack }: TCourse = req.body

    const newCourse: TCourse = {
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send('Curso cadastrado com sucesso!')
})

app.get('/students', (req: Request, res: Response) => {
    const result: TStudent[] = students
    res.status(200).send(result)
})

app.get('/students/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    const studentByName: TStudent[] = students.filter(student => student.name.toLowerCase() === query.toLowerCase())
    res.status(200).send(studentByName)
})

app.post('/students', (req: Request, res: Response) => {
    const { id, name, age }: TStudent = req.body

    const newStudent: TStudent = {
        id,
        name,
        age
    }

    students.push(newStudent)

    res.status(201).send('Aluno cadastrado com sucesso!')
})