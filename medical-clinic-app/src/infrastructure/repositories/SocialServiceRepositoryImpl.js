const mongoose = require('mongoose');
const SocialService = require('../../domain/entities/SocialService');
const SocialServiceRepository = require("../../domain/repositories/SocialServiceRepository");

const SocialServiceSchema = new mongoose.Schema({
  patientId: String,
  serviceType: String,
  description: String,
  date: Date
});

const SocialServiceModel = mongoose.model('SocialService', SocialServiceSchema);

class SocialServiceRepositoryImpl extends SocialServiceRepository {
  async getAll() {
    const socialServices = await SocialServiceModel.find();
    return socialServices.map(ss => new SocialService(ss));
  }

  async getById(id) {
    const socialService = await SocialServiceModel.findById(id);
    return socialService ? new SocialService(socialService) : null;
  }

  async save(socialService) {
    const newSocialService = new SocialServiceModel(socialService);
    await newSocialService.save();
    return new SocialService(newSocialService);
  }

  async update(id, socialService) {
    const updatedSocialService = await SocialServiceModel.findByIdAndUpdate(id, socialService, { new: true });
    return updatedSocialService ? new SocialService(updatedSocialService) : null;
  }

  async delete(id) {
    await SocialServiceModel.findByIdAndDelete(id);
  }
}

module.exports = SocialServiceRepositoryImpl;
