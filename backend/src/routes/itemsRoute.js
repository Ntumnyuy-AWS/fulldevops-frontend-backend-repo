import express from "express";
import Item from "../schema/Item.js";

const router = express.Router();

//Get all items
router.get("/", async (req, res) => {
    try{
        const items = await Item.find();
        res.json(items);
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;