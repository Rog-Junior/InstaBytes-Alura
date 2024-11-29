import express from 'express';
import multer from 'multer'
import { listarPosts , envPosts, uploadImagem, atualizarNovoPost } from '../controller/postsController.js';
import posts from './mockPosts.js';
import cors from 'cors'

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
// Configura o armazenamento de arquivos usando o multer
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo, mantendo o nome original
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ storage : storage });

// Define as rotas para a aplicação Express
const routes = (app) => {
    // Habilita o parsing de JSON para requisições
    app.use(cors(corsOptions));
    app.use(express.json());

    // Rota raiz
    app.get("", (req, res) => {
        res.status(200).send("Seja bem vindo à imersão Alura!");
    });
    
    // app.get("/posts", async (req,res) => {
    //     const resultado = await getAllPosts();
    //     res.status(200).json(resultado);
    // })

    app.get("/posts", listarPosts);
    function buscarPost(id){ //aqui estamos fazendo uma função que complementará a linha "/posts/:id" que localizaremos o post de acordo com o id que citarmos
        return posts.findIndex((post) => { // podemos dizer que o array se chama de posts, e cada objeto nele se chama post.
            return post.indice === Number(id); // retornará o "indice" citado dentro do objet, que será o n° escrito como parametro.
        })
    }
    
    app.get("/mock/", (req,res) => { // aqui ele informa qual o index que gostaremos de acessar, podemos inserir qualquer valor  apos o /posts/
        const index = buscarPost(req.params.id); // nesta linha em esnovoPostpecifico criamos uma variável que receberá o id citado apos /posts/, por exemplo localhost:3000/posts/2
        res.status(200).json(posts); // e nesta linha é respondido que o navegador retornará um json contendo expecificamente o objeto citado na variavel posts.
    })
    
    app.get("/mock/:id", (req,res) => { // aqui ele informa qual o index que gostaremos de acessar, podemos inserir qualquer valor  apos o /posts/
        const index = buscarPost(req.params.id); // nesta linha em especifico criamos uma variável que receberá o id citado apos /posts/, por exemplo localhost:3000/posts/2
        res.status(200).json(posts[index]); // e nesta linha é respondido que o navegador retornará um json contendo expecificamente o objeto citado na variavel posts.
    })
    
    // get = receber arquivos
    // post = enviar arquivos
    // put = atualizar

    app.post("/posts", envPosts);
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;