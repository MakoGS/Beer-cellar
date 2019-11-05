"use strict";

const { Router } = require("express");
const router = Router();

const auth = require("./../controllers/auth-controller");

router.post("/signup", auth.signUp);
router.post("/signin", auth.signIn);
router.post("/signout", auth.signOut);
router.get("/verify", auth.verify);
router.get("/profile/:username", auth.loadUser);
module.exports = router;
