"use strict";

const { Router } = require("express");
const router = Router();

const beerController = require("./../controllers/beer-controller");

router.get("/all", beerController.loadAll);
router.post("/create", beerController.create);
router.post("/type/:type", beerController.byType);
router.get("/id/:id", beerController.loadSingle);
router.get("/user/:username", beerController.loadUser);

module.exports = router;
