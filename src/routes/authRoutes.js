import express from "express";
const router = express.Router();

router.get("/", (res, req) => {
    res.json({ message: "auth route working" })
});

export default router;