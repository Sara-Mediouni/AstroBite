const chai = require('chai');
const userModel = require('../user-service/Models/User');
const { registerUser, loginUser, getUser, updateUser,createToken } = require('../user-service/Controllers/UserController');
const sinon=require('sinon')
const jwt = require("jsonwebtoken");
const { default: mongoose } = require('mongoose');
const expect = chai.expect;
const JWT_SECRET="mmsùs*"






describe('USER ROUTES', function () {
  // Connexion à la base avant tous les tests
  afterEach(() => {
    sinon.restore(); // restaure tous les stubs/spies/mocks
  });

  it('should return 201 if user is created', async () => {
    const fakeId="fake-id"
    // Mock request
    const req = {
      body: {
        email: "test22@example.com",
        password: "password",
        fullname: "Test User",
        phone: "123456789",
        address: "123 Test Street",
        city: "Test City"
      }
    };
  
    // Mock response
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  
    // Stub dependencies
    const findOneStub = sinon.stub(userModel, 'findOne').resolves(null); 
    const saveStub = sinon.stub(userModel.prototype, 'save').resolves(fakeId);
    const token=await createToken(fakeId);
    // Appel du contrôleur
    await registerUser(req, res); // ← appelle ta fonction ici
  

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWithMatch(sinon.match.has("token").and(sinon.match.has("success", true)))).to.be.true;
    // Restore
    findOneStub.restore();
    saveStub.restore();
   
  });
  
  it('should return 400 if user already exists', async () => {
    const req = {
      body: {
        email: "test22@example.com", // même email qu’un déjà enregistré
        password: "password",
        fullname: "Existing User",
        phone: "123456789",
        address: "123 Test Street",
        city: "Test City"
      }
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  
    // Stubbing de la méthode findOne pour simuler un utilisateur déjà existant
    sinon.stub(userModel, 'findOne').resolves({ email: "test22@example.com" });
  
    await registerUser(req, res);
  
    // Vérification que le code de statut 400 a été renvoyé
    expect(res.status.calledWith(400)).to.be.true;
  
    // Vérification que la réponse json contient un message d'erreur correct
    expect(res.json.calledWithMatch({ success: false, message: "User already exists" })).to.be.true;
  
    // Restauration de la méthode findOne après le test pour éviter les conflits
    userModel.findOne.restore();
  });
  

  it('should return 400 if credentials are invalid', async () => {
    const req = {
      body: {
        email: "test22@example.com",
        password: "wrongpassword"
      }
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  
    // Stub de findOne pour renvoyer un utilisateur existant
    sinon.stub(userModel, 'findOne').resolves({ email: "test22@example.com", password: "password" });
  
    await loginUser(req, res);
  
    // Vérification des assertions
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: 'Invalid credentials' })).to.be.true;
  
    userModel.findOne.restore(); // Restauration de la méthode après le test
  });
  
  
  it('should return 404 if user not found', async () => {
    const req = { params: { id: "nonexistent-id" } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  
    // Stub de findById pour simuler un utilisateur non trouvé
    sinon.stub(userModel, 'findById').resolves(null);
  
    await getUser(req, res);
  
    // Vérification des assertions
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: 'User not found' })).to.be.true;
  
    userModel.findById.restore(); // Restauration de la méthode après le test
  });
  it('should return 400 if password is invalid', async () => {
    const req = {
      body: {
        email: "abc@gmail.com",  
        password: "short",       // Mot de passe trop court
        fullname: "Test User",
        phone: "123456789",
        address: "123 Test Street",
        city: "Test City"
      }
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    sinon.stub(userModel,'findOne').resolves(null)
    await registerUser(req, res);
    
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: "Please enter a strong password" })).to.be.true;
  });
  it('should return 200 and user data if user is found by ID', async () => {
    it('should return 200 if user data is updated', async () => {
      const validUserId = new mongoose.Types.ObjectId();
      const req = {
        params: { id: validUserId.toString() },
        body: { email: "newemail@example.com" }
      };
    
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub()
      };
    
      // Stub avec un utilisateur "mis à jour"
      const updatedUser = {
        _id: validUserId.toString(),
        email: "newemail@example.com",
        fullname: "Test User",
        phone: "123456789",
        address: "123 Test Street",
        city: "Test City"
      };
    
      const findByIdAndUpdateStub = sinon.stub(userModel, 'findByIdAndUpdate').resolves(updatedUser);
    
      await updateUser(req, res);
    
      expect(findByIdAndUpdateStub.calledWith(validUserId.toString(), { email: "newemail@example.com" })).to.be.true;
    
      console.log("res.json args:", res.json.firstCall.args);
    
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch(sinon.match.has("success", true))).to.be.true;
    
      findByIdAndUpdateStub.restore();
    });
    
  });
  it('should return 400 if login credentials are incorrect', async () => {
    const req = {
      body: {
        email: "test22@example.com",
        password: "wrongpassword"
      }
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
  
    // Stub de findOne pour renvoyer un utilisateur avec un mot de passe incorrect
    sinon.stub(userModel, 'findOne').resolves({ email: "test22@example.com", password: "password" });
  
    await loginUser(req, res);
  
    // Vérification du statut 400 et du message d'erreur
    expect(res.status.calledWith(400)).to.be.true;
    expect(res.json.calledWithMatch({ success: false, message: 'Invalid credentials' })).to.be.true;
  
    userModel.findOne.restore(); // Restauration après le test
  });
  


});
  


