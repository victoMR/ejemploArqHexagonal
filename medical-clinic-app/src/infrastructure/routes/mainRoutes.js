const express = require('express');

function mainRoutes(consultationController, nursingController, medicalRecordController, socialServiceController) {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send(`
            <h1>Bienvenido a la API de la Clínica Médica. Prueba usar:</h1>
            <ul>
                <li><a href="/consultations">/Consultas</a></li>
                <li><a href="/nursing-procedures">/Procedimientos de Enfermería</a></li>
                <li><a href="/medical-records">/Historiales Médicos</a></li>
                <li><a href="/social-services">/Servicios Sociales</a></li>
            </ul>
        `);
    });

    return router;
}

module.exports = mainRoutes;


