require('dotenv').config();
const express = require('express');

const schemaRoutes = require('../routes/schemaRoutes');
const figmaRoutes = require('../routes/figmaRoutes');
const migrationRoutes = require('../routes/migrationRoutes.js');

const app = express();
app.use(express.json());

app.use('/api/schemas', schemaRoutes);
app.use('/api/figma', figmaRoutes);
app.use('/api/migrations', migrationRoutes);

app.get("/api/test" , async(req , res) => {
  res.status(200).json({
    status:200,
    msg:"This endpoint ensures the app is running"
  })
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
