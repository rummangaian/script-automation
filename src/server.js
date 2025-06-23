require('dotenv').config();
const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../utils/swaggerDocument.json')

const schemaRoutes = require('../routes/schemaRoutes');
const figmaRoutes = require('../routes/figmaRoutes');
const migrationRoutes = require('../routes/migrationRoutes.js');
const tranformBqRoutes = require('../routes/transformBQRoutes.js')

const serverConfig = require('../config/serverConfig.js')

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server)

app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(swaggerDocument))
app.use('/api/schemas', schemaRoutes);
app.use('/api/figma', figmaRoutes);
app.use('/api/migrations', migrationRoutes);
app.use('/api/transform-bq' , tranformBqRoutes)


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
