class MedicalRecord {
  constructor({ id = null, patientId, consultations = [], nursingProcedures = [] }) {
    this.id = id;
    this.patientId = patientId;
    this.consultations = consultations;
    this.nursingProcedures = nursingProcedures;
  }
}

module.exports = MedicalRecord;