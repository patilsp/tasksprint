"use client";

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const slides = [
  {
    image: '/images/svg/1.svg?height=200&width=200',
    title: 'Welcome to TaskSprint',
    description: 'Boost your team\'s productivity with our powerful employee management system.'
  },
  {
    image: '/images/svg/2.svg?height=200&width=200',
    title: 'Streamline Workflows',
    description: 'Efficiently manage tasks, projects, and team collaboration in one place.'
  },
  {
    image: '/images/svg/3.svg?height=200&width=200',
    title: 'Track Progress',
    description: 'Monitor team performance and project milestones with ease.'
  }
]

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const isLastSlide = currentSlide === slides.length - 1

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md overflow-hidden" style={{ height: '90vh' }}>
        <div className="relative h-full">
          {/* Skip link */}
          <a href="/dashboard" className="absolute flex items-center  top-4 right-4 text-sm text-gray-600 dark:text-white z-10">
            Skip  <ChevronRight className="ml-2 w-5 h-5" />
          </a>

          {/* Carousel with Framer Motion */}
          <div className="h-full flex flex-col">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="flex-1 flex flex-col items-center justify-center px-8 pt-12 pb-8"
            >
              <motion.img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-48 h-48 object-cover mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              <motion.h2
                className="text-2xl font-bold mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                className="text-center text-gray-700 dark:text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {slides[currentSlide].description}
              </motion.p>
            </motion.div>

            {/* Navigation Button with Framer Motion */}
            <div className="px-8 pb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isLastSlide ? () => router.push('/dashboard') : nextSlide}
                className={`w-full py-3 rounded-full text-white font-semibold flex items-center justify-center ${
                  isLastSlide ? 'bg-green-500' : 'bg-blue-500 dark:bg-white dark:text-black'
                }`}
                transition={{ duration: 0.3 }}
              >
                {isLastSlide ? 'Get Started' : (
                  <>
                    Next
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center pb-8">
              {slides.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentSlide === index ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
