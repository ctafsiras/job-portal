const Job = require("../models/job.model");

exports.createJobService = async (data) => {
    const job = await Job.create(data);
    return job;
}
exports.getAllJobByManagerService = async (email) => {
    const jobs = await Job.find({ "hiringManager.email": email });
    return jobs;
}
exports.getJobByIdService = async (id) => {
    const job = await Job.findOne({ _id: id });
    return job;
}
exports.updateJobByIdService = async (id, data) => {
    const job = await Job.updateOne({ _id: id }, data, { runValidators: true , new: true});
    return job;
}