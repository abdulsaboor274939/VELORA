import React, { useState } from 'react';
import { Calendar, Clock, Video, Store, CheckCircle, RefreshCw, X } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [clientName, setClientName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('3:00 PM - 4:00 PM');
  const [consultationType, setConsultationType] = useState<'virtual_video' | 'in_person_atelier'>('virtual_video');
  const [dressInterest, setDressInterest] = useState<string>('Bridal Custom Outfit');
  const [estimatedBudget, setEstimatedBudget] = useState<string>('Rs. 150,000+');
  const [notes, setNotes] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          phone,
          email,
          date,
          timeSlot,
          consultationType,
          dressInterest,
          estimatedBudget,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setBookingSuccess(data);
      } else {
        setErrorMsg(data.error || 'Failed to book session.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="bg-[#2C241E] text-amber-100 p-5 flex items-center justify-between border-b border-amber-900/30">
          <div>
            <span className="text-amber-300 text-[10px] font-serif uppercase tracking-widest block font-bold">
              1-on-1 Couture Appointment
            </span>
            <h2 className="text-xl font-serif font-bold text-white">
              Book Fashion Designer Session
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {bookingSuccess ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Consultation Confirmed!
              </h3>
              <p className="text-xs text-stone-600 font-sans max-w-md mx-auto">
                Thank you, <strong className="text-stone-900">{bookingSuccess.booking.clientName}</strong>. Your consultation ID is <strong className="text-amber-900">{bookingSuccess.bookingId}</strong>.
              </p>
              <div className="bg-white p-4 rounded-xl border border-stone-200 text-xs space-y-2 text-left max-w-md mx-auto">
                <p><strong>Session Date:</strong> {bookingSuccess.booking.date} ({bookingSuccess.booking.timeSlot})</p>
                <p><strong>Type:</strong> {bookingSuccess.booking.consultationType === 'virtual_video' ? 'Virtual Video Call' : 'In-Person Atelier Appointment'}</p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#2C241E] text-white px-6 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="flex bg-stone-200 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setConsultationType('virtual_video')}
                  className={`flex-1 py-2 rounded-lg font-serif transition flex items-center justify-center gap-1.5 ${
                    consultationType === 'virtual_video' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-900" />
                  <span>Virtual Video Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('in_person_atelier')}
                  className={`flex-1 py-2 rounded-lg font-serif transition flex items-center justify-center gap-1.5 ${
                    consultationType === 'in_person_atelier' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                  }`}
                >
                  <Store className="w-3.5 h-3.5 text-amber-900" />
                  <span>Atelier Visit (Lahore/Karachi)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-serif text-stone-800 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Mahnoor Ali"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-serif text-stone-800 block mb-1">WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-serif text-stone-800 block mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                  />
                </div>
                <div>
                  <label className="font-serif text-stone-800 block mb-1">Time Slot *</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                  >
                    <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-serif text-stone-800 block mb-1">Notes / Dress Preferences</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about your wedding event date, preferred colors, or custom requirements..."
                  className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                />
              </div>

              {errorMsg && <p className="text-rose-700">{errorMsg}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2C241E] text-amber-100 hover:bg-stone-900 py-3 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition shadow-md"
              >
                {loading ? 'Booking Session...' : 'Confirm Designer Consultation'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
