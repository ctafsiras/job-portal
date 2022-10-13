const Job = require("../models/job.model");


// manager routes in the job field.
exports.createJobService = async (data) => {
    const job = await Job.create(data);
    return job;
}
exports.getAllJobByManagerService = async (email) => {
    const jobs = await Job.find({ "hiringManager.email": email }).select('-hiringManager -candidates');
    return jobs;
}
exports.getJobByIdService = async (id) => {
    const job = await Job.findOne({ _id: id });
    return job;
}
exports.updateJobByIdService = async (id, data) => {
    const job = await Job.updateOne({ _id: id }, data, { runValidators: true, new: true });
    return job;
}

// candidate routes in the job field.

exports.getAllJobsService = async (queries) => {
    const jobs = await Job.find(queries.filterBy).select('-hiringManager -candidates').sort(queries.sortBy);
    return jobs;
}
exports.getJobByIdService = async (_id) => {
    const job = await Job.findOne({ _id });
    return job;
}
exports.applyJobByIdService = async (_id, candidate) => {
    const result = await Job.updateOne({ _id }, { $push: { candidates: candidate } });
    return result;
}