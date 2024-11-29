import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js"; //no node js é obrigatório inserir o .js na indicação do diretório // importando a função de conectar

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPosts(){
    const db = conexao.db("projGemini"); // você irá declarar a função ja pronta e chamar a função db("insira aqui o nome do database");
    const colecao = db.collection("Posts"); // Ja foi pego o Database, agora dentro desse DB, temos a função collection("Insira aqui o nome da collection").
    return colecao.find().toArray();
}

export async function criarPost(novoPost){
    const db = conexao.db("projGemini"); // você irá declarar a função ja pronta e chamar a função db("insira aqui o nome do database");
    const colecao = db.collection("Posts"); // Ja foi pego o Database, agora dentro desse DB, temos a função collection("Insira aqui o nome da collection").
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("projGemini");
    const colecao = db.collection("Posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}) ;
}