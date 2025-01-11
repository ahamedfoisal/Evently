// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['manager', 'attendee'], required: true },
});

// Hash password before saving
// UserSchema.pre('save', async function (next) {
//     console.log(this.password)

//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   console.log(this.password)
//   next();
// });

export default mongoose.model('User', UserSchema);