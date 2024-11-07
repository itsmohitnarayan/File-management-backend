const FileAnalytics = require('../models/FileAnalytics');

exports.getFileMovementAnalytics = async (req, res) => {
  try {
    const analytics = await FileAnalytics.aggregate([
      {
        $group: {
          _id: "$department",
          avgMovementTime: { $avg: "$movementTime" },
        },
      },
    ]);
    res.json({ analytics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
