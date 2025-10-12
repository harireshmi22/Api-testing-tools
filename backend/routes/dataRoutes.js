import express from 'express';
import {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  patchData
} from '../controllers/dataController.js';

const router = express.Router();

// Routes for /api/data
router.route('/')
  .get(getAllData)
  .post(createData);

// Routes for /api/data/:id
router.route('/:id')
  .get(getDataById)
  .put(updateData)
  .delete(deleteData)
  .patch(patchData);

export default router;