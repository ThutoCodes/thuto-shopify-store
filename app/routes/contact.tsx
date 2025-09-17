import { FormEvent, useState } from 'react';
import { PageHeader, Section } from '~/components/Text';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function ContactPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Thanks for reaching out! We will get back to you soon.');
  };

  const containerStyle = { width: '100%', height: '400px' };
  const center = { lat: -26.0610, lng: 27.9439 }; // Northgate Mall

  return (
    <>
      <PageHeader heading="Contact Us" />

      <Section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-8">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 bg-gray-100 p-6 rounded-lg shadow-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="p-3 rounded border"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="p-3 rounded border"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              className="p-3 rounded border"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
          {status && <p className="mt-4 text-green-600">{status}</p>}
        </div>

        {/* Google Map */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Find us at Northgate Mall</h2>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </Section>
    </>
  );
}