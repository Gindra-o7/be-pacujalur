import { Router } from "express";
import FasilitasHandler from "../handlers/fasilitas.handler";

const fasilitasRoute = Router();

fasilitasRoute.get("/fasilitas", FasilitasHandler.getAll);
fasilitasRoute.get("/fasilitas/penginapan/:penginapanId", FasilitasHandler.getByPenginapanId);
fasilitasRoute.get("/fasilitas/:id", FasilitasHandler.getById);
fasilitasRoute.post("/fasilitas", FasilitasHandler.push);
fasilitasRoute.put("/fasilitas/:id", FasilitasHandler.put);
fasilitasRoute.delete("/fasilitas/:id", FasilitasHandler.delete);

export default fasilitasRoute;
