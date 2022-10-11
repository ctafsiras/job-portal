const { createJobService, getAllJobByManagerService, getJobByIdService, updateJobByIdService } = require("../services/job.service");
const { getUser } = require("../services/user.service");

exports.createJobController = async (req, res) => {
    try {
        const jobInfo = req.body;
        const email = req.decoded.email;
        const manager = await getUser(email);

        jobInfo.hiringManager = {
            name: manager.name,
            email: manager.email
        }

        const job = await createJobService(jobInfo);
        res.status(200).json({
            status: 'success',
            message: "Job Created successfully!",
            data: job
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't create the Job!",
            error
        })
    }
}
exports.getAllJobByManagerController = async (req, res) => {
    try {
        const email = req.decoded.email;
        const jobs = await getAllJobByManagerService(email);


        res.status(200).json({
            status: 'success',
            message: "Job fetched successfully!",
            data: jobs
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't all the Job!",
            error
        })
    }
}
exports.getJobByManagerByIdController = async (req, res) => {
    try {
        const email = req.decoded.email;
        const id = req.params.id
        const job = await getJobByIdService(id);
        if (job.hiringManager.email !== email) {
            return res.status(401).json({
                status: 'fail',
                message: "Only hiring manager can see his/her job"
            })
        }
        res.status(200).json({
            status: 'success',
            message: "Job fetched successfully!",
            data: job
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't get the Job!",
            error
        })
    }
}
exports.updateJobByIdController = async (req, res) => {
    try {
        const email = req.decoded.email;
        const id = req.params.id;
        const data=req.body;
        const job = await getJobByIdService(id);
        if (job.hiringManager.email !== email) {
            return res.status(401).json({
                status: 'fail',
                message: "Only hiring manager can update his/her job"
            })
        }
        const result = await updateJobByIdService(id, data);
        res.status(200).json({
            status: 'success',
            message: "Job Updated successfully!",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't update the Job!",
            error
        })
    }
}