import mongoose from 'mongoose';
import Organization from './Organization.js';


const SuperAdminSchema = new mongoose.Schema({
    superadminname:{type:String,required:true},
    superadminmail:{type:String,required:true},
    superadminpassword:{type:String,required:true},
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    
}, {
    timestamps: true
});

const SuperAdmin = mongoose.model('SuperAdmin', SuperAdminSchema);
export default SuperAdmin;
