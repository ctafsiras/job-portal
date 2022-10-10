import mongoose from 'mongoose';
import validator from 'validator';
const { Schema } = mongoose;

const applicationSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job'

    },
    candidate: {
        name: String,
        email: String,
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    qualification: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        enum: {
            values:['SSC', 'HSC', 'Degree'],
            message: 'qualification must be SSC/HSC/Degree'
        },
    }
},
    {
        timestamps: true
    });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;