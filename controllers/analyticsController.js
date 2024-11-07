import FileAnalytics from '../models/FileAnalytics.js';


import File from '../models/fileModel.js';

export const getFileMovementAnalytics = async (req, res) => {
  try {
    const analytics = await FileAnalytics.find();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovementAnalytics = async (req, res) => {
  try {
      const files = await File.find({ "movements.1": { $exists: true } }); // Files with at least two movements

      let totalMovementTime = 0;
      let movementCount = 0;

      files.forEach((file) => {
          for (let i = 1; i < file.movements.length; i++) {
              const prevMovement = file.movements[i - 1];
              const currentMovement = file.movements[i];

              const timeDiff = currentMovement.movedAt - prevMovement.movedAt;
              totalMovementTime += timeDiff;
              movementCount++;
          }
      });

      const averageMovementTime = movementCount > 0 ? totalMovementTime / movementCount : 0;

      res.json({
          averageMovementTime: averageMovementTime / (1000 * 60 * 60), // Convert to hours
          message: 'Movement analytics calculated successfully',
      });
  } catch (error) {
      res.status(500).json({ message: 'Failed to calculate movement analytics', error: error.message });
  }
};
