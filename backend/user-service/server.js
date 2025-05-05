require('dotenv').config(); // Charge les variables d'environnement
const { app, connectDB } = require('./index');

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`User Service running on port ${port}`);
  });
});
