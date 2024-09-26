class MedicalRecordController {
  constructor(medicalRecordUseCases) {
    this.medicalRecordUseCases = medicalRecordUseCases;
  }

  getAllMedicalRecords = async (req, res) => {
    try {
      const medicalRecords = await this.medicalRecordUseCases.getAllMedicalRecords();
      res.json(medicalRecords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getMedicalRecordById = async (req, res) => {
    try {
      const medicalRecord = await this.medicalRecordUseCases.getMedicalRecordById(req.params.id);
      if (medicalRecord) {
        res.json(medicalRecord);
      } else {
        res.status(404).json({ message: 'Historia clínica no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createMedicalRecord = async (req, res) => {
    try {
      const newMedicalRecord = await this.medicalRecordUseCases.createMedicalRecord(req.body);
      res.status(201).json(newMedicalRecord);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateMedicalRecord = async (req, res) => {
    try {
      const updatedMedicalRecord = await this.medicalRecordUseCases.updateMedicalRecord(req.params.id, req.body);
      if (updatedMedicalRecord) {
        res.json(updatedMedicalRecord);
      } else {
        res.status(404).json({ message: 'Historia clínica no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteMedicalRecord = async (req, res) => {
    try {
      await this.medicalRecordUseCases.deleteMedicalRecord(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MedicalRecordController;
