const express = require('express');
const taskRoutes = require('./routes/taskRoutes'); // Import des routes
const ConnectDB = require('./config/db'); // Import de la base de données
const app = express();
require('dotenv').config(); // Charger les variables d'environnement depuis .env

// Configurer EJS comme moteur de vue
app.set('view engine', 'ejs');

// Middleware
app.use(express.json()); // Pour lire les données JSON dans les requêtes

// Connecter la base de données
ConnectDB();

// Routes pour API
app.use('/api/tasks', taskRoutes);

// Routes pour les vues
app.get('/', (req, res) => {
    res.render('index');
});

// Lancer le serveur sur le port 5000 par défaut selon .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
