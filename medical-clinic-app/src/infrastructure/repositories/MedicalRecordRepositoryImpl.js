const mongoose = require('mongoose');
const MedicalRecord = require('../../domain/entities/MedicalRecord');
const MedicalRecordRepository = require("../../domain/repositories/MedicalRecordRepository");

const MedicalRecordSchema = new mongoose.Schema({
  patientId: String,
  history: String,
  allergies: [String],
  medications: [String]
});

const MedicalRecordModel = mongoose.model('MedicalRecord', MedicalRecordSchema);

class MedicalRecordRepositoryImpl extends MedicalRecordRepository {
  async getAll() {
    const medicalRecords = await MedicalRecordModel.find();
    return medicalRecords.map(mr => new MedicalRecord(mr));
  }

  async getById(id) {
    const medicalRecord = await MedicalRecordModel.findById(id);
    return medicalRecord ? new MedicalRecord(medicalRecord) : null;
  }

  async save(medicalRecord) {
    const newMedicalRecord = new MedicalRecordModel(medicalRecord);
    await newMedicalRecord.save();
    return new MedicalRecord(newMedicalRecord);
  }

  async update(id, medicalRecord) {
    const updatedMedicalRecord = await MedicalRecordModel.findByIdAndUpdate(id, medicalRecord, { new: true });
    return updatedMedicalRecord ? new MedicalRecord(updatedMedicalRecord) : null;
  }

  async delete(id) {
    await MedicalRecordModel.findByIdAndDelete(id);
  }
}

module.exports = MedicalRecordRepositoryImpl;
