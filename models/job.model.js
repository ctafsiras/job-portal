import mongoose from 'mongoose';
import validator from 'validator';
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
        required: true
    },
    location: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: true,
        lowercase: true,
    },
    jobType: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 15,
        required: true,
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
    deadline:{
        type: Date,
        required: true,
    }
},
    {
        timestamps: true
    });

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;