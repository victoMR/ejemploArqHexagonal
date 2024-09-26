class SocialServiceUseCases {
  constructor(socialServiceRepository) {
    this.socialServiceRepository = socialServiceRepository;
  }

  getAllSocialServices() {
    return this.socialServiceRepository.getAll();
  }
  getSocialServiceById(id) {
    return this.socialServiceRepository.getById(id);
  }
  createSocialService(socialServiceData) {
    return this.socialServiceRepository.save(socialServiceData);
  }
  updateSocialService(id, socialServiceData) {
    return this.socialServiceRepository.update(id, socialServiceData);
  }
  deleteSocialService(id) {
    return this.socialServiceRepository.delete(id);
  }
}

module.exports = SocialServiceUseCases;

