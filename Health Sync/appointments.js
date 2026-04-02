const STORAGE_KEY = "natural-appointments";
let appointments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function saveAppointments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
}

function addAppointment(appt) {
  appointments.push(appt);
  saveAppointments();
}

function getPendingAppointments() {
  return appointments.filter(a => a.status === "Pending");
}