import Layout from "../../components/layout";


const AboutUs = () => {
    return (
        <Layout title="About Us">
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-4">
                        <h1 className="display-4 mb-4">Our Story</h1>
                        <p className="lead">
                            Founded in 2023, we started with a simple mission: to provide high-quality products with exceptional customer service.
                        </p>
                        <p>
                            What began as a small online store has grown into a trusted destination for shoppers worldwide.
                            We carefully curate our collection to bring you the best products at competitive prices.
                        </p>
                    </div>
                    <div className="col-lg-6 mb-4">
                        <img
                            src="https://plus.unsplash.com/premium_photo-1661486987044-b1a69b9bbaed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8am9pbiUyMG91ciUyMHRlYW18ZW58MHx8MHx8fDA%3D"
                            alt="Our Team"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                                <i className="bi bi-trophy display-4 text-primary mb-3"></i>
                                <h3>Our Mission</h3>
                                <p>To deliver exceptional value through quality products and outstanding customer experiences.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                                <i className="bi bi-eye display-4 text-primary mb-3"></i>
                                <h3>Our Vision</h3>
                                <p>To become the most trusted online shopping destination in our category.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm">
                            <div className="card-body text-center">
                                <i className="bi bi-people display-4 text-primary mb-3"></i>
                                <h3>Our Team</h3>
                                <p>A dedicated group of professionals committed to your satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AboutUs;