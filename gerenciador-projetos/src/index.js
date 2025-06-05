import express from "express";
import cors from 'cors';
import premioRoutes from "./routes/premioRoutes.js";
import autorRoutes from "./routes/autorRoutes.js";
import avaliadorRoutes from "./routes/avaliadorRoutes.js";
import projetoRoutes from "./routes/projetoRoutes.js";
import avaliacaoRoutes from "./routes/avaliacaoRoutes.js";
import consultaRoutes from "./routes/consultaRoutes.js";// PersistIencia II
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors()); // Adiciona CORS para o front end poder acessar o back

app.use(express.json());
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});
app.use("/api/premios", premioRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/avaliadores", avaliadorRoutes);
app.use("/api/projetos", projetoRoutes);
app.use("/api/avaliacoes", avaliacaoRoutes);
app.use('/api/consultas', consultaRoutes); // PersistIencia II

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});