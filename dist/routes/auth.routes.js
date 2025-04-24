"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/register:
 *   get:
 *     summary: register  a new user
 *     responses:
 *       200:
 *         description: register User
 */
router.post("/register", auth_controller_1.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: login user
 *     responses:
 *       200:
 *         description: login User
 */
router.post("/login", auth_controller_1.login);
/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: return authenticated User
 *     responses:
 *       200:
 *         description: return logged in user
 */
router.get("/", auth_controller_1.session_Check);
router.post("/refresh", auth_controller_1.refresh);
router.post("/reset-password", auth_controller_1.updatePassword);
/**
 * @swagger
 * /api/auth/reset-password:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A user object
 *       404:
 *         description: User not found
 */
router.post("/activate-user", auth_controller_1.activateuser);
router.post("/verify-otp", auth_controller_1.verifyuser);
router.post("/request-otp", auth_controller_1.requestToken);
router.post("/logout", auth_controller_1.logout);
// admin
router.post("/admin-register", auth_controller_1.registerAdmin);
router.post("/admin-login", auth_controller_1.admin_login);
router.get("/admin/users", auth_controller_1.get_Users);
router.get("/admin/users/admins", auth_controller_1.get_Admins);
exports.default = router;
