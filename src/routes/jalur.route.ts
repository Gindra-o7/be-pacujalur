import { Router } from "express";
import JalurHandler from "../handlers/jalur.handler";

const jalurRouter = Router();

jalurRouter.get("/jalur", JalurHandler.get);
jalurRouter.post("/jalur", JalurHandler.post);

export default jalurRouter;
