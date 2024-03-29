const {
  addToCart,
  getCart,
  removeProductFromCart,
  completeOrder,
  placeOrder,
  getOrders,
  decrementProductQuantity,
} = require("../controllers/orderController");

const requireAuth = require("../middleware/requireAuth");
const router = require("express").Router();

// router.use(requireAuth);

router.post("/", addToCart);
router.get("/cart/:user", getCart);
router.get("/", getOrders);
router.get("/:user", getOrders);
router.delete("/:orderId/:productId", removeProductFromCart);
router.put("/complete/:orderId", completeOrder);
router.put("/place/:orderId", placeOrder);
router.put("/cart", decrementProductQuantity);

module.exports = router;
