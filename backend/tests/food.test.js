const sinon = require("sinon");
const { expect } = require("chai");
const mongoose = require("mongoose");
const Food = require("../food-service/Models/FoodSchema");  // Ton modèle Food
const { addfood,
   deletefood,
   updatefood,
   getAllfoods,
   filterfood,
   
   getAllCategories,
  
   getfood}= require ('../food-service/Controllers/FoodController');

describe("Food Controller Tests", function () {

 afterEach(() => {
    sinon.restore(); // restaure tous les stubs/spies/mocks
  });



  it("should create a food item and returns 201", async () => {
    const req={
      body:{
       
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      
    
      },
      file:{filename:"pizza.png"}
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
    const id=new mongoose.Types.ObjectId;
    const newFood={
      _id: id.toString(),
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"
    }
  sinon.stub(Food, 'find').resolves(null);
  sinon.stub(Food.prototype, 'save').resolves(newFood);
  await addfood(req,res);
  
   expect(res.status.calledWith(201)).to.be.true;
   expect(res.json.calledWithMatch({success:true,newFood}))
  });
  it("should create a food item and returns 400 because the food exists", async () => {
    const req={
      body:{
       
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      
    
      },
      file:{filename:"pizza.png"}
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
    const id=new mongoose.Types.ObjectId;
    const newFood={
      _id: id.toString(),
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"
    }
  sinon.stub(Food, 'find').resolves(newFood);
  
  await addfood(req,res);
  
   expect(res.status.calledWith(400)).to.be.true;
   expect(res.json.calledWithMatch({success:false,message:"Food already exists"}))
  });
  it("should delete a food item and returns 200", async () => {
    const idToDelete=new mongoose.Types.ObjectId();
    const req={
      params:{id:idToDelete.toString()}
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
   
    const FoodToDelete={
      _id: idToDelete.toString(),
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"
    }
    const findByIdAndDelete=sinon.stub(Food, 'findByIdAndDelete').resolves(FoodToDelete);
  
  await deletefood(req,res);
   expect(findByIdAndDelete.calledWith(idToDelete.toString())).to.be.true;
   expect(res.status.calledWith(200)).to.be.true;
   expect(res.json.calledWithMatch({ success:true,message: 'supprimé avec succès' }))
  });
  it("should delete a food item and returns 404 doesn't exist", async () => {
    const idToDelete=new mongoose.Types.ObjectId();
    const req={
      params:{id:idToDelete.toString()}
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
   
   
    const findByIdAndDelete=sinon.stub(Food, 'findByIdAndDelete').resolves(null);
  
  await deletefood(req,res);
   
   expect(res.status.calledWith(404)).to.be.true;
   expect(res.json.calledWithMatch({ message: 'Plat non trouvé' }))
  });
  it("should update a food item and returns 200", async () => {
    const idToUpdate=new mongoose.Types.ObjectId();
    const req={
      params:{id:idToUpdate.toString()},
      body:{
       name:"Pizza"
      }
    }
    const updatedFood={
      _id: idToUpdate.toString(),
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"
    }
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
   
   
    const findByIdAndUpdate=sinon.stub(Food, 'findByIdAndUpdate').resolves(updatedFood);
  
  await updatefood(req,res);
   expect(findByIdAndUpdate.calledWith(idToUpdate.toString(),{name:"Pizza"})).to.be.true;
   expect(res.status.calledWith(200)).to.be.true;
   expect(res.json.calledWithMatch({ message: ' mis à jour avec succès', food: updatedFood }))
  });
  it("should update a food item and returns 404 because it doesn't exist", async () => {
    const idToUpdate=new mongoose.Types.ObjectId();
    const req={
      params:{id:idToUpdate.toString()},
      body:{
       name:"Pizza"
      }
    }
   
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()

    }
   
   
    sinon.stub(Food, 'findByIdAndUpdate').resolves(null);
  
  await updatefood(req,res);

   expect(res.status.calledWith(404)).to.be.true;
   expect(res.json.calledWithMatch({ message: 'Plat non trouvé' }))
  });
  it("fetch all food and return 200",async()=>{
    const req={}
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const foodList={
      _id: new mongoose.Types.ObjectId().toString()
    }
    sinon.stub(Food,'find').resolves(foodList)
    await getAllfoods(req,res);
    expect(res.status.calledWith(200))
    expect(res.json.calledWithMatch({success:true,foods:foodList})).to.be.true;
    Food.find.restore();
  })
  it("filter food by category and returns 200",async()=>{
    const req=
    {params:{
      category:"pizza"
    }}
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const List=
    [{
      _id: "id food_1",
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"}
    ]

    const findStub=sinon.stub(Food, 'find').resolves(List)
    await filterfood(req,res);
    expect(findStub.calledWith({category:"pizza"})).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({success:true,foods:List})).to.be.true;
    findStub.restore();
  })
  it ("Returns all categories with status 200",async()=>{
    const req={}
    const res={
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
    }
    const foodList = [
      { category: "Pizza" },
      { category: "Tacos" },
      { category: "Pizza" },
      { category: "Soda" }
    ];
    const ListCategories=[
      "Pizza", "Tacos", "Soda"
    ]
    sinon.stub(Food,'find').resolves(foodList);
    await getAllCategories(req,res)
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({success:true, uniqueCategories:ListCategories })).to.be.true;
    Food.find.restore();
    

  })
  it ("Returns food by id with status 200",async()=>{
    const id=new mongoose.Types.ObjectId
    const req={
      params:{
        id: id.toString()
      }
    }
    const FoodToSend={
      _id: id.toString(),
      name: "Pizza",
      price: 12.5,
      description: "Vegetarian pizza",
      category: "Pizza",
      image:"pizza.png"
    }
    const res=
    { 
      status:sinon.stub().returnsThis(),
      json:sinon.stub()
 
    }
    const findbyid=sinon.stub(Food,'findById').resolves(FoodToSend)
    await getfood(req,res)
    expect (findbyid.calledWith(id.toString())).to.be.true;
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWithMatch({success:true,food:FoodToSend})).to.be.true;
  })
});
