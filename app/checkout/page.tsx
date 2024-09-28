"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, CreditCard, Lock } from 'lucide-react'
import Link from 'next/link'

const plans = [
  { name: "Basic", price: "$29/month" },
  { name: "Pro", price: "$99/month" },
  { name: "Enterprise", price: "Custom" },
]

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState(plans[1].name)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/subscription" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Plans
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Complete Your Subscription</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>Enter your card information to complete the subscription</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <Input placeholder="Address Line 1" />
                  <Input placeholder="Address Line 2" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="City" />
                    <Input placeholder="State/Province" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="ZIP/Postal Code" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        {/* Add more countries as needed */}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                  {plans.map((plan) => (
                    <div key={plan.name} className="flex items-center space-x-2">
                      <RadioGroupItem value={plan.name} id={plan.name} />
                      <Label htmlFor={plan.name}>{plan.name} - {plan.price}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{selectedPlan === "Enterprise" ? "Custom" : plans.find(p => p.name === selectedPlan)?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>Calculated at next step</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{selectedPlan === "Enterprise" ? "Custom" : plans.find(p => p.name === selectedPlan)?.price}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Complete Subscription
                </Button>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Secure payment processed by Stripe</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the <Link href="/terms" className="text-blue-500 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
            </label>
          </div>
        </motion.div>
      </div>
    </div>
  )
}