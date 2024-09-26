const express = require('express');

function consultationRoutes(consultationController) {
    const router = express.Router();

    router.get('/', consultationController.getAllConsultations);
    router.get('/:id', consultationController.getConsultationById);
    router.post('/', consultationController.createConsultation);
    router.put('/:id', consultationController.updateConsultation);
    router.delete('/:id', consultationController.deleteConsultation);

    return router;
}

module.exports = consultationRoutes;
