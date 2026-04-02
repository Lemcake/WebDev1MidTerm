const latestBookingElem = document.querySelector("[data-latest-booking]");

const mockLatestBooking = {
  specialty: "Pediatrics",
  doctor: "Dr. Marco",
  date: "Apr 02, 2026",
  time: "01:30 PM"
};

function renderLatestBooking() {
  if (!latestBookingElem) return;
  latestBookingElem.innerHTML = `
    <p><strong>Specialty:</strong> ${mockLatestBooking.specialty}</p>
    <p><strong>Doctor:</strong> ${mockLatestBooking.doctor}</p>
    <p><strong>Date:</strong> ${mockLatestBooking.date}</p>
    <p><strong>Time:</strong> ${mockLatestBooking.time}</p>
  `;
}

renderLatestBooking();