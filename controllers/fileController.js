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
