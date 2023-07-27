const {
  getOrder,
  getPendingorders,
  getUserorder,
  order,
  deliverOrder,
} = require("../controllers/orderController");

const router = require("express").Router();

router.get("/", getOrder);
router.get("/pending", getPendingorders);
router.get("/:user", getUserorder);
router.post("/", order);
router.post("/deliver/:id", deliverOrder);

router.module.exports = router;