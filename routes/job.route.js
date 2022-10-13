const express = require('express');
const { createJobController, getAllJobByManagerController, getJobByManagerByIdController, updateJobByIdController, getAllJobsController, getJobByIdController, applyJobByIdController } = require('../controllers/job.controller');
const uploader = require('../middlewares/uploader');
const verifyRole = require('../middlewares/verifyRole');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();


// manager routes in the job field.
router.post('/jobs', verifyToken, verifyRole('hiring-manager'), createJobController);
router.get('/manager/jobs', verifyToken, verifyRole('hiring-manager'), getAllJobByManagerController)
router.get('/manager/jobs/:id', verifyToken, verifyRole('hiring-manager'), getJobByManagerByIdController)
router.patch('/manager/jobs/:id', verifyToken, verifyRole('hiring-manager'), updateJobByIdController)

// candidate routes in the job field.
router.get('/jobs', verifyToken, getAllJobsController)
router.post('/jobs/:id/apply', verifyToken, uploader.single('resume'),applyJobByIdController)
router.get('/jobs/:id', verifyToken, getJobByIdController)

module.exports = router;