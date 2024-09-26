**Introducción**

En esta ocasión, vamos a desarrollar un ejemplo más extenso utilizando la arquitectura hexagonal en Node.js, aplicado a un sistema de gestión para un consultorio médico. Este sistema incluirá módulos para **consulta médica**, **enfermería**, **historia clínica** y **servicio social**. El objetivo es ilustrar cómo organizar y estructurar una aplicación compleja siguiendo los principios de la arquitectura hexagonal.

---

### **Objetivo del Proyecto**

Crear una aplicación de gestión para un consultorio médico que permita:

- **Consulta Médica**: Registro y gestión de consultas médicas realizadas por los doctores.
- **Enfermería**: Manejo de procedimientos de enfermería y registro de signos vitales.
- **Historia Clínica**: Almacenamiento y acceso al historial médico de los pacientes.
- **Servicio Social**: Gestión de servicios adicionales proporcionados a los pacientes, como asesoramiento o apoyo comunitario.

---

### **Estructura General del Proyecto**

```
/medical-clinic-app
├── index.js
└── src
    ├── application
    │   ├── ConsultationUseCases.js
    │   ├── NursingUseCases.js
    │   ├── MedicalRecordUseCases.js
    │   └── SocialServiceUseCases.js
    ├── domain
    │   ├── entities
    │   │   ├── Consultation.js
    │   │   ├── NursingProcedure.js
    │   │   ├── MedicalRecord.js
    │   │   └── SocialService.js
    │   └── repositories
    │       ├── ConsultationRepository.js
    │       ├── NursingRepository.js
    │       ├── MedicalRecordRepository.js
    │       └── SocialServiceRepository.js
    └── infrastructure
        ├── controllers
        │   ├── ConsultationController.js
        │   ├── NursingController.js
        │   ├── MedicalRecordController.js
        │   └── SocialServiceController.js
        ├── repositories
        │   ├── ConsultationRepositoryImpl.js
        │   ├── NursingRepositoryImpl.js
        │   ├── MedicalRecordRepositoryImpl.js
        │   └── SocialServiceRepositoryImpl.js
        └── routes
            ├── consultationRoutes.js
            ├── nursingRoutes.js
            ├── medicalRecordRoutes.js
            └── socialServiceRoutes.js
```

---

### **Paso 1: Definir las Entidades de Dominio**

#### **1.1. Consulta Médica (`Consultation.js`)**

**Archivo:** `src/domain/entities/Consultation.js`

```javascript
class Consultation {
  constructor({ id = null, patientId, doctorId, date, diagnosis, treatment }) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.diagnosis = diagnosis;
    this.treatment = treatment;
  }
}

module.exports = Consultation;
```

#### **1.2. Procedimiento de Enfermería (`NursingProcedure.js`)**

**Archivo:** `src/domain/entities/NursingProcedure.js`

```javascript
class NursingProcedure {
  constructor({ id = null, patientId, nurseId, date, procedureType, notes }) {
    this.id = id;
    this.patientId = patientId;
    this.nurseId = nurseId;
    this.date = date;
    this.procedureType = procedureType;
    this.notes = notes;
  }
}

module.exports = NursingProcedure;
```

#### **1.3. Historia Clínica (`MedicalRecord.js`)**

**Archivo:** `src/domain/entities/MedicalRecord.js`

```javascript
class MedicalRecord {
  constructor({ id = null, patientId, consultations = [], nursingProcedures = [] }) {
    this.id = id;
    this.patientId = patientId;
    this.consultations = consultations;
    this.nursingProcedures = nursingProcedures;
  }
}

module.exports = MedicalRecord;
```

#### **1.4. Servicio Social (`SocialService.js`)**

**Archivo:** `src/domain/entities/SocialService.js`

```javascript
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
```

---

### **Paso 2: Definir los Repositorios de Dominio (Puertos)**

#### **2.1. Consulta Médica (`ConsultationRepository.js`)**

**Archivo:** `src/domain/repositories/ConsultationRepository.js`

```javascript
class ConsultationRepository {
  getAll() {
    throw new Error('Método no implementado');
  }

  getById(id) {
    throw new Error('Método no implementado');
  }

  save(consultation) {
    throw new Error('Método no implementado');
  }

  update(id, consultation) {
    throw new Error('Método no implementado');
  }

  delete(id) {
    throw new Error('Método no implementado');
  }
}

module.exports = ConsultationRepository;
```

*Nota: Se deben crear repositorios similares para **NursingRepository.js**, **MedicalRecordRepository.js** y **SocialServiceRepository.js**, siguiendo el mismo patrón.*

---

### **Paso 3: Implementar los Casos de Uso**

