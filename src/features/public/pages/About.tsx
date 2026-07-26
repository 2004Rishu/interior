import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-sand-50 py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl font-serif text-charcoal-900 sm:text-5xl md:text-6xl">
            Elevating the standard of interior design matchmaking.
          </h1>
        </motion.div>

        <div className="mt-20 space-y-16">
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-sand mx-auto text-sand-800"
          >
            <p className="text-xl leading-relaxed">
              Finding the right interior designer shouldn’t be a gamble. We noticed a gap in the industry: clients were overwhelmed by generic directories, while talented designers struggled to find projects that matched their aesthetic and expertise.
            </p>
            <p className="text-xl leading-relaxed mt-6">
              Interior Me was born out of a simple idea: design is personal, and the process of finding your designer should be just as thoughtful. We act as your trusted mediator, hand-picking professionals who don't just meet your budget, but truly understand your vision.
            </p>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Design Studio" 
              className="w-full aspect-[21/9] object-cover"
            />
          </motion.div>

           <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-sand mx-auto text-sand-800"
          >
            <h2 className="text-2xl font-serif text-charcoal-900 mt-12 mb-6">Our Vetting Process</h2>
            <p className="text-xl leading-relaxed">
              We don't accept everyone. Every designer in our network has undergone a rigorous review of their portfolio, client history, and communication style. We ensure that when you start a project with Interior Me, you are working with the best in the business.
            </p>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
