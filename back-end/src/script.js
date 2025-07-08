const fs = require('fs');
const path = require('path');

const modelName = process.argv[2];

if (!modelName) {
  console.error('Usage : node generateCrud.js <NomModel>');
  process.exit(1);
}

const lower = modelName.toLowerCase();
const plural = lower + 's';
const controllerName = `${lower}Controller.js`;
const routeName = `${lower}Routes.js`;

// Génération du controller
const controllerContent = `const models = require('../database/models/index');

const create${modelName} = async (req, res) => {
  try {
    const data = await models.${modelName}.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const get${modelName} = async (req, res) => {
  try {
    const data = await models.${modelName}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: '${modelName} non trouvé' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAll${modelName}s = async (req, res) => {
  try {
    const data = await models.${modelName}.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update${modelName} = async (req, res) => {
  try {
    const data = await models.${modelName}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: '${modelName} non trouvé' });
    await data.update(req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const delete${modelName} = async (req, res) => {
  try {
    const data = await models.${modelName}.findByPk(req.params.id);
    if (!data) return res.status(404).json({ error: '${modelName} non trouvé' });
    await data.destroy();
    res.json({ message: '${modelName} supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create${modelName},
  get${modelName},
  getAll${modelName}s,
  update${modelName},
  delete${modelName},
};
`;

// Génération des routes
const routesContent = `const express = require('express');
const router = express.Router();
const {
  create${modelName},
  get${modelName},
  getAll${modelName}s,
  update${modelName},
  delete${modelName}
} = require('../controllers/${lower}Controller');

router.post('/', create${modelName});
router.get('/', getAll${modelName}s);
router.get('/:id', get${modelName});
router.put('/:id', update${modelName});
router.delete('/:id', delete${modelName});

module.exports = router;
`;

// Écriture des fichiers
const controllerPath = path.join(__dirname, 'controllers', controllerName);
const routesPath = path.join(__dirname, 'routes', routeName);

fs.writeFileSync(controllerPath, controllerContent);
console.log(`✅ Controller généré : ${controllerPath}`);

fs.writeFileSync(routesPath, routesContent);
console.log(`✅ Route générée : ${routesPath}`);
