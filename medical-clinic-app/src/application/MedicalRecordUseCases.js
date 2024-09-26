class MedicalRecordUseCases {
  constructor(medicalRecordRepository) {
    this.medicalRecordRepository = medicalRecordRepository;
  }

  getAllMedicalRecords() {
    return this.medicalRecordRepository.getAll();
  }

  getMedicalRecordById(id) {
    return this.medicalRecordRepository.getById(id);
  }

  createMedicalRecord(medicalRecordData) {
    return this.medicalRecordRepository.save(medicalRecordData);
  }

  updateMedicalRecord(id, medicalRecordData) {
    return this.medicalRecordRepository.update(id, medicalRecordData);
  }

  deleteMedicalRecord(id) {
    return this.medicalRecordRepository.delete(id);
  }
}

module.exports = MedicalRecordUseCases;
