import Request from '../models/requestModel.js';
import File from '../models/fileModel.js';

// Create a new file request
export const createRequest = async (req, res) => {
    try {
        const { fileId } = req.body;
        const newRequest = new Request({
            fileId,
            requestedBy: req.user._id,
        });
        await newRequest.save();
        res.status(201).json({ message: 'File request created', request: newRequest });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create request', error: error.message });
    }
};

// Approve or deny a file request
export const approveRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const request = await Request.findById(id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        request.approvedBy = req.user._id;
        request.approvalDate = Date.now();
        await request.save();

        res.json({ message: `Request ${status.toLowerCase()} successfully`, request });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update request', error: error.message });
    }
};

// View all requests
export const getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('fileId').populate('requestedBy');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve requests', error: error.message });
    }
};
