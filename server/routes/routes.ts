import { Router } from "express";
import databaseController from "../controllers/databaseController";

const router = Router();

router.post("/api/database", databaseController.createDatabase);
router.get("/api/database", databaseController.getDatabases);

router.post(
  "/api/database/:param/fields",
  databaseController.addFieldToDatabase
);
// retrieve database info
router.get("/api/database/:param/info", databaseController.getDatabaseInfo);
// get database data with querys
router.get("/api/database/:param/data", databaseController.getDatabaseData);
// add to database
router.post("/api/database/:param", databaseController.addToDatabase);

export default router;
