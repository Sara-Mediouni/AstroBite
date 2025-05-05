

const request = require('supertest');
const {app, connectDB} = require('../user-service/index');
const chai = require('chai');
const { default: mongoose } = require('mongoose');

const expect = chai.expect;

{/*
    userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getuser/:id', getUser)
userRouter.put('/updateuser/:id', updateUser)
userRouter.delete('/deleteuser', deleteUser)
userRouter.get('/getallusers', getAllUsers)
*/ }




let createdUserId = null;

describe('USER ROUTES', function () {
  // Connexion à la base avant tous les tests
  before(async () => {
    await connectDB();
  });

  // Fermeture propre après tous les tests
  after(async () => {
    await mongoose.connection.close();
  });

  it('POST /user/register - should create a new user', async () => {
    const body = {
      email: "test22@example.com",
      password: "password",
      fullname: "Test User",
      phone: "123456789",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country"
    };

    const res = await request(app)
      .post('/user/register')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(201); 
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('token');
  });
  it('should return 400 if user already exists', async () => {
    const body = {
      email: "test22@example.com", // même email qu’un déjà enregistré
      password: "password",
      fullname: "Existing User",
      phone: "123456789",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country"
    };

    const res = await request(app)
      .post('/user/register')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'User already exists');
  });

  it('should return 400 if email is invalid', async () => {
    const body = {
      email: "invalid-email",
      password: "password",
      fullname: "Bad Email",
      phone: "123456789",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country"
    };

    const res = await request(app)
      .post('/user/register')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'Please enter a valid email');
  });

  it('should return 400 if password is too short', async () => {
    const body = {
      email: "newuser@example.com",
      password: "123", // trop court
      fullname: "Weak Password",
      phone: "123456789",
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country"
    };

    const res = await request(app)
      .post('/user/register')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('success', false);
    expect(res.body).to.have.property('message', 'Please enter a strong password');
  });
  it('POST /user/login - should log in a user', async () => {
    const body = {
      email: "test22@example.com",
      password: "password"
    };

    const res = await request(app)
      .post('/user/login')
      .send(body)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('token');
  });

  it('GET /user/getallusers - should return all users', async () => {
    const res = await request(app)
      .get('/user/getallusers')
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('users').that.is.an('array');

    createdUserId = res.body.users.find(user => user.email === "test22@example.com")?._id;
    expect(createdUserId).to.exist;
  });

  it('GET /user/getuser/:id - should return user by ID', async () => {
    const res = await request(app)
      .get(`/user/getuser/${createdUserId}`)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('user');
  });

  it('PUT /user/updateuser/:id - should update user data', async () => {
    const updatedUser = {
      fullname: "Sarah Updated",
      phone: "25447"
    };

    const res = await request(app)
      .put(`/user/updateuser/${createdUserId}`)
      .send(updatedUser)
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
    expect(res.body).to.have.property('updatedUser');
  });

  it('DELETE /user/deleteuser - should delete the user', async () => {
    
    const res = await request(app)
      .delete(`/user/deleteuser/${createdUserId}`)
     
      .set('Content-Type', 'application/json');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('success', true);
  });
});
  


