const File = require('../models/file');

exports.requestFile = async (req, res) => {
  try {
    const { name, currentDepartment } = req.body;
    const file = new File({ name, currentDepartment });
    await file.save();
    res.status(201).json({ file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.approveFileMovement = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    file.status = 'approved';
    file.movementHistory.push({ 
      department: file.currentDepartment, 
      action: 'approved', 
      timestamp: new Date() 
    });
    await file.save();
    res.json({ file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.trackFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.json({ history: file.movementHistory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
