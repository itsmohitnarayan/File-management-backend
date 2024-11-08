import Tender from '../models/Tender.js';

export const createTender = async (req, res) => {
  try {
    const newTender = new Tender(req.body);
    const savedTender = await newTender.save();
    res.status(201).json(savedTender);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tender' });
  }
};

export const closeTender = async (req, res) => {
  try {
    const closedTender = await Tender.findByIdAndUpdate(req.params.id, { status: 'Closed' }, { new: true });
    res.status(200).json(closedTender);
  } catch (error) {
    res.status(500).json({ error: 'Failed to close tender' });
  }
};
