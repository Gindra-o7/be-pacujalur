import { Router } from "express";
import GaleriHandler from "../handlers/galeri.handler";

const galeriRouter = Router();

galeriRouter.get("/galeri", GaleriHandler.getAll);

export default galeriRouter;