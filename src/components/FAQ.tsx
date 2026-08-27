import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I schedule a dog walk?",
    answer:
      "Fill out the booking enquiry form on this page with your preferred dates, times, and walk length. I’ll confirm availability and arrange a meet-and-greet before the first walk.",
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
      "I work Monday to Friday. Walks leave at 9am, 12pm and 3pm, and home visits are at 11am and 2pm. I'm closed from 26–30 October and from 17 December to 2 January.",
  },
  {
    question: "How does the dog taxi work and what does it cost?",
    answer:
      "Tell me the pick-up and drop-off addresses and you'll get an instant price based on the driving distance: €15 under 5 km, €20 for 5–10 km, and €25 for 10–20 km. Journeys over 20 km are quoted on request — just get in touch.",
  },

  {
    question: "What happens if I need to cancel?",
    answer:
      "Please give at least 24 hours’ notice for cancellations. Cancellations within 24 hours may be charged at the full rate, as that slot is usually reserved specifically for your dog.",
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
    question: "Do you walk puppies?",
    answer:
      "Yes — puppy visits are designed for young dogs who aren’t ready for full walks yet. They include play, feeding, toilet breaks, and gentle socialisation.",
  },
  {
    question: "How do I pay?",
    answer:
      "Payment is due weekly or monthly by bank transfer. I’ll share details when your booking is confirmed.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-ocean/5" id="faq">
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

        <Accordion type="single" collapsible className="mt-12 rounded-2xl bg-card p-2 sm:p-4 shadow-sm border border-border/60">
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
