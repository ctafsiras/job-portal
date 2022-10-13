const { createJobService, getAllJobByManagerService, getJobByIdService, updateJobByIdService, getAllJobsService, applyJobByIdService } = require("../services/job.service");
const { getUser } = require("../services/user.service");


// manager routes in the job field.
exports.createJobController = async (req, res) => {
    try {
        const jobInfo = req.body;
        const email = req.decoded.email;
        const manager = await getUser(email);

        jobInfo.hiringManager = {
            name: manager.name,
            email: manager.email,
            _id: manager._id
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
        const data = req.body;
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

// candidate routes in the job field.

exports.getAllJobsController = async (req, res) => {
    try {
        const queries = {};

        if (req.query.location) {
            const filterBy = { location: req.query.location };
            queries.filterBy = filterBy;
        }
        if (req.query.jobType) {
            queries.filterBy = { ...queries.filterBy, jobType: req.query.jobType };
        }
        // if (req.query.salaryRange) {
        //     const [min, max]=req.query.salaryRange.split('-');
        //     console.log(min, max);
        //     queries.filterBy = { ...queries.filterBy, salary :{maximum : {$lte: max}} };
        // }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }
        const jobs = await getAllJobsService(queries);
        res.status(200).json({
            status: 'success',
            message: "All Job fetched successfully!",
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
exports.getJobByIdController = async (req, res) => {
    try {
        const job = await getJobByIdService(req.params.id);
        job.candidates = undefined;
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
exports.applyJobByIdController = async (req, res) => {
    try {
        const job = await getJobByIdService(req.params.id);
        const user = await getUser(req.decoded.email);
        const candidate = {
            name: user.name,
            email: user.email,
            resume: req.file.filename,
            _id: user._id
        }
        const candidatesEmails = job.candidates.map(c => c.email)
        if (candidatesEmails.includes(candidate.email)) {
            return res.status(400).json({
                status: 'fail',
                message: "You have already applied the Job!"
            })
        }

        const today = new Date();
        const deadline = Date.parse(job.deadline);
        if (deadline < today.getTime()) {
            return res.status(400).json({
                status: 'fail',
                message: "Deadline is expired!"
            })
        }


        const result = await applyJobByIdService(req.params.id, candidate);

        res.status(200).json({
            status: 'success',
            message: "Job Applied successfully!",
            data: result
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: "Couldn't applied the Job!",
            error
        })
    }
}