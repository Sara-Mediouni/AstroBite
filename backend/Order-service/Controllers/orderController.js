const orderModel = require("../Models/orderModel.js");
const env = require("dotenv/config");

const Stripe = require("stripe");
const mongoose = require("mongoose");
const { default: axios } = require("axios");
const stripe = new Stripe(process.env.STRIPE_API_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  try {
    const newOrder = new orderModel({
      userId: new mongoose.Types.ObjectId(req.body.userId),
      items: req.body.items.map((item) => ({
        item: new mongoose.Types.ObjectId(item._id),
        quantity: item.quantity,
      })),
      amount: req.body.amount,
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.status(200).json({ success: true, session_url: session.url });
    console.log(newOrder);
    await newOrder.save();
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Processing",
      });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const userOrders = async (req, res) => {
  try {
    const allOrders = await orderModel.find({ userId: req.params.userId });

    const orders = await Promise.all(
      allOrders.map(async (order) => {
        try {
          const items = await Promise.all(
            order.items.map(async (itemObj) => {
              try {
                const itemData = await axios.get(
                  `http://localhost:4000/food/food/Food/${itemObj.item}`
                );
                return {
                  ...itemObj,
                  item: itemData.data,
                };
              } catch (error) {
                console.log(
                  `Error getting item: ${itemObj.item}`,
                  error.message
                );
                return itemObj;
              }
            })
          );

          return {
            ...order._doc,
            items: items,
          };
        } catch (error) {
          console.log(`Error getting order ${order._id}`, error.message);
          return order;
        }
      })
    );

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listOrders = async (req, res) => {
  try {
    const Allorders = await orderModel.find();

    const orders = await Promise.all(
      Allorders.map(async (order) => {
        let userData = null;

        try {
          const userResponse = await axios.get(
            `http://localhost:4000/user/user/getuser/${order.userId}`
          );
          userData = userResponse.data;
        } catch (err) {
          console.error(
            `Erreur récupération user ${order.userId}:`,
            err.message
          );
        }

        const items = await Promise.all(
          order.items.map(async (itemObj) => {
            try {
              const itemResponse = await axios.get(
                `http://localhost:4000/food/food/Food/${itemObj.item}`
              );
              return {
                ...itemObj,
                item: itemResponse.data,
              };
            } catch (err) {
              console.error(
                `Erreur récupération item ${itemObj.item}:`,
                err.message
              );
              return itemObj;
            }
          })
        );

        return {
          ...order._doc,
          user: userData,
          items: items,
        };
      })
    );

    res.status(200).json({ data: orders });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.newStatus,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating status" });
  }
};

module.exports = {
  listOrders,
  placeOrder,
  verifyOrder,
  updateStatus,
  userOrders,
};
