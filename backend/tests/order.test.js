const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const axios=require("axios")
const mongoose = require("mongoose");
const {
  placeOrder,
  updateStatus,
  userOrders,
  listOrders,
} = require("../Order-service/Controllers/orderController");
const User = require("../user-service/Models/User");
const Item = require("../food-service/Models/FoodSchema");
const stripe = require("stripe")("fake-key");
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

const orderModel = require("../Order-service/Models/orderModel");

describe("ORDER CONTROLLER - Unit Tests", () => {
  afterEach(() => sinon.restore());

  it("should create an order and return session url", async () => {
  
      const userId = new mongoose.Types.ObjectId();
      const itemId = new mongoose.Types.ObjectId();

      const req = {
        body: {
          userId: userId.toString(),
          items: [
            {
              _id: itemId.toString(),
              name: "Pizza",
              price: 10.0,
              quantity: 2,
            },
          ],
          amount: 20.0,
        },
      }; 
      const order={
        userId: userId.toString(),
        items: [
          {
            _id: itemId.toString(),
            name: "Pizza",
            price: 10.0,
            quantity: 2,
          },
        ],
        amount: 20.0,
      }

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      // Stubs
     
      sinon
        .stub(orderModel.prototype, "save")
        .resolves(order);
      sinon
        .stub(stripe.checkout.sessions, "create")
        .resolves({ url: "mockSessionUrl" });
      try {
        await placeOrder(req, res);
      } catch (error) {
        console.error("Test error:", error);
      }
      expect(res.status.calledWith(200)).to.be.true;
      expect (res.json.calledWithMatch({ success: true, session_url: "mockSessionUrl" }))
  });


    it("should return a list of orders with status 200", async () => {
      const id_1=new mongoose.Types.ObjectId;
      const id_2=new mongoose.Types.ObjectId;
      const id=new mongoose.Types.ObjectId;
      const iditem=new mongoose.Types.ObjectId;
    
        const req = {params:{userId:id.toString()}};
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
     
        const itemObj={
          item: iditem.toString(),
        
        }
        const foodData={
          _id: iditem.toString(),
          name: "Pizza",
          price: 12.5,
          description: "Vegetarian pizza",
          category: "Pizza",
          image:"pizza.png"
        
        }
        
        const orders=[
          { _id: id_1.toString(),
            userId:id.toString(),
            items:[
              {item: 
                {item:
                  iditem.toString()
                }
              },
            ]
           }
        ]
        const findStub=sinon
          .stub(orderModel, "find")
          .resolves(orders);
        const axiosStub=sinon.stub(axios,"get");
      
        axiosStub
        .withArgs(`http://localhost:4000/food/food/Food/${itemObj.item}`)
        .resolves({data:foodData})
      
     
        await userOrders(req, res);
        expect(findStub.calledWith({userId:id.toString()})).to.be.true;
        expect(axiosStub.calledOnce).to.be.true;
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(
          res.json.calledWithMatch(sinon.match.has("success", true))
        ).to.be.true;
     findStub.restore()
    });
 

 
    it("should return user-specific orders with 200", 
      async () => {
   
        const id = new mongoose.Types.ObjectId();
        const itemId = new mongoose.Types.ObjectId();
        const orderId = new mongoose.Types.ObjectId();
        const req = { params: { userId: id.toString() } };

      
        const foodData={
          _id: itemId.toString(),
          name: "Pizza",
          price: 12.5,
          description: "Vegetarian pizza",
          category: "Pizza",
          image:"pizza.png"
        
        }

        const userData={
          _id:id.toString(),
          email: "test22@example.com",
          password: "password",
          fullname: "Test User",
          phone: "123456789",
          address: "123 Test Street",
          city: "Test City"
        }
        const orders=[
          { _id: orderId.toString(),
            userId:id.toString(),
            items:[
              {item: 
                {item:
                  itemId.toString()
                }
              },
            ]
           }
        ]

        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
         sinon.stub(orderModel, "find").resolves(orders);
        const axiosStub=sinon.stub(axios,"get");
         axiosStub
        .withArgs(`http://localhost:4000/user/user/getuser/${id.toString()}`)
        .resolves({data:userData});
        axiosStub
        .withArgs(`http://localhost:4000/food/food/Food/${itemId.toString()}`)
        .resolves({data:foodData})
      
        
        await listOrders(req, res);
        expect(axiosStub.calledTwice).to.be.true;
    
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWithMatch(sinon.match.has("success", true))).to.be
          .true;
      
    });
 

  describe("updateStatus()", () => {
    it("should update order status", async () => {
      try {
        const mockOrderId = new mongoose.Types.ObjectId();

        const req = {
          body: {
            orderId: mockOrderId.toString(),
            newStatus: "Pending",
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };

        const updatedOrder = {
          orderId: mockOrderId.toString(),
          status: "Cancelled",
        };

        const findStub = sinon
          .stub(orderModel, "findByIdAndUpdate")
          .resolves(updatedOrder);

        await updateStatus(req, res);

        expect(
          findStub.calledWith(mockOrderId.toString(), { newStatus: "Pending" })
        );
        expect(res.status.calledWith(200)).to.be.true;
        expect(
          res.json.calledWithMatch({ success: true, message: "Status updated" })
        ).to.be.true;
      } catch (err) {
        console.error("Test failed with error:", err);
        throw err; // pour que le test échoue quand même
      }
    });
  });
});
