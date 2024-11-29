import { GoogleGenerativeAI } from "@google/generative-ai";

// Importa a biblioteca necessária para interagir com os modelos de IA generativa do Google.
// A classe GoogleGenerativeAI fornece as ferramentas para fazer requisições à API do Google e obter respostas.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Cria uma nova instância do cliente GoogleGenerativeAI.
// O parâmetro process.env.GEMINI_API_KEY é a chave de API do seu projeto Google Cloud,
// necessária para autenticar suas requisições.

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Carrega o modelo de linguagem "gemini-1.5-flash". 
// Este modelo é capaz de gerar texto a partir de diversas entradas, incluindo imagens.

export async function gerarDescricaoComGemini(imageBuffer) {
  // Função principal que gera uma descrição para uma imagem dada.
  // Recebe como parâmetro um buffer de imagem.

  const prompt = "Gere uma descrição em português do brasil para a seguinte imagem, somente a descrição em no maximo 10 palavras e não quero uma introdução dizendo 'Aqui está uma descrição para a imagem:'";
  // Define o prompt que será enviado ao modelo. 
  // O prompt instrui o modelo a gerar uma descrição em português brasileiro.

  try {
    // Bloco try...catch para tratar possíveis erros durante a execução.

    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para uma string base64.
        mimeType: "image/png", // Define o tipo MIME da imagem (neste caso, PNG).
      },
    };
    // Cria um objeto que representa a imagem, incluindo os dados da imagem em base64 e o tipo MIME.

    const res = await model.generateContent([prompt, image]);
    // Envia o prompt e a imagem para o modelo e aguarda a resposta.
    // A função generateContent gera o texto desejado.

    return res.response.text() || "Alt-text não disponível.";
    // Retorna o texto gerado pelo modelo como a descrição da imagem.
    // Se ocorrer algum erro, retorna uma mensagem padrão.
  } catch (erro) {
    // Bloco catch para tratar os erros.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    // Imprime uma mensagem de erro no console, incluindo a mensagem de erro original.
    throw new Error("Erro ao obter o alt-text do Gemini.");
    // Lança um novo erro para indicar que ocorreu um problema durante a geração da descrição.
  }
}

export async function gerarAltComGemini(imageBuffer) {
  // Função principal que gera uma descrição para uma imagem dada.
  // Recebe como parâmetro um buffer de imagem.

  const prompt = "Gere uma descrição alternativa para pessoas que utilizam 'facilidades' em português do brasil para a seguinte imagem, somente a descrição em no maximo 20 palavras e não quero uma introdução dizendo 'Aqui está uma descrição para a imagem:'";
  // Define o prompt que será enviado ao modelo. 
  // O prompt instrui o modelo a gerar uma descrição em português brasileiro.

  try {
    // Bloco try...catch para tratar possíveis erros durante a execução.

    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para uma string base64.
        mimeType: "image/png", // Define o tipo MIME da imagem (neste caso, PNG).
      },
    };
    // Cria um objeto que representa a imagem, incluindo os dados da imagem em base64 e o tipo MIME.

    const res = await model.generateContent([prompt, image]);
    // Envia o prompt e a imagem para o modelo e aguarda a resposta.
    // A função generateContent gera o texto desejado.

    return res.response.text() || "Alt-text não disponível.";
    // Retorna o texto gerado pelo modelo como a descrição da imagem.
    // Se ocorrer algum erro, retorna uma mensagem padrão.
  } catch (erro) {
    // Bloco catch para tratar os erros.
    console.error("Erro ao obter alt-text:", erro.message, erro);
    // Imprime uma mensagem de erro no console, incluindo a mensagem de erro original.
    throw new Error("Erro ao obter o alt-text do Gemini.");
    // Lança um novo erro para indicar que ocorreu um problema durante a geração da descrição.
  }
}