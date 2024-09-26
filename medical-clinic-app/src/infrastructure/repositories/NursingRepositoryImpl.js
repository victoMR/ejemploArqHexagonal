const mongoose = require('mongoose');
const NursingProcedure = require('../../domain/entities/NursingProcedure');
const NursingRepository = require("../../domain/repositories/NursingRepository");

const NursingProcedureSchema = new mongoose.Schema({
  patientId: String,
  nurseId: String,
  procedure: String,
  date: Date
});

const NursingProcedureModel = mongoose.model('NursingProcedure', NursingProcedureSchema);

class NursingRepositoryImpl extends NursingRepository {
  async getAll() {
    const nursingProcedures = await NursingProcedureModel.find();
    return nursingProcedures.map(np => new NursingProcedure(np));
  }

  async getById(id) {
    const nursingProcedure = await NursingProcedureModel.findById(id);
    return nursingProcedure ? new NursingProcedure(nursingProcedure) : null;
  }

  async save(nursingProcedure) {
    const newNursingProcedure = new NursingProcedureModel(nursingProcedure);
    await newNursingProcedure.save();
    return new NursingProcedure(newNursingProcedure);
  }

  async update(id, nursingProcedure) {
    const updatedNursingProcedure = await NursingProcedureModel.findByIdAndUpdate(id, nursingProcedure, { new: true });
    return updatedNursingProcedure ? new NursingProcedure(updatedNursingProcedure) : null;
  }

  async delete(id) {
    await NursingProcedureModel.findByIdAndDelete(id);
  }
}

module.exports = NursingRepositoryImpl;
