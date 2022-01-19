import volunteer from "../models/volunteer.js";
import student from "../models/student.js";
import meeting from "../models/meeting.js";

export const availableTimeSlots = async (req, res) => {
    const id = req.body.user.result._id;
    const availableSlots = req.body.availableslots;
    const curuser = await volunteer.findOneAndUpdate({ _id: id }, { $push: { availableSlots: availableSlots } });
}

export const getSlots = async (req, res) => {
    const { subject, year } = req.query;
    const volunteers = await volunteer.find({ subject: subject, classRange: year });
    let tslots = volunteers.map(volunteer => volunteer.availableSlots);
    let slots = [].concat.apply([], tslots);
    console.log(slots);
    res.send(slots);

}

export const bookSlot = async (req, res) => {
   
    try{
        const { slot, userId, subject, year, description } = req.body;
        let sa = slot.split(/(\s+)/)
        const slotDate = sa[0];
        const slotTime = sa[2];
    
      
        const stu = await student.findOne({ _id: userId });
    
        const vol = await volunteer.findOneAndUpdate({ subject: subject, classRange: year, availableSlots: slot }, { $pull: { availableSlots: slot } });
    
        const meetLink = `https://meet.jit.si/${userId}-${subject}-${year}-${vol._id}m  `;
        const meet = await meeting.create({ studentId: userId, volunteerId: vol._id, date: slotDate, time: slotTime, meetLink: meetLink, subject: subject, year: year, description: description });
            await student.findOneAndUpdate({ _id: userId }, { $push: { meetings: meet } });
            await volunteer.findOneAndUpdate({ _id: vol._id }, { $push: { meetings: meet } });
        console.log(stu);
    } catch(err){
        console.log(err);
    }

    res.send("Booked");


   

}

export const getBookings = async (req, res) => {
    const { userId } = req.query;
    console.log(req.query);
    const bookings = await meeting.find({ studentId: userId });
    console.log(bookings);
    res.send(bookings);
}

export const getVolunteerBookings = async (req, res) => {
    const { userId } = req.query;
    const bookings = await meeting.find({ volunteerId: userId });
    res.send(bookings);
}


