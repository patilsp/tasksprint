"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center text-blue-600" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About TaskSprint
      </motion.h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        {/* Description Section */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-lg text-gray-700">
            TaskSprint was founded in 2023 with a simple mission: to help individuals and teams
            achieve more by working smarter, not harder. Our platform combines cutting-edge
            technology with intuitive design to create a productivity tool that adapts to your
            unique workflow.
          </p>
          <p className="text-lg text-gray-700">
            We believe that everyone has the potential to be extraordinarily productive, and
            our goal is to unlock that potential through intelligent task management, seamless
            collaboration, and data-driven insights.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div 
          className="relative h-64 md:h-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="TaskSprint team collaborating"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </div>

      {/* Core Values Section */}
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center text-indigo-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Core Values
      </motion.h2>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Innovation', description: 'We constantly push the boundaries of what\'s possible in productivity software.' },
          { title: 'User-Centric', description: 'Every feature we develop is designed with our users\' needs in mind.' },
          { title: 'Collaboration', description: 'We believe great things happen when people work together seamlessly.' },
        ].map((value, index) => (
          <motion.div 
            key={index} 
            className="bg-blue-100 p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">{value.title}</h3>
            <p className="text-gray-700">{value.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Team Section */}
      <motion.h2 
        className="text-3xl font-bold mb-6 text-center text-indigo-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meet the Team
      </motion.h2>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { name: 'Jane Doe', role: 'CEO & Founder', image: '/images/avatar.jpg?height=200&width=200' },
          { name: 'John Smith', role: 'CTO', image: '/images/avatar.jpg?height=200&width=200' },
          { name: 'Alice Johnson', role: 'Head of Design', image: '/images/avatar.jpg?height=200&width=200' },
          { name: 'Bob Williams', role: 'Lead Developer', image: '/images/avatar.jpg?height=200&width=200' },
        ].map((member, index) => (
          <motion.div 
            key={index} 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + index * 0.1 }}
          >
            <div className="relative w-40 h-40 mx-auto mb-4">
              <Image
                src={member.image}
                alt={member.name}
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg"
              />
            </div>
            <h3 className="font-semibold text-lg text-blue-600">{member.name}</h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
