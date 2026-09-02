import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I schedule a dog walk?",
    answer:
      "Book a free consult and then book online, or contact me with your request.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "I walk and visit dogs in Delgany, Greystones, and Kilcoole, County Wicklow. If you’re just outside these areas, send me a message — I may still be able to help.",
  },
  {
    question: "How long are the walks?",
    answer:
      "All dog walks are 75 minutes door to door for €20. Home visits are 30 or 60 minutes to suit your schedule.",
  },
  {
    question: "What times and days are available?",
    answer:
      "I work Monday to Friday. Walks leave at 9am, 12pm and 3pm, and home visits are at 11am, 2pm and 5pm. I'm closed from 26–30 October and from 17 December to 2 January.",
  },

  {
    question: "What happens if I need to cancel?",
    answer:
      "Just let me know as soon as you can if you need to cancel or reschedule, so I can offer the slot to another dog.",
  },
  {
    question: "Will my dog be off-lead?",
    answer:
      "Only if you have given written permission and I am confident in your dog’s recall. Safety comes first, so all dogs are assessed on a lead first.",
  },
  {
    question: "What should I expect on a walk?",
    answer:
      "Your dog will get a structured, fun outing with plenty of sniffing, exercise, and social time if suitable. I send updates and photos, and every walk ends with paws wiped and water refreshed.",
  },
  {
    question: "How do I pay?",
    answer:
      "Payment is due weekly or monthly by bank transfer. I’ll share details when your booking is confirmed.",
  },
];

export function FAQ() {
  return (
    <section className="py-12 sm:py-16 bg-ocean/5" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-teal">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions answered
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything you need to know about scheduling, cancellations, and what happens on a Dog Squad walk.
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-8 rounded-2xl bg-card p-2 sm:p-4 shadow-sm border border-border/60">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="px-4">
              <AccordionTrigger className="font-display text-base font-semibold text-card-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
