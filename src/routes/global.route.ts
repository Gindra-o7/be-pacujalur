import { Router } from "express";
import GlobalHandler from "../handlers/global.handler";

const globalRouter = Router();

globalRouter.get("/", GlobalHandler.introduce);
globalRouter.get("/health", GlobalHandler.health);

export default globalRouter;
