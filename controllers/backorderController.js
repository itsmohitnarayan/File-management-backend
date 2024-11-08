// controllers/backorderController.js
import Backorder from '../models/Backorder.js';

// Get all backorders
export const getBackorders = async (req, res) => {
  try {
    const backorders = await Backorder.find().populate('itemId');
    res.json(backorders);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving backorders', error: err.message });
  }
};

// Update backorder status
export const updateBackorderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const backorder = await Backorder.findById(id);
    if (!backorder) {
      return res.status(404).json({ message: 'Backorder not found' });
    }

    backorder.status = status;
    await backorder.save();

    // If fulfilled, update the item’s backorder field
    if (status === 'fulfilled') {
      const item = await InventoryItem.findById(backorder.itemId);
      item.backorder = false;
      await item.save();
    }

    res.json(backorder);
  } catch (err) {
    res.status(500).json({ message: 'Error updating backorder status', error: err.message });
  }
};
