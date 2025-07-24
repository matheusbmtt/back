import express, {Response, Request, NextFunction, Application} from 'express';

const app: Application = express()
const PORT = 5000
app.use(express.json())

const timeLogger = (req: Request, res: Response, next: NextFunction) => {
    const now = new Date()
    console.log("Requisição feita em: ", now)
    if(now.getHours() < 6) {
        next()
    }
    res.status(403).json({ message: "Requisições não permitidas nesse horário"})
}
app.use(timeLogger)



app.get('/sobre', (req: Request, res : Response): Response => {
    return res.status(200).json({
        nome : "Matheus",
        idade: 20,
        descricao : "Um jovem sonhador querendo ficar rico sem trabalhar"
    })
})

app.post('/comentarios', (req: Request, res : Response): Response =>{
    const { texto } = req.body
    
    if (!texto) {
        return res.status(400).json({ message: "Campo texto é obrigatório"})
    }

    return res.status(201).json(req.body)
})

app.delete('/comentarios/:id', (req: Request, res : Response): Response =>{
    const  id  = Number(req.params.id)
    
    if (!id) {
        return res.status(400).json({ message: "ID não foi informado corretamente"})
    }

    return res.status(204).send()
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})
