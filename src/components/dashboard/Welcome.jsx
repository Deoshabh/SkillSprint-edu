import React from 'react';
import { motion } from 'framer-motion';

const Welcome = ({ user }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <h1 className="text-3xl font-bold text-gray-900 mb-2">
      Welcome back, {user.name}! 👋
    </h1>
    <p className="text-gray-600">Ready to continue your learning journey?</p>
  </motion.div>
);

export default Welcome;