class Consultation {
  constructor({ id, patientId, doctorId, date, diagnosis, treatment }) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date instanceof Date ? date : new Date(date);
    this.diagnosis = diagnosis;
    this.treatment = treatment;
  }
}

module.exports = Consultation;