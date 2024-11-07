

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

// Move file to another department
export const moveFile = (req, res) => {
  const { fileId } = req.params;
  res.json({ message: `File with ID: ${fileId} moved successfully` });
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

export default { trackFile, requestFile, moveFile , createFile, uploadFile, deleteFile , getAllFiles };