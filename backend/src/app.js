import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import products from "./routes/product.js"

dotenv.config();  

const app = express();


app.use(cors()); 
app.use(bodyParser.json());
app.use('/api',products)
app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS is working!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;