#### **3.1. Casos de Uso para Consulta Médica (`ConsultationUseCases.js`)**

**Archivo:** `src/application/ConsultationUseCases.js`

```javascript
class ConsultationUseCases {
  constructor(consultationRepository) {
    this.consultationRepository = consultationRepository;
  }

  getAllConsultations() {
    return this.consultationRepository.getAll();
  }

  getConsultationById(id) {
    return this.consultationRepository.getById(id);
  }

  createConsultation(consultationData) {
    return this.consultationRepository.save(consultationData);
  }

  updateConsultation(id, consultationData) {
    return this.consultationRepository.update(id, consultationData);
  }

  deleteConsultation(id) {
    return this.consultationRepository.delete(id);
  }
}

module.exports = ConsultationUseCases;
```

*Nota: Se deben crear casos de uso similares para enfermería, historia clínica y servicio social.*

---

### **Paso 4: Implementar los Repositorios de Infraestructura (Adaptadores)**

Para simplificar, implementaremos solo el repositorio de consulta médica. Los demás seguirán un patrón similar.

#### **4.1. Implementación del Repositorio de Consulta Médica (`ConsultationRepositoryImpl.js`)**

**Archivo:** `src/infrastructure/repositories/ConsultationRepositoryImpl.js`

```javascript
const ConsultationRepository = require('../../domain/repositories/ConsultationRepository');
const Consultation = require('../../domain/entities/Consultation');

class ConsultationRepositoryImpl extends ConsultationRepository {
  constructor() {
    super();
    this.consultations = [];
    this.currentId = 1;
  }

  getAll() {
    return Promise.resolve(this.consultations);
  }

  getById(id) {
    const consultation = this.consultations.find(c => c.id === parseInt(id));
    return Promise.resolve(consultation);
  }

  save(consultationData) {
    const consultation = new Consultation({ id: this.currentId++, ...consultationData });
    this.consultations.push(consultation);
    return Promise.resolve(consultation);
  }

  update(id, consultationData) {
    const index = this.consultations.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      this.consultations[index] = { ...this.consultations[index], ...consultationData };
      return Promise.resolve(this.consultations[index]);
    }
    return Promise.resolve(null);
  }

  delete(id) {
    const index = this.consultations.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
      const [deletedConsultation] = this.consultations.splice(index, 1);
      return Promise.resolve(deletedConsultation);
    }
    return Promise.resolve(null);
  }
}

module.exports = ConsultationRepositoryImpl;
```

---

### **Paso 5: Implementar los Controladores**

#### **5.1. Controlador de Consulta Médica (`ConsultationController.js`)**

**Archivo:** `src/infrastructure/controllers/ConsultationController.js`

```javascript
class ConsultationController {
  constructor(consultationUseCases) {
    this.consultationUseCases = consultationUseCases;

    this.getAllConsultations = this.getAllConsultations.bind(this);
    this.getConsultationById = this.getConsultationById.bind(this);
    this.createConsultation = this.createConsultation.bind(this);
    this.updateConsultation = this.updateConsultation.bind(this);
    this.deleteConsultation = this.deleteConsultation.bind(this);
  }

  async getAllConsultations(req, res) {
    const consultations = await this.consultationUseCases.getAllConsultations();
    res.json(consultations);
  }

  async getConsultationById(req, res) {
    const consultation = await this.consultationUseCases.getConsultationById(req.params.id);
    if (consultation) {
      res.json(consultation);
    } else {
      res.status(404).send('Consulta no encontrada');
    }
  }

  async createConsultation(req, res) {
    const consultation = await this.consultationUseCases.createConsultation(req.body);
    res.status(201).json(consultation);
  }

  async updateConsultation(req, res) {
    const consultation = await this.consultationUseCases.updateConsultation(req.params.id, req.body);
    if (consultation) {
      res.json(consultation);
    } else {
      res.status(404).send('Consulta no encontrada');
    }
  }

  async deleteConsultation(req, res) {
    const consultation = await this.consultationUseCases.deleteConsultation(req.params.id);
    if (consultation) {
      res.json(consultation);
    } else {
      res.status(404).send('Consulta no encontrada');
    }
  }
}

module.exports = ConsultationController;
```

*Nota: Se deben crear controladores similares para los demás módulos.*

---

### **Paso 6: Definir las Rutas**

#### **6.1. Rutas de Consulta Médica (`consultationRoutes.js`)**

**Archivo:** `src/infrastructure/routes/consultationRoutes.js`

```javascript
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
```

---

### **Paso 7: Configurar y Ejecutar la Aplicación (`index.js`)**

**Archivo:** `index.js`

