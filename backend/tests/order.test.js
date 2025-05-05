const request = require('supertest');
const {app, connectDB} = require('../user-service/index');
const chai = require('chai');
const { default: mongoose } = require('mongoose');

const expect = chai.expect;

let createdOrderId = null;

describe('ORDER ROUTES', function () {
  // Connexion à la base avant tous les tests
  before(async () => {
    await connectDB();
  });

  // Fermeture propre après tous les tests
  after(async () => {
    await mongoose.connection.close();
  })

  it('POST /order/place - should create a new order', async () => {
    const body = {
        userId: "6815bfb32e66b12f423e50a3",
      items: [
        {item: "6815c8b22e66b12f423e50b7",
        quantity: "2"},
       ],
      amount:"22.98",
  
    };
    console.log(body);
    const res = await request(app)
      .post('/order/place')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200); 
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('session_url');
  });


})
