import Layout from "../../components/layout";


const ContactPage = () => {
  return (
    <Layout title="Contact Us">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <h1 className="display-4 mb-4">Get In Touch</h1>
            <p className="lead mb-5">
              We'd love to hear from you! Reach out with questions, feedback, or just to say hello.
            </p>
            
            <div className="mb-4">
              <h3><i className="bi bi-geo-alt-fill text-primary me-3"></i> Our Location</h3>
              <p>123 Commerce Street<br />Online City, OC 12345</p>
            </div>
            
            <div className="mb-4">
              <h3><i className="bi bi-telephone-fill text-primary me-3"></i> Call Us</h3>
              <p>+1 (555) 123-4567<br />Mon-Fri, 9am-5pm EST</p>
            </div>
            
            <div className="mb-4">
              <h3><i className="bi bi-envelope-fill text-primary me-3"></i> Email Us</h3>
              <p>support@yourstore.com<br />We typically reply within 24 hours</p>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="mb-4">Send Us a Message</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary px-4">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;