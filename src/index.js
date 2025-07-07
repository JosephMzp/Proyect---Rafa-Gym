import "dotenv/config";
import app from './app.js';
import { connectDB } from "./db.js"

app.get('/', (req, res) => {
  res.send('✅ API Rafa Gym está online');
});

connectDB();
app.listen(3000)
console.log('server on port', 3000)