```javascript
const express = require('express');
const bodyParser = require('body-parser');

// Importar componentes para Consulta Médica
const ConsultationRepositoryImpl = require('./src/infrastructure/repositories/ConsultationRepositoryImpl');
const ConsultationUseCases = require('./src/application/ConsultationUseCases');
const ConsultationController = require('./src/infrastructure/controllers/ConsultationController');
const consultationRoutes = require('./src/infrastructure/routes/consultationRoutes');

// Crear instancias para Consulta Médica
const consultationRepository = new ConsultationRepositoryImpl();
const consultationUseCases = new ConsultationUseCases(consultationRepository);
const consultationController = new ConsultationController(consultationUseCases);

const app = express();
app.use(bodyParser.json());

// Registrar rutas para Consulta Médica
app.use('/consultations', consultationRoutes(consultationController));

// Similarmente, se pueden configurar los demás módulos aquí...

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
```

---

### **Paso 8: Implementar Módulos Adicionales**

Para los otros módulos (**enfermería**, **historia clínica**, **servicio social**), seguirás los mismos pasos que para consulta médica:

1. **Definir las entidades** en `src/domain/entities/`.
2. **Crear los repositorios de dominio** (interfaces) en `src/domain/repositories/`.
3. **Implementar los casos de uso** en `src/application/`.
4. **Crear las implementaciones de los repositorios** en `src/infrastructure/repositories/`.
5. **Desarrollar los controladores** en `src/infrastructure/controllers/`.
6. **Definir las rutas** en `src/infrastructure/routes/`.
7. **Configurar el servidor** en `index.js`, creando instancias y registrando rutas.

---

### **Ejemplo de Implementación para Historia Clínica**

Para ilustrar, implementaremos el módulo de historia clínica.

#### **8.1. Entidad de Historia Clínica (`MedicalRecord.js`)**

Ya definida en el **Paso 1.3**.

#### **8.2. Repositorio de Dominio (`MedicalRecordRepository.js`)**

**Archivo:** `src/domain/repositories/MedicalRecordRepository.js`

```javascript
class MedicalRecordRepository {
  getByPatientId(patientId) {
    throw new Error('Método no implementado');
  }

  save(medicalRecord) {
    throw new Error('Método no implementado');
  }

  update(patientId, medicalRecord) {
    throw new Error('Método no implementado');
  }
}

module.exports = MedicalRecordRepository;
```

#### **8.3. Caso de Uso (`MedicalRecordUseCases.js`)**

**Archivo:** `src/application/MedicalRecordUseCases.js`

```javascript
class MedicalRecordUseCases {
  constructor(medicalRecordRepository) {
    this.medicalRecordRepository = medicalRecordRepository;
  }

  getMedicalRecordByPatientId(patientId) {
    return this.medicalRecordRepository.getByPatientId(patientId);
  }

  createMedicalRecord(medicalRecordData) {
    return this.medicalRecordRepository.save(medicalRecordData);
  }

  updateMedicalRecord(patientId, medicalRecordData) {
    return this.medicalRecordRepository.update(patientId, medicalRecordData);
  }
}

module.exports = MedicalRecordUseCases;
```

#### **8.4. Implementación del Repositorio (`MedicalRecordRepositoryImpl.js`)**

**Archivo:** `src/infrastructure/repositories/MedicalRecordRepositoryImpl.js`

```javascript
const MedicalRecordRepository = require('../../domain/repositories/MedicalRecordRepository');
const MedicalRecord = require('../../domain/entities/MedicalRecord');

class MedicalRecordRepositoryImpl extends MedicalRecordRepository {
  constructor() {
    super();
    this.medicalRecords = [];
  }

  getByPatientId(patientId) {
    const record = this.medicalRecords.find(r => r.patientId === patientId);
    return Promise.resolve(record);
  }

  save(medicalRecordData) {
    const record = new MedicalRecord(medicalRecordData);
    this.medicalRecords.push(record);
    return Promise.resolve(record);
  }

  update(patientId, medicalRecordData) {
    const index = this.medicalRecords.findIndex(r => r.patientId === patientId);
    if (index !== -1) {
      this.medicalRecords[index] = { ...this.medicalRecords[index], ...medicalRecordData };
      return Promise.resolve(this.medicalRecords[index]);
    }
    return Promise.resolve(null);
  }
}

module.exports = MedicalRecordRepositoryImpl;
```

#### **8.5. Controlador (`MedicalRecordController.js`)**

**Archivo:** `src/infrastructure/controllers/MedicalRecordController.js`

