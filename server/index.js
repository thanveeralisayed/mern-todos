import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './route/todos.js';

const mongodb = `mongodb+srv://thanveer:aishu123@cluster0.yluhn.mongodb.net/
Todo-database?retryWrites=true&w=majority`;

const app = express();
dotenv.config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/todos',todoRoutes);

app.get('/', (req, res) => {
    res.send('welcome to server');
})

const PORT = process.env.PORT || 3001;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`server is running on port ${PORT}`);
    app.listen(PORT);
}).catch(err => {
    console.log(err);
});