
const router = require("express").Router();
const cknController = require("../controller/cknController")

router.get("/getCknItems", cknController.getCknItems);
router.get("/getCknItemsById", cknController.getCknItemsById);
router.get("/getCknItemsByDate", cknController.getCknItemsByDate);
router.get("/getCknItemsByDateAndStatus", cknController.getCknItemsByDateAndStatus);
router.post("/setCknItems", cknController.setCknItems);
router.put("/updateCknItems", cknController.updateCknItems);

module.exports = router;
