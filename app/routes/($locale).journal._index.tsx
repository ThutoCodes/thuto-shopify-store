import {useState} from 'react';
import {PageHeader, Section, Text} from '~/components/Text';
import {Link} from '~/components/Link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Here you can integrate Firebase, Shopify, or email API
  };

  return (
    <>
      <PageHeader heading="Contact Us" />

      <Section>
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            {submitted ? (
              <p className="text-green-600">Thank you! Your message has been sent.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="border border-gray-300 rounded-md p-2"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="border border-gray-300 rounded-md p-2"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="border border-gray-300 rounded-md p-2 h-32 resize-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Google Map */}
          <div className="flex-1 h-80 md:h-auto">
            <iframe
              title="Northgate Mall Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3300.123456789!2d28.0260!3d-25.9570!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956e234abcd123%3A0x1234abcd5678efgh!2sNorthgate%20Mall!5e0!3m2!1sen!2sza!4v1690000000000!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}