```javascript
class MedicalRecordController {
  constructor(medicalRecordUseCases) {
    this.medicalRecordUseCases = medicalRecordUseCases;

    this.getMedicalRecordByPatientId = this.getMedicalRecordByPatientId.bind(this);
    this.createMedicalRecord = this.createMedicalRecord.bind(this);
    this.updateMedicalRecord = this.updateMedicalRecord.bind(this);
  }

  async getMedicalRecordByPatientId(req, res) {
    const record = await this.medicalRecordUseCases.getMedicalRecordByPatientId(req.params.patientId);
    if (record) {
      res.json(record);
    } else {
      res.status(404).send('Historia clínica no encontrada');
    }
  }

  async createMedicalRecord(req, res) {
    const record = await this.medicalRecordUseCases.createMedicalRecord(req.body);
    res.status(201).json(record);
  }

  async updateMedicalRecord(req, res) {
    const record = await this.medicalRecordUseCases.updateMedicalRecord(req.params.patientId, req.body);
    if (record) {
      res.json(record);
    } else {
      res.status(404).send('Historia clínica no encontrada');
    }
  }
}

module.exports = MedicalRecordController;
```

#### **8.6. Rutas (`medicalRecordRoutes.js`)**

**Archivo:** `src/infrastructure/routes/medicalRecordRoutes.js`

```javascript
const express = require('express');

function medicalRecordRoutes(medicalRecordController) {
  const router = express.Router();

  router.get('/:patientId', medicalRecordController.getMedicalRecordByPatientId);
  router.post('/', medicalRecordController.createMedicalRecord);
  router.put('/:patientId', medicalRecordController.updateMedicalRecord);

  return router;
}

module.exports = medicalRecordRoutes;
```

#### **8.7. Configurar el Módulo en `index.js`**

**Archivo:** `index.js`

```javascript
// Importar componentes para Historia Clínica
const MedicalRecordRepositoryImpl = require('./src/infrastructure/repositories/MedicalRecordRepositoryImpl');
const MedicalRecordUseCases = require('./src/application/MedicalRecordUseCases');
const MedicalRecordController = require('./src/infrastructure/controllers/MedicalRecordController');
const medicalRecordRoutes = require('./src/infrastructure/routes/medicalRecordRoutes');

// Crear instancias para Historia Clínica
const medicalRecordRepository = new MedicalRecordRepositoryImpl();
const medicalRecordUseCases = new MedicalRecordUseCases(medicalRecordRepository);
const medicalRecordController = new MedicalRecordController(medicalRecordUseCases);

// Registrar rutas para Historia Clínica
app.use('/medical-records', medicalRecordRoutes(medicalRecordController));
```

---

### **Paso 9: Ejecutar la Aplicación**

1. **Instalar Dependencias**

   ```bash
   npm init -y
   npm install express body-parser
   ```

2. **Iniciar el Servidor**

   ```bash
   node index.js
   ```

---

### **Paso 10: Probar la Aplicación**

Puedes utilizar **Postman** o **curl** para probar las diferentes rutas de los módulos que has implementado.

**Ejemplo: Crear una Consulta Médica**

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "patientId": 1,
  "doctorId": 2,
  "date": "2023-10-05",
  "diagnosis": "Gripe",
  "treatment": "Reposo y medicación"
}' http://localhost:3000/consultations
```

**Obtener todas las Consultas Médicas**

```bash
curl http://localhost:3000/consultations
```

---

### **Consideraciones Adicionales**

- **Validaciones y Lógica de Negocio:** Puedes añadir validaciones y lógica de negocio en las entidades o casos de uso para asegurar la integridad de los datos y el cumplimiento de las reglas del negocio.

- **Persistencia Real de Datos:** Para almacenar los datos en una base de datos real, puedes implementar los repositorios utilizando una base de datos como MongoDB, PostgreSQL, etc.

- **Autenticación y Autorización:** Si necesitas gestionar usuarios y roles (por ejemplo, doctores, enfermeros, pacientes), puedes añadir un módulo de autenticación.

- **Modularidad y Escalabilidad:** Al seguir la arquitectura hexagonal, tu aplicación será más modular y fácil de escalar. Puedes añadir nuevos módulos siguiendo la misma estructura.

---

### **Conclusión**

Este ejemplo muestra cómo puedes estructurar una aplicación más compleja utilizando la arquitectura hexagonal en Node.js. Al separar claramente las responsabilidades entre el dominio, la aplicación y la infraestructura, obtienes un código más limpio, mantenible y escalable.

Recuerda que cada módulo sigue el mismo patrón:

1. **Dominio:** Define las entidades y los repositorios (interfaces).
2. **Aplicación:** Implementa los casos de uso.
3. **Infraestructura:** Implementa los repositorios (adaptadores), controladores y rutas.

