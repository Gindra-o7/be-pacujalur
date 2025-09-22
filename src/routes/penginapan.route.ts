import { Router } from "express";
import PenginapanHandler from "../handlers/penginapan.handler";

const penginapanRoute = Router();

penginapanRoute.get("/penginapan", PenginapanHandler.getAll);
penginapanRoute.get("/penginapan/:id", PenginapanHandler.getById);
penginapanRoute.post("/penginapan", PenginapanHandler.push);
penginapanRoute.put("/penginapan/:id", PenginapanHandler.put);
penginapanRoute.delete("/penginapan/:id", PenginapanHandler.delete);

export default penginapanRoute;
