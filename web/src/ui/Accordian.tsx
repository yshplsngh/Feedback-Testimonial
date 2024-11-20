import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/accordian';

const faqData = [
  {
    value: 'item-1',
    question: 'What is Testimonial?',
    answer:
      'Testimonial is a feedback form integration website that is free to use and highly simplified.',
  },
  {
    value: 'item-2',
    question: 'How can Testimonial improve user feedback collection?',
    answer:
      'Testimonial improves user feedback collection by providing an easy-to-use and integrate feedback form, making it simple for users to give feedback.',
  },
  {
    value: 'item-3',
    question: 'What are the key features of Testimonial?',
    answer:
      'Key features of Testimonial include ease of use, seamless integration, and a simplified interface for collecting feedback from users.',
  },
  {
    value: 'item-4',
    question:
      'Is Testimonial suitable for both small businesses and large enterprises?',
    answer:
      'Yes, Testimonial is designed to be scalable and can accommodate the needs of both small businesses and large enterprises. Its simplicity makes it accessible for smaller teams, while its robust features can handle larger volumes of feedback for bigger organizations.',
  },
  {
    value: 'item-5',
    question: 'Can I customize the feedback form to match my brand?',
    answer:
      "As of now, Testimonial only offers certain themes and color options that allow you to adjust the look and feel of the feedback form to align with your brand's visual identity. But in future you can modify it more like fonts, custom colors and layout to ensure a seamless integration with your website or application.",
  },
];

const Accordian = () => {
  return (
    <div>
      <div className="mt-10 flex w-full flex-col rounded-xl px-5 py-10 backdrop-blur-sm backdrop-filter">
        <h1 className="mb-2 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl tracking-tighter text-transparent md:text-3xl">
          FAQ&apos;s
        </h1>
        <p className="mb-4 text-center text-sm text-gray-400 dark:text-gray-400">
          Some common FAQ&apos;s about Testimonial
        </p>
        <Accordion type="single" collapsible className="text-sm">
          {faqData.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-left text-white">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Accordian;
