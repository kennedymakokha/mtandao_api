"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../controllers/message.controller");
const router = (0, express_1.Router)();
router.get("/", message_controller_1.get_single_conversation);
// router.get("/all_bets", get_all_bets);
exports.default = router;
