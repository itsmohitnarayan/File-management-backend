// controllers/inventoryRequestController.js
import InventoryRequest from '../models/InventoryRequest.js';



// Create a new request
export const createRequest = async (req, res) => {
    const { department, item, quantity } = req.body;
    try {
        const newRequest = new InventoryRequest({
            department,
            item,
            quantity,
            requestedBy: req.user.id, // Assuming user is authenticated
        });
        await newRequest.save();
        res.status(201).json(newRequest);
    } catch (err) {
        res.status(500).json({ message: 'Error creating request', error: err.message });
    }
};

// Fetch all requests

export const getAllRequests = async (req, res) => {
    try {
        const requests = await InventoryRequest.find()
            .populate('requestedBy', 'name')
            .populate('approvedBy', 'name');
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching requests', error: err.message });
    }
};

// Approve or Reject request
export const approveRequest = async (req, res) => {
    const { requestId } = req.params;
    const { status, remarks } = req.body;
    try {
        const request = await InventoryRequest.findById(requestId);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        
        // Check for valid status
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        request.status = status;
        request.remarks = remarks;
        request.approvedBy = req.user.id;
        request.dateApproved = Date.now();
        
        await request.save();
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json({ message: 'Error approving request', error: err.message });
    }
};
