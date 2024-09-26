const mongoose = require('mongoose');
const Consultation = require('../../domain/entities/Consultation');
const ConsultationRepository = require("../../domain/repositories/ConsultationRepository");

const ConsultationSchema = new mongoose.Schema({
  patientId: String,
  doctorId: String,
  date: {
    type: Date,
    set: function(value) {
      if (typeof value === 'string') {
        const [day, month, year] = value.split('/');
        return new Date(year, month - 1, day);
      }
      return value;
    }
  },
  diagnosis: String,
  treatment: String
});

const ConsultationModel = mongoose.model('Consultation', ConsultationSchema);

class ConsultationRepositoryImpl extends ConsultationRepository {
  async getAll() {
    const consultations = await ConsultationModel.find();
    return consultations.map(c => new Consultation(c));
  }

  async getById(id) {
    const consultation = await ConsultationModel.findById(id);
    return consultation ? new Consultation(consultation) : null;
  }

  async save(consultation) {
    const newConsultation = new ConsultationModel(consultation);
    await newConsultation.save();
    return new Consultation(newConsultation);
  }

  async update(id, consultation) {
    const updatedConsultation = await ConsultationModel.findByIdAndUpdate(id, consultation, { new: true });
    return updatedConsultation ? new Consultation(updatedConsultation) : null;
  }

  async delete(id) {
    await ConsultationModel.findByIdAndDelete(id);
  }
}

module.exports = ConsultationRepositoryImpl;
