import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

export default function Contact() {
  const { content: { contact } } = useCMS();

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto w-full flex-1">
      <div className="text-center mb-16">
        <p className="text-savannah-sage font-medium tracking-[0.2em] uppercase mb-2">Get in Touch</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-savannah-dark font-serif">Contact <span className="italic text-savannah-leaf">Us</span></h1>
        <p className="mt-6 text-savannah-earth max-w-2xl mx-auto text-lg">Ready to start planning your dream safari? Our experts are here to help craft the perfect itinerary for you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-savannah-earth/10">
            <h3 className="text-2xl font-serif text-savannah-dark mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-savannah-sage/20 flex items-center justify-center text-savannah-leaf shrink-0"><MapPin className="w-6 h-6" /></div>
                <div><h4 className="font-semibold text-savannah-dark mb-1">Our Office</h4><p className="text-savannah-earth whitespace-pre-line">{contact.address}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-savannah-sage/20 flex items-center justify-center text-savannah-leaf shrink-0"><Phone className="w-6 h-6" /></div>
                <div><h4 className="font-semibold text-savannah-dark mb-1">Phone</h4><p className="text-savannah-earth">{contact.phone1}{contact.phone2 && <><br />{contact.phone2}</>}</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-savannah-sage/20 flex items-center justify-center text-savannah-leaf shrink-0"><Mail className="w-6 h-6" /></div>
                <div><h4 className="font-semibold text-savannah-dark mb-1">Email</h4><p className="text-savannah-earth">{contact.email1}{contact.email2 && <><br />{contact.email2}</>}</p></div>
              </div>
            </div>
          </div>

          <div className="bg-savannah-dark text-savannah-sand p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-serif mb-4">Business Hours</h3>
            <ul className="space-y-3 text-savannah-sand/80">
              <li className="flex justify-between"><span>Monday – Friday</span><span>{contact.hoursWeekday}</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>{contact.hoursSaturday}</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>{contact.hoursSunday}</span></li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-savannah-earth/10">
          <h3 className="text-2xl font-serif text-savannah-dark mb-6">Send us a message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label htmlFor="firstName" className="text-sm font-medium text-savannah-dark">First Name</label><input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-savannah-earth/20 bg-savannah-sand/30 focus:outline-none focus:ring-2 focus:ring-savannah-sage focus:border-transparent transition-all" placeholder="John" /></div>
              <div className="space-y-2"><label htmlFor="lastName" className="text-sm font-medium text-savannah-dark">Last Name</label><input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-savannah-earth/20 bg-savannah-sand/30 focus:outline-none focus:ring-2 focus:ring-savannah-sage focus:border-transparent transition-all" placeholder="Doe" /></div>
            </div>
            <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium text-savannah-dark">Email Address</label><input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-savannah-earth/20 bg-savannah-sand/30 focus:outline-none focus:ring-2 focus:ring-savannah-sage focus:border-transparent transition-all" placeholder="john@example.com" /></div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-savannah-dark">Subject</label>
              <select id="subject" className="w-full px-4 py-3 rounded-xl border border-savannah-earth/20 bg-savannah-sand/30 focus:outline-none focus:ring-2 focus:ring-savannah-sage focus:border-transparent transition-all">
                <option>General Inquiry</option><option>Book a Tour</option><option>Custom Itinerary</option><option>Partnership</option>
              </select>
            </div>
            <div className="space-y-2"><label htmlFor="message" className="text-sm font-medium text-savannah-dark">Message</label><textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-savannah-earth/20 bg-savannah-sand/30 focus:outline-none focus:ring-2 focus:ring-savannah-sage focus:border-transparent transition-all resize-none" placeholder="Tell us about your dream safari…" /></div>
            <button type="button" className="w-full py-4 bg-savannah-accent text-white rounded-xl uppercase tracking-wider text-sm font-semibold hover:bg-savannah-dark transition-colors shadow-md flex items-center justify-center gap-2">Send Message <Send className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </div>
  );
}
