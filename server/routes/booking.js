import express from "express";
const router = express.Router();

import {availableTimeSlots,getSlots,bookSlot,getBookings,getVolunteerBookings} from "../controllers/booking.js";

router.post("/availableTimeSlots", availableTimeSlots);
router.get("/getSlots", getSlots);
router.post("/bookSlot", bookSlot);
router.get("/getBookings", getBookings);
router.get("/getVolunteerBookings", getVolunteerBookings);



export default router;