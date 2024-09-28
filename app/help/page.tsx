
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create a new task?",
      answer: "To create a new task, click the '+' button in the top right corner of your dashboard. Fill in the task details and click 'Save' to add it to your task list."
    },
    {
      question: "Can I collaborate with my team on TaskSprint?",
      answer: "Yes! TaskSprint offers robust collaboration features. You can invite team members, assign tasks, and communicate within the platform."
    },
    {
      question: "How do I track my productivity?",
      answer: "TaskSprint provides detailed analytics on your task completion rates, time spent on tasks, and overall productivity trends. Access these insights from the 'Analytics' tab in your dashboard."
    },
    {
      question: "Is my data secure on TaskSprint?",
      answer: "Absolutely. We use industry-standard encryption and security practices to ensure your data is safe and private."
    },
    {
      question: "Can I integrate TaskSprint with other tools?",
      answer: "Yes, TaskSprint offers integrations with popular tools like Slack, Google Calendar, and more. Check out our 'Integrations' page for a full list and setup instructions."
    }
  ]

  return (
    <div className="container mx-auto bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Search for help</h2>
        <div className="flex gap-2">
          <Input placeholder="Type your question here..." className="flex-grow" />
          <Button>Search</Button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem className="my-2" value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Need more help?</h2>
        <p className="mb-4">
          If you couldn't find the answer you were looking for, please don't hesitate to reach out to our support team.
        </p>
        <Link href="/contact" className="text-blue-600 hover:underline">
          Contact Support
        </Link>
      </div>
    </div>
  )
}