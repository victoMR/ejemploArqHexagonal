const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Para la ruta principal
const mainRoutes = require('./src/infrastructure/routes/mainRoutes');



// Importar componentes para Consulta Médica
const ConsultationRepositoryImpl = require('./src/infrastructure/repositories/ConsultationRepositoryImpl');
const ConsultationUseCases = require('./src/application/ConsultationUseCases');
const ConsultationController = require('./src/infrastructure/controllers/ConsultationController');
const consultationRoutes = require('./src/infrastructure/routes/consultationRoutes');

// Crear instancias para Consulta Médica
const consultationRepository = new ConsultationRepositoryImpl();
const consultationUseCases = new ConsultationUseCases(consultationRepository);
const consultationController = new ConsultationController(consultationUseCases);

// Importar componentes para Enfermería
const NursingRepositoryImpl = require('./src/infrastructure/repositories/NursingRepositoryImpl');
const NursingUseCases = require('./src/application/NursingUseCases');
const NursingController = require('./src/infrastructure/controllers/NursingController');
const nursingRoutes = require('./src/infrastructure/routes/nursingRoutes');

// Crear instancias para Procedimientos de Enfermería
const nursingRepository = new NursingRepositoryImpl();
const nursingUseCases = new NursingUseCases(nursingRepository);
const nursingController = new NursingController(nursingUseCases);

// Importar componentes para Historia Clínica
const MedicalRecordRepositoryImpl = require('./src/infrastructure/repositories/MedicalRecordRepositoryImpl');
const MedicalRecordUseCases = require('./src/application/MedicalRecordUseCases');
const MedicalRecordController = require('./src/infrastructure/controllers/MedicalRecordController');
const medicalRecordRoutes = require('./src/infrastructure/routes/medicalRecordRoutes');

// Crear instancias para Historia Clínica
const medicalRecordRepository = new MedicalRecordRepositoryImpl();
const medicalRecordUseCases = new MedicalRecordUseCases(medicalRecordRepository);
const medicalRecordController = new MedicalRecordController(medicalRecordUseCases);

// Importar componentes para Servicio Social
const SocialServiceRepositoryImpl = require('./src/infrastructure/repositories/SocialServiceRepositoryImpl');
const SocialServiceUseCases = require('./src/application/SocialServiceUseCases');
const SocialServiceController = require('./src/infrastructure/controllers/SocialServiceController');
const socialServiceRoutes = require('./src/infrastructure/routes/socialServiceRoutes');

// Crear instancias para Servicio Social
const socialServiceRepository = new SocialServiceRepositoryImpl();
const socialServiceUseCases = new SocialServiceUseCases(socialServiceRepository);
const socialServiceController = new SocialServiceController(socialServiceUseCases);

const app = express();

app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_clinic')
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

app.use('/', mainRoutes());
app.use('/consultations', consultationRoutes(consultationController));
app.use('/nursing-procedures', nursingRoutes(nursingController));
app.use('/medical-records', medicalRecordRoutes(medicalRecordController));
app.use('/social-services', socialServiceRoutes(socialServiceController));

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});



