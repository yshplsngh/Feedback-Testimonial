const TermsAndConditions = () => {
  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg p-6 shadow-xl md:p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Terms and Conditions
          </h1>
          <p className="mt-2 text-gray-400">Last updated: November 18, 2024</p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-gray-300">
          {/* Introduction */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              1. Introduction
            </h2>
            <p className="mb-4">
              Welcome to Testimonial.yshplsngh.in. By accessing our website and
              using our services, you agree to comply with and be bound by the
              following terms and conditions.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              2. Definitions
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                "User", "You", and "Your" refers to you, the person accessing
                this website.
              </li>
              <li>
                "Company", "We", "Our" and "Us" refers to [Your Company Name].
              </li>
              <li>"Terms" refers to these Terms and Conditions.</li>
            </ul>
          </section>

          {/* Services */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              3. Services
            </h2>
            <p className="mb-4">
              We provide [description of your services]. We reserve the right to
              modify, suspend, or discontinue any part of our services at any
              time without notice.
            </p>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              4. User Obligations
            </h2>
            <p className="mb-4">By using our services, you agree to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Provide accurate and complete information</li>
              <li>Use the services legally and responsibly</li>
              <li>Not violate any applicable laws or regulations</li>
              <li>Maintain the confidentiality of your account</li>
            </ul>
          </section>

          {/* Privacy */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              5. Privacy Policy
            </h2>
            <p className="mb-4">
              Your use of our services is also governed by our Privacy Policy.
              Please review our Privacy Policy to understand our practices.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mt-8 border-t border-gray-700 pt-8">
            <h2 className="mb-3 text-xl font-semibold text-white">
              Contact Us
            </h2>
            <p className="text-gray-400">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-2">
              <p className="text-gray-300">Email: yashpal9rx@gmail.com</p>
              <p className="text-gray-300">Address: Virtual World</p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© 2024 Testimonial.yshplsngh.in. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
