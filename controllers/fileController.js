const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configurer multer pour stocker les fichiers PDF
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Récupérer (Télécharger) un PDF par nom de fichier
exports.getPdf = (req, res) => {
    const filePath = path.join(__dirname, '../uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ message: 'PDF non trouvé' });
    }
  };

// Récupérer tous les noms de pdfs
exports.getAllPdfs = (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');
  
    // Lire le contenu du répertoire
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la lecture du répertoire', error: err });
      }
  
      // Filtrer les fichiers PDF
      const pdfFiles = files.filter(file => path.extname(file).toLowerCase() === '.pdf');
  
      // Retourner les noms de fichiers PDF
      res.json(pdfFiles);
    });
  };
