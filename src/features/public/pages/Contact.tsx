import { motion } from 'motion/react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-serif text-charcoal-900 sm:text-5xl">Get in touch.</h1>
            <p className="mt-6 text-lg text-sand-700 max-w-md">
              Whether you have a question about our process or want to discuss a potential partnership, we're here to help.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-start">
                <Mail className="mt-1 h-6 w-6 text-sand-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-charcoal-900">Email</h3>
                  <p className="mt-1 text-sand-600">hello@interiorme.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mt-1 h-6 w-6 text-sand-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-charcoal-900">Phone & WhatsApp</h3>
                  <p className="mt-1 text-sand-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="mt-1 h-6 w-6 text-sand-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-charcoal-900">Headquarters</h3>
                  <p className="mt-1 text-sand-600">New York, NY<br/>Available nationwide.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-12 shadow-sm"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-charcoal-900">Full Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-2 block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal-900">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="mt-2 block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal-900">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-2 block w-full border-b border-sand-300 bg-transparent py-2 text-charcoal-900 focus:border-charcoal-900 focus:outline-none focus:ring-0 transition-colors"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-charcoal-900 py-4 text-sm font-medium text-white transition-colors hover:bg-charcoal-800"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
