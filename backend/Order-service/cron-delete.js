const cron = require("node-cron");
const OrderModel = require("./Models/orderModel"); 

// Toutes les heures
cron.schedule("0 * * * *", async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  try {
    const result = await OrderModel.deleteMany({
      Payment: false,
      Date: { $lt: oneHourAgo },
    });

    console.log(`${result.deletedCount} commandes non payées supprimées`);
  } catch (error) {
    console.error("Erreur lors du nettoyage des commandes :", error);
  }
});
