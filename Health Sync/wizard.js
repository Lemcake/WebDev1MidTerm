const STORAGE_KEY = "natural-wizard-state";
let wizardState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  step: 0, specialty: "", doctor: "", date: "", time: "", confirmed: false
};

const specialties = [
  { id: "cardio", label: "Heart Care" },
  { id: "skin", label: "Dermatology" },
  { id: "kids", label: "Pediatrics" },
  { id: "bones", label: "Orthopedics" }
];

const doctors = [
  { id: "doc1", name: "Dr. Alicia", specialty: "cardio" },
  { id: "doc2", name: "Dr. Priya", specialty: "skin" },
  { id: "doc3", name: "Dr. Marco", specialty: "kids" },
  { id: "doc4", name: "Dr. Nora", specialty: "bones" }
];

const wizardScreen = document.getElementById("wizardScreen");
const stepLabel = document.getElementById("stepLabel");
const wizardQuestion = document.getElementById("wizardQuestion");
const stepSubtitle = document.getElementById("stepSubtitle");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const resetWizardButton = document.getElementById("resetWizard");
const resumeNotice = document.getElementById("resumeNotice");
const summarySpecialty = document.getElementById("summarySpecialty");
const summaryDoctor = document.getElementById("summaryDoctor");
const summaryDate = document.getElementById("summaryDate");
const summaryTime = document.getElementById("summaryTime");

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wizardState));
}

function updateSummary() {
  summarySpecialty.textContent = wizardState.specialty || "Not selected";
  summaryDoctor.textContent = wizardState.doctor || "Not selected";
  summaryDate.textContent = wizardState.date || "Not selected";
  summaryTime.textContent = wizardState.time || "Not selected";
  resumeNotice.textContent = wizardState.step > 0 ? "You can resume anytime." : "Progress is saved locally.";
}

function renderStep() {
  const stepTitles = [
    "Choose Specialty", "Select Doctor", "Pick Date & Time", "Confirm Appointment"
  ];
  stepLabel.textContent = `Step ${wizardState.step + 1}`;
  wizardQuestion.textContent = stepTitles[wizardState.step];
  stepSubtitle.textContent = "";

  if (wizardState.step === 0) {
    wizardScreen.innerHTML = specialties.map(s => 
      `<button data-id="${s.id}" class="${wizardState.specialty === s.id ? 'active':''}">${s.label}</button>`
    ).join("");
    wizardScreen.querySelectorAll("button").forEach(btn => btn.onclick = () => {
      wizardState.specialty = btn.dataset.id;
      wizardState.doctor = "";
      wizardState.date = "";
      wizardState.time = "";
      saveState();
      renderStep();
      updateSummary();
    });
  } else if (wizardState.step === 1) {
    const filtered = doctors.filter(d => d.specialty === wizardState.specialty);
    wizardScreen.innerHTML = filtered.map(d => 
      `<button data-id="${d.id}" class="${wizardState.doctor === d.id ? 'active':''}">${d.name}</button>`
    ).join("");
    wizardScreen.querySelectorAll("button").forEach(btn => btn.onclick = () => {
      wizardState.doctor = btn.dataset.id;
      wizardState.date = "";
      wizardState.time = "";
      saveState();
      renderStep();
      updateSummary();
    });
  } else if (wizardState.step === 2) {
    const dates = ["2026-04-02", "2026-04-03", "2026-04-04"];
    wizardScreen.innerHTML = dates.map(d => 
      `<button data-date="${d}" class="${wizardState.date === d ? 'active':''}">${d}</button>`
    ).join("");
    wizardScreen.querySelectorAll("button").forEach(btn => btn.onclick = () => {
      wizardState.date = btn.dataset.date;
      wizardState.time = "10:00 AM";
      saveState();
      renderStep();
      updateSummary();
    });
  } else {
    wizardScreen.innerHTML = `<div>Appointment Summary Ready. <strong>Book Now!</strong></div>`;
  }

  backButton.disabled = wizardState.step === 0;
  nextButton.disabled = wizardState.step === 3;
}

function nextStep() {
  if (wizardState.step < 3) wizardState.step++;
  saveState();
  renderStep();
  updateSummary();
}

function prevStep() {
  if (wizardState.step > 0) wizardState.step--;
  saveState();
  renderStep();
  updateSummary();
}

function resetWizard() {
  wizardState = { step: 0, specialty: "", doctor: "", date: "", time: "", confirmed: false };
  saveState();
  renderStep();
  updateSummary();
}

backButton.onclick = prevStep;
nextButton.onclick = nextStep;
resetWizardButton.onclick = resetWizard;

renderStep();
updateSummary();