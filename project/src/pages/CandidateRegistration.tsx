import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CandidateRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    college: '',
    department: '',
    year: '',
    phone: '',
    position: '',
    manifesto: '',
    password: '',
    confirmPassword: ''
  });

  const positions = [
    'Student Body President',
    'Vice President',
    'Secretary',
    'Treasurer',
    'Department Representative',
    'Sports Secretary',
    'Cultural Secretary'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Get existing candidates
    const existingCandidates = JSON.parse(localStorage.getItem('registeredCandidates') || '[]');
    
    // Create new candidate
    const newCandidate = {
      id: Date.now().toString(),
      name: formData.fullName,
      position: formData.position,
      manifesto: formData.manifesto,
      status: 'pending'
    };

    // Save to localStorage
    localStorage.setItem('registeredCandidates', 
      JSON.stringify([...existingCandidates, newCandidate])
    );

    toast.success('Registration successful! Your candidacy is under review.');
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
          <Users className="h-12 w-12 text-red-600 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800">Candidate Registration</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Student ID</label>
              <input
                type="text"
                name="studentId"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Position</label>
              <select
                name="position"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              >
                <option value="">Select Position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Department</label>
              <input
                type="text"
                name="department"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
            <label className="text-gray-700 font-medium">Election Manifesto</label>
            <textarea
              name="manifesto"
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              onChange={handleChange}
              placeholder="Write your election manifesto here..."
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onChange={handleChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
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
            Register as Candidate
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default CandidateRegistration;