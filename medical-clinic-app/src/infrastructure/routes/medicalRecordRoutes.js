const express = require('express');

function medicalRecordRoutes(medicalRecordController) {
    const router = express.Router();

    router.get('/', medicalRecordController.getAllMedicalRecords);
    router.get('/:id', medicalRecordController.getMedicalRecordById);
    router.post('/', medicalRecordController.createMedicalRecord);
    router.put('/:id', medicalRecordController.updateMedicalRecord);
    router.delete('/:id', medicalRecordController.deleteMedicalRecord);
    
    return router;
}

module.exports = medicalRecordRoutes;
