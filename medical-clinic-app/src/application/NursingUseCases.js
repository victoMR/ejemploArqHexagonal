class NursingUseCases {
  constructor(nursingRepository) {
    this.nursingRepository = nursingRepository;
  }

  getAllNursingProcedures() {
    return this.nursingRepository.getAll();
  }

  getNursingProcedureById(id) {
    return this.nursingRepository.getById(id);
  }

  createNursingProcedure(nursingProcedureData) {
    return this.nursingRepository.save(nursingProcedureData);
  }

  updateNursingProcedure(id, nursingProcedureData) {
    return this.nursingRepository.update(id, nursingProcedureData);
  }

  deleteNursingProcedure(id) {
    return this.nursingRepository.delete(id);
  }
}

module.exports = NursingUseCases;

