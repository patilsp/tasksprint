"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Tag, Rocket, Crown, Star, ArrowLeft, HelpCircle, Users, Calendar, BarChart2, Zap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Dummy data for Task Sprint
const dummyProjects = [
  { id: 1, name: "Website Redesign", tasks: 24, members: 5, progress: 65 },
  { id: 2, name: "Mobile App Development", tasks: 36, members: 8, progress: 40 },
  { id: 3, name: "Marketing Campaign", tasks: 18, members: 4, progress: 80 },
]

const dummyTasks = [
  { id: 1, title: "Design Homepage", status: "In Progress", assignee: "Alice", dueDate: "2023-06-15" },
  { id: 2, title: "Implement User Authentication", status: "To Do", assignee: "Bob", dueDate: "2023-06-20" },
  { id: 3, title: "Create Social Media Posts", status: "Completed", assignee: "Charlie", dueDate: "2023-06-10" },
]

const plans = [
  {
    name: "Basic",
    icon: Tag,
    color: "text-blue-500",
    description: "Perfect for small teams and startups",
    projects: "5 Projects",
    users: "Up to 10 users",
    monthlyPrice: "$29",
    annualPrice: "$290",
    pricePerUser: "$2.90",
    annualSavings: "Save 17%",
    originalPrice: "$348",
    features: [
      "Unlimited tasks and subtasks",
      "Basic project templates",
      "File sharing (100MB per project)",
      "Basic reporting",
    ]
  },
  {
    name: "Pro",
    icon: Rocket,
    color: "text-purple-500",
    description: "Ideal for growing teams with advanced needs",
    projects: "Unlimited Projects",
    users: "Up to 50 users",
    monthlyPrice: "$99",
    annualPrice: "$990",
    pricePerUser: "$1.98",
    annualSavings: "Save 17%",
    originalPrice: "$1,188",
    highlighted: true,
    features: [
      "All Basic features",
      "Advanced project templates",
      "File sharing (1GB per project)",
      "Time tracking",
      "Custom fields",
      "Advanced reporting and analytics",
      "Integration with popular tools",
    ]
  },
  {
    name: "Enterprise",
    icon: Crown,
    color: "text-teal-500",
    description: "For large organizations requiring top-tier features and support",
    projects: "Unlimited Projects",
    users: "Unlimited users",
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    pricePerUser: "Contact sales",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security features",
      "Single Sign-On (SSO)",
      "API access",
      "24/7 priority support",
    ]
  },
]

const additionalFeatures = [
  "Real-time collaboration",
  "Mobile app access",
  "Email notifications",
  "Task dependencies",
  "Kanban board view",
]

const faqs = [
  {
    question: "How does Task Sprint compare to other project management tools?",
    answer: "Task Sprint offers a unique blend of simplicity and power. Unlike other tools that can be overwhelming, Task Sprint provides an intuitive interface while still offering advanced features like custom fields, time tracking, and powerful analytics. Our focus on real-time collaboration and flexible project views sets us apart."
  },
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be charged the prorated difference for the remainder of your billing cycle. If you downgrade, you'll receive a credit for the unused portion of your current plan."
  },
  {
    question: "Is there a limit to the number of tasks I can create?",
    answer: "No, all our plans offer unlimited tasks and subtasks. We believe in giving you the freedom to manage your projects without artificial limitations."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial of our Pro plan for new users. This allows you to experience all of Task Sprint's powerful features before making a commitment. No credit card is required to start your trial."
  },
]

const Subscription = () => {
  const [billingCycle, setBillingCycle] = useState('annual')

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start items-center mb-8">
          <Link href="/welcome">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl sm:tracking-tight lg:text-4xl">
            Choose Your Task Sprint Plan
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Supercharge your team's productivity with our <span className="text-orange-500 font-bold"> Task Sprint </span> project management solutions.
          </p>
        </motion.div>

        <div className="flex justify-center items-center mb-8">
         
          <Tabs className="p-2" value={billingCycle} onValueChange={setBillingCycle}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual">Annual</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between ${
                plan.highlighted ? 'border-purple-500 border-2 shadow-lg' : 'hover:border-purple-500 hover:shadow-md'
              } transition-all duration-300`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-2xl font-bold">
                    <plan.icon className={`w-8 h-8 ${plan.color} mr-2`} />
                    {plan.name}
                  </div>
                  {plan.highlighted && (
                    <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                </div>
                <p className="text-gray-500 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className={`text-3xl font-bold ${plan.color}`}>
                    {billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}
                    <span className="text-base font-normal text-gray-500">
                      {plan.monthlyPrice !== "Custom" ? (billingCycle === 'annual' ? '/year' : '/month') : ''}
                    </span>
                  </p>
                  {billingCycle === 'annual' && plan.annualSavings && (
                    <p className="text-sm text-green-600 font-semibold">{plan.annualSavings}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    {plan.pricePerUser} per user
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center font-semibold">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    {plan.users}
                  </li>
                  <li className="flex items-center font-semibold">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    {plan.projects}
                  </li>
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-800 hover:bg-gray-900'
                  }`}
                >
                  <Link href="/checkout">
                    {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold">
                <Zap className="w-8 h-8 mr-2" />
                Task Sprint Features for All Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-yellow-300 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 border shadow rounded-md p-2 bg-white"
        >
          <h2 className="text-3xl font-bold text-center my-10">Plan Comparison</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Feature</TableHead>
                  {plans.map(plan => (
                    <TableHead key={plan.name}>{plan.name}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Users</TableCell>
                  {plans.map(plan => (
                    <TableCell key={plan.name}>{plan.users}</TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Projects</TableCell>
                  {plans.map(plan => (
                    <TableCell key={plan.name}>{plan.projects}</TableCell>
                  ))}
                </TableRow>
                {plans[2].features.map((feature, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    {plans.map(plan => (
                      <TableCell key={plan.name}>
                        {plan.features.includes(feature) ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full mx-auto my-5 border shadow rounded-md p-2 bg-white">
            {faqs.map((faq, index) => (
              <AccordionItem className='mb-2' key={index} value={`item-${index}`}>
                <AccordionTrigger className='text-lg font-bold'>{faq.question}</AccordionTrigger>
                <AccordionContent className='text-sm text-gray-500'>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-gray-600 mb-4">Our team is here to help you find the perfect Task Sprint plan for your needs.</p>
          <Button>
            <HelpCircle className="mr-2 h-4 w-4" />
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Subscription