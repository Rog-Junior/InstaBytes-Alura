import express from 'express';
import routes from './src/routes/postRoutes.js';

const app = express();
 
const porta = 3000;

app.use(express.static("uploads")); // esta linha permite que o servidor acesse os arquivos da pasta uploads (sem emitir um app.get(...))

routes(app);

app.listen(porta, () => {
    console.log("Servidor escutando na porta " + porta + "... localhost:3000");
});

