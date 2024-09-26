const express = require('express');

function socialServiceRoutes(socialServiceController) {
    const router = express.Router();

    router.get('/', socialServiceController.getAllSocialServices);
    router.get('/:id', socialServiceController.getSocialServiceById);
    router.post('/', socialServiceController.createSocialService);
    router.put('/:id', socialServiceController.updateSocialService);
    router.delete('/:id', socialServiceController.deleteSocialService);
    
    return router;
}

module.exports = socialServiceRoutes;
