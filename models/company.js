import { Schema, model, models } from 'mongoose';

const CompanySchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, 'Company Name is required.'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
  },
  address: {
    type: String,
  },

  status: {
    type: String,
  },
  location: {
    type: String,
  },
  pincode: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Company = models.Company || model('Company', CompanySchema);

export default Company;
