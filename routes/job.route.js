const express = require('express');
const { createJobController, getAllJobByManagerController, getJobByManagerByIdController, updateJobByIdController } = require('../controllers/job.controller');
const verifyRole = require('../middlewares/verifyRole');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/jobs',verifyToken, verifyRole('hiring-manager'), createJobController);
router.get('/manager/jobs', verifyToken, verifyRole('hiring-manager'), getAllJobByManagerController)
router.get('/manager/jobs/:id', verifyToken, verifyRole('hiring-manager'), getJobByManagerByIdController)
router.patch('/manager/jobs/:id', verifyToken, verifyRole('hiring-manager'), updateJobByIdController)

module.exports = router;