class SocialServiceController {
  constructor(socialServiceUseCases) {
    this.socialServiceUseCases = socialServiceUseCases;
  }

  getAllSocialServices = async (req, res) => {
    try {
      const socialServices = await this.socialServiceUseCases.getAllSocialServices();
      res.json(socialServices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getSocialServiceById = async (req, res) => {
    try {
      const socialService = await this.socialServiceUseCases.getSocialServiceById(req.params.id);
      if (socialService) {
        res.json(socialService);
      } else {
        res.status(404).json({ message: 'Servicio social no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  createSocialService = async (req, res) => {
    try {
      const newSocialService = await this.socialServiceUseCases.createSocialService(req.body);
      res.status(201).json(newSocialService);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  updateSocialService = async (req, res) => {
    try {
      const updatedSocialService = await this.socialServiceUseCases.updateSocialService(req.params.id, req.body);
      if (updatedSocialService) {
        res.json(updatedSocialService);
      } else {
        res.status(404).json({ message: 'Servicio social no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  deleteSocialService = async (req, res) => {
    try {
      await this.socialServiceUseCases.deleteSocialService(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SocialServiceController;
