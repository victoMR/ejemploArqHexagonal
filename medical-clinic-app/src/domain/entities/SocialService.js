class SocialService {
  constructor({ id = null, patientId, socialWorkerId, date, serviceType, observations }) {
    this.id = id;
    this.patientId = patientId;
    this.socialWorkerId = socialWorkerId;
    this.date = date;
    this.serviceType = serviceType;
    this.observations = observations;
  }
}

module.exports = SocialService;