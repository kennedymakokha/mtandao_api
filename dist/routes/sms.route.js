"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const smsendpoint_controller_1 = require("../controllers/smsendpoint.controller");
const router = (0, express_1.Router)();
router.post("/", smsendpoint_controller_1.sendSms);
exports.default = router;
