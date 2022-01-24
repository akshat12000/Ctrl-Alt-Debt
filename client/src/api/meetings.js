import axios from 'axios';



export const getMeetings = (volunteerId)=> axios.get(`http://localhost:5000/booking/getVolunteerBookings?userId=${volunteerId}`);

export const createMeeting=(meet)=>axios.post('http://localhost:5000/booking/bookSlot',meet);