require('dotenv').config(); 
const { app, connectDB } = require('./index');

const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Order Service running on port ${port}`);
  });
});
