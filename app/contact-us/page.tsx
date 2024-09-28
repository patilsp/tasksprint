import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | TaskSprint',
  description: 'Get in touch with the TaskSprint team for support or inquiries.',
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="mb-4">
            We'd love to hear from you! Whether you have a question about our services,
            need technical support, or want to partner with us, our team is ready to assist you.
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Our Office</h2>
            <p>123 TaskSprint Way</p>
            <p>Productivity City, TS 12345</p>
            <p>United States</p>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
            <p>Email: support@tasksprint.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Business Hours</h2>
            <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}