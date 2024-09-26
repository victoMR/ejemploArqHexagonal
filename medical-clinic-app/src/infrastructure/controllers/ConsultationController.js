class ConsultationController {
  constructor(consultationUseCases) {
    this.consultationUseCases = consultationUseCases;
  }

  getAllConsultations = async (req, res) => {
    try {
      const consultations = await this.consultationUseCases.getAllConsultations();
      res.json(consultations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getConsultationById = async (req, res) => {
    try {
      const consultation = await this.consultationUseCases.getConsultationById(req.params.id);
      if (consultation) {
        res.json(consultation);
      } else {
        res.status(404).json({ message: 'Consulta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createConsultation = async (req, res) => {
    try {
      const newConsultation = await this.consultationUseCases.createConsultation(req.body);
      res.status(201).json(newConsultation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateConsultation = async (req, res) => {
    try {
      const updatedConsultation = await this.consultationUseCases.updateConsultation(req.params.id, req.body);
      if (updatedConsultation) {
        res.json(updatedConsultation);
      } else {
        res.status(404).json({ message: 'Consulta no encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteConsultation = async (req, res) => {
    try {
      await this.consultationUseCases.deleteConsultation(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ConsultationController;