import Data from '../models/Data.js';

// GET - Retrieve all data or filter by collection
export const getAllData = async (req, res) => {
  try {
    const { collection } = req.query;
    const filter = collection ? { collection } : {};

    const data = await Data.find(filter);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET - Retrieve a single data item by ID
export const getDataById = async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// POST - Create new data
export const createData = async (req, res) => {
  try {
    // Store the entire request body as the document
    const newData = await Data.create(req.body);
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// PUT - Update data by ID
export const updateData = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// DELETE - Delete data by ID
export const deleteData = async (req, res) => {
  try {
    const data = await Data.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// PATCH - Partially update data by ID
export const patchData = async (req, res) => {
  try {
    const data = await Data.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!data) {
      return res.status(404).json({ success: false, error: 'Data not found' });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};