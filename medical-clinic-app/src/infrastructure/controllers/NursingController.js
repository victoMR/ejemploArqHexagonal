class NursingController {
  constructor(nursingUseCases) {
    this.nursingUseCases = nursingUseCases;
  }

  getAllNursingProcedures = async (req, res) => {
    try {
      const nursingProcedures = await this.nursingUseCases.getAllNursingProcedures();
      res.json(nursingProcedures);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getNursingProcedureById = async (req, res) => {
    try {
      const nursingProcedure = await this.nursingUseCases.getNursingProcedureById(req.params.id);
      if (nursingProcedure) {
        res.json(nursingProcedure);
      } else {
        res.status(404).json({ message: 'Procedimiento de enfermería no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createNursingProcedure = async (req, res) => {
    try {
      const newNursingProcedure = await this.nursingUseCases.createNursingProcedure(req.body);
      res.status(201).json(newNursingProcedure);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateNursingProcedure = async (req, res) => {
    try {
      const updatedNursingProcedure = await this.nursingUseCases.updateNursingProcedure(req.params.id, req.body);
      if (updatedNursingProcedure) {
        res.json(updatedNursingProcedure);
      } else {
        res.status(404).json({ message: 'Procedimiento de enfermería no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteNursingProcedure = async (req, res) => {
    try {
      await this.nursingUseCases.deleteNursingProcedure(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = NursingController;
