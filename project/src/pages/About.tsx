import React from 'react';
import { motion } from 'framer-motion';
import { Vote, Shield, Users, BarChart2 } from 'lucide-react';

function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Why Your Vote Matters
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Every vote contributes to shaping the future of our college community
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <Vote className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Shape Your College Experience
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your vote directly influences campus policies, student activities, and academic initiatives. 
            By participating in elections, you help create the college environment you want to see.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <Shield className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Develop Leadership Skills
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Engaging in the democratic process helps develop critical thinking, decision-making, 
            and civic responsibility - essential skills for your future career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <Users className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Create Positive Change
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Your vote can lead to improvements in campus facilities, academic programs, 
            and student services. Every vote contributes to making your college a better place.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-md"
        >
          <BarChart2 className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Build Community
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Participating in elections strengthens the sense of community and ensures 
            diverse voices are heard in decision-making processes.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
        <p className="text-lg mb-6">
          Join us in shaping the future of our college community through democratic participation.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/voter-registration'}
          className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold"
        >
          Register Now
        </motion.button>
      </motion.div>
    </div>
  );
}

export default About;