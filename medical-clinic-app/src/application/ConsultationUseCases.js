class ConsultationUseCases {
  constructor(consultationRepository) {
    this.consultationRepository = consultationRepository;
  }

  getAllConsultations() {
    return this.consultationRepository.getAll();
  }

  getConsultationById(id) {
    return this.consultationRepository.getById(id);
  }

  createConsultation(consultationData) {
    return this.consultationRepository.save(consultationData);
  }

  updateConsultation(id, consultationData) {
    return this.consultationRepository.update(id, consultationData);
  }

  deleteConsultation(id) {
    return this.consultationRepository.delete(id);
  }
}

module.exports = ConsultationUseCases;
