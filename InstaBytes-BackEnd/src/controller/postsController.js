import { url } from "inspector";
import { getAllPosts , atualizarPost, criarPost } from "../models/postModels.js";
import fs from "fs";
import { gerarDescricaoComGemini , gerarAltComGemini} from "../services/serviceGemini.js";
 "../services/serviceGemini.js";

export async function listarPosts(req,res){
    const resultado = await getAllPosts();
    res.status(200).json(resultado);
};

export async function envPosts(req,res){ // esta função retornara um id vazio
    const novoPost = req.body
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"erro" : "Falha na requisição!"});
    }
    
}

export async function uploadImagem(req,res){ // metodo post
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }
    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;  // a o arquivo será renomeado conforme o insertedId do postman
        fs.renameSync(req.file.path , imagemAtualizada);
        res.status(200).json(postCriado);
    }
    catch(erro){ 
        console.error(erro.message);
        res.status(500).json({"erro" : "Falha na requisição!"});
    }
    
}

export async function atualizarNovoPost(req,res){ // Metodo put
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const descricaoAlt = await gerarAltComGemini(imgBuffer);

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: descricaoAlt
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
        }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"erro" : "Falha na requisição!"});
    }
    
}