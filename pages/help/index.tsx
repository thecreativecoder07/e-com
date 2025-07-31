import Layout from "../../components/layout";


const HelpPage = () => {
  const faqs = [
    {
      question: "How do I place an order?",
      answer: "Simply browse our products, add items to your cart, and proceed to checkout."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and other secure payment methods."
    },
    {
      question: "How can I track my order?",
      answer: "Once shipped, you'll receive a tracking number via email to monitor your package."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. See our Returns page for details."
    }
  ];

  return (
    <Layout title="Help Center">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="display-4 mb-4 text-center">Help Center</h1>
            <p className="lead text-center mb-5">
              Have questions? We're here to help!
            </p>

            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item mb-3 border-0 shadow-sm" key={index}>
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target={`#faqCollapse${index}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div 
                    id={`faqCollapse${index}`} 
                    className="accordion-collapse collapse" 
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card mt-5 border-0 shadow-sm">
              <div className="card-body text-center">
                <h3 className="mb-3">Still need help?</h3>
                <p className="mb-4">Our customer service team is available 24/7 to assist you.</p>
                <a href="/contact" className="btn btn-primary px-4">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpPage;