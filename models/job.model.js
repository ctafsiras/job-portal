const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    hiringManager: {
        name: String,
        email: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    company: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: [true, "Please provide company name"]
    },
    location: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: [true, "Please Provide location name"],
        lowercase: true,
    },
    jobType: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: [true, "Please give the job type"],
        lowercase: true,
    },
    salary: {
        minimum: {
            type: Number,
            required: [true, 'Please provide minimum salary'],
            min: 0,
            trim: true,
        },
        maximum: {
            type: Number,
            required: [true, 'Please provide Maximum salary'],
            min: 0,
            trim: true,
        }
    },
    deadline: {
        type: Date,
        required: [true, "Please provide the deadline"],
    }
},
    {
        timestamps: true
    });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;