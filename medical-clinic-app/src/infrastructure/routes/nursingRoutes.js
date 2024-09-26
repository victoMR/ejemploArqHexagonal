const express = require('express');

function nursingRoutes(nursingController) {
    const router = express.Router();

    router.get('/', nursingController.getAllNursingProcedures);
    router.get('/:id', nursingController.getNursingProcedureById);
    router.post('/', nursingController.createNursingProcedure);
    router.put('/:id', nursingController.updateNursingProcedure);
    router.delete('/:id', nursingController.deleteNursingProcedure);

    return router;
}

module.exports = nursingRoutes;
