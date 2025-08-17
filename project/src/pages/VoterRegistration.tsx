import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function VoterRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    college: '',
    department: '',
    year: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Get existing voters or initialize empty array
    const existingVoters = JSON.parse(localStorage.getItem('registeredVoters') || '[]');
    
    // Check if email already exists
    if (existingVoters.some((voter: any) => voter.email === formData.email)) {
      toast.error('This email is already registered!');
      return;
    }

    // Create new voter object
    const newVoter = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      studentId: formData.studentId,
      email: formData.email,
      college: formData.college,
      department: formData.department,
      year: formData.year,
      phone: formData.phone,
      password: formData.password
    };

    // Add new voter to storage
    localStorage.setItem('registeredVoters', JSON.stringify([...existingVoters, newVoter]));

    toast.success('Registration successful! Please login to continue.');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="flex items-center justify-center mb-8">
          <UserPlus className="h-12 w-12 text-red-600 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Voter Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Student ID</label>
              <input
                type="text"
                name="studentId"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">College</label>
              <input
                type="text"
                name="college"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Department</label>
              <input
                type="text"
                name="department"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Year</label>
              <select
                name="year"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-2"
            >
              <label className="text-gray-700 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Register as Voter
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default VoterRegistration;