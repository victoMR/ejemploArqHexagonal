class NursingProcedure {
  constructor(id, patientId, nurseId, procedure, date) {
    this.id = id;
    this.patientId = patientId;
    this.nurseId = nurseId;
    this.procedure = procedure;
    this.date = date;
  }
}

module.exports = NursingProcedure;