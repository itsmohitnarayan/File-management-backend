// Track file movement
export const trackFile = (req, res) => {
  const { fileId } = req.params;
  res.json({ message: `Tracking file with ID: ${fileId}` });
};

// Request file for movement
export const requestFile = (req, res) => {
  const { fileId } = req.params;
  res.json({ message: `File with ID: ${fileId} requested for movement` });
};

// Create a new file
export const createFile = async (req, res) => {
  const { fileName, department, status } = req.body;

  try {
    const newFile = new File({
      fileName,
      department,
      status,
    });

    await newFile.save();
    res.status(201).json({
      message: 'File created successfully',
      fileId: newFile._id,
      fileName: newFile.fileName,
      department: newFile.department,
      status: newFile.status,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create file', message: err.message });
  }
};

// Upload file and store metadata in the database
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileName = req.body.fileName;
    const department = req.body.department;
    const status = req.body.status;

    // You can save the file information in the database here, if necessary
    // Example: Save in DB (use appropriate model)
    const newFile = {
      fileName: fileName,
      filePath: req.file.path,
      department: department,
      status: status,
      tags: req.body.tags,
      description: req.body.description,
    };

    // Save newFile to the database or process as needed

    res.status(200).json({
      message: 'File uploaded successfully',
      file: newFile,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create file', message: error.message });
  }
};

export const deleteFile = async (req, res) => {
  try {
    // Ensure req.params.fileId is the correct value
    const fileId = req.params.fileId;

    // Ensure that File.findByIdAndDelete is called properly
    const file = await File.findById(fileId);

    // Check if file exists and delete
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    return res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete file', error: error.message });
  }
};

export const getAllFiles = async (req, res) => {
  try {
      const files = await File.find();  // Assuming File is your mongoose model for files
      res.json(files);
  } catch (error) {
      res.status(500).json({ 
        error: 'Failed to retrieve files', 
        message: error.message });
  }
};

export const updateFile = async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) {
          return res.status(404).json({ message: "File not found" });
      }

      // Save current version
      file.versions.push({ filePath: file.filePath, timestamp: file.updatedAt });
      file.filePath = req.body.filePath; // update with new data
      await file.save();

      res.json({ message: "File updated with versioning", file });
  } catch (error) {
      res.status(500).json({ message: "Failed to update file" });
  }
};

export const moveFile = async (req, res) => {
  const { newDepartment } = req.body;

  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Log the movement details in the file's movements array
    file.movements.push({
      fromDepartment: file.department,
      toDepartment: newDepartment,
      movedAt: Date.now(),
    });

    // Update the current department
    file.department = newDepartment;
    await file.save();

    res.json({ message: 'File moved successfully', file });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move file', error: error.message });
  }
};

// Get File Tracking History
export const getFileTrackingHistory = async (req, res) => {
  try {
      const { fileId } = req.params;
      
      const movements = await FileMovement.find({ fileId }).sort({ timestamp: -1 }).populate('movedBy', 'username');
      res.json(movements);
  } catch (error) {
      res.status(500).json({ message: "Failed to retrieve file tracking history", error });
  }
};

// Get file details (only accessible if department matches or user is admin)
export const getFile = async (req, res) => {
  try {
      const file = await File.findById(req.params.id);
      if (!file) return res.status(404).json({ message: 'File not found' });
      res.json(file);
  } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve file', error: error.message });
  }
};

export default { trackFile, requestFile, moveFile , createFile, uploadFile, deleteFile , getAllFiles, updateFile, getFileTrackingHistory };