import { useState } from "react";
import Layout from "../../components/layout";
import "../../src/app/globals.css";

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our products, add items to your cart, and proceed to checkout.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other secure payment methods.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once shipped, you'll receive a tracking number via email to monitor your package.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. See our Returns page for details.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Layout title="Help Center">
      <div className="container py-5">
        <h1 className="text-center mb-3 display-5 fw-bold">Help Center</h1>
        <p className="text-center text-muted mb-5">
          Have questions? We're here to help!
        </p>

        <div className="accordion-custom">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item-custom">
              <button
                className={`accordion-header-custom ${
                  activeIndex === index ? "active" : ""
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <span className="accordion-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`accordion-body-custom ${
                  activeIndex === index ? "open" : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-4 border-top text-center">
          <h3 className="h4 mb-2 fw-semibold">Still need help?</h3>
          <p className="text-muted mb-3">
            Our customer service team is available 24/7 to assist you.
          </p>
          <a
            href="/contact"
            className="btn btn-primary px-4 py-2"
          >
            Contact Us
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;
