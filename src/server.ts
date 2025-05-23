import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from './config/socket'
import { connectDB } from "./config/db";
import stkRoutes from './routes/stk.routes'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category,routes'
import messageRoute from './routes/message.route'
import businessRoute from './routes/business.routes'
import productRoute from './routes/product.routes'
import townsRoute from './routes/towns.routes'
import smsRoute from './routes/sms.route'
import { authenticateToken } from "./middleware/auth.middleware";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { User } from "./models/user.model";
import cors from 'cors'
import { swaggerSpec, swaggerUi } from "./config/swaggerConfig";
import path from "path";
// dotenv.config();
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://marapesa.com", "https://spingofrontend.vercel.app", "https://api.marapesa.com"] }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// const PORT = process.env.PORT || 5000;
const PORT = Number(process.env.PORT);

connectDB();

const httpServer = createServer(app);
const io: any = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "https://spingofrontend.vercel.app", "https://marapesa.com", "http://185.113.249.137:3000", "https://api.marapesa.com"],
    methods: ["GET", "POST"],
    credentials: true, // Allow credentials like cookies
    allowedHeaders: "Content-Type,Authorization", // Allow headers
  },
});

app.use("/api/auth", authRoutes);
app.use("/api/stk", stkRoutes);
app.use("/api/business", authenticateToken, businessRoute);
app.use("/api/messages", authenticateToken, messageRoute);
app.use("/api/sms", smsRoute);
app.use("/api/products", authenticateToken, productRoute);
app.use("/api/categories", authenticateToken, categoryRoutes);
app.use("/api/towns", authenticateToken, townsRoute);

app.get("/api/authenticated", authenticateToken, async (req: any, res) => {
  let authuser = await User.findById(req.user.userId)
  res.json(authuser);
});
app.get("/api/protected", authenticateToken, (req: any, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
app.get("/", (req, res) => {
  res.send("WebSocket Server is running!");
  return
});

// app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
httpServer.listen(PORT, () => {
  console.log(`Swagger docs at http://localhost:${PORT}`);

});

console.log("PORT:", process.env.PORT);

setupSocket(io);
