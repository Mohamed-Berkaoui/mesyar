import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookingForm.css';

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Prepare template parameters for EmailJS
    const templateParams = {
      fullname: formData.get('fullname'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      requester: formData.get('requester') === 'individual' ? 'فرد' : 'شركة',
      livestock_type: formData.get('livestock-type') === 'camels' ? 'إبل' : 'غنم',
      count: formData.get('count'),
      pickup: formData.get('pickup'),
      destination: formData.get('destination'),
      notes: formData.get('notes') || 'لا توجد ملاحظات',
    };

    try {
      await emailjs.send(
        'service_s0ps5yf', // Your service ID
        'template_d6k2dwn', // Replace with your template ID from EmailJS
        templateParams,
        'XR7irA0qzIRO1drNJ' // Replace with your public key from EmailJS
      );

      toast.success('تم إرسال طلبك بنجاح! سنتواصل معك قريباً', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true,
      });

      form.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        rtl: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="booking-section" id="booking" dir="rtl">
      <motion.div 
        className="booking-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="booking-header">
          <h2 className="booking-title">
              <span className="title-highlight-wrap">     حجز  رحلة نقل               <span className="highlight"></span></span>
          </h2>
          <p className="booking-subtitle">
            نقل آمن وسليم لحلالك
          </p>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group full-width">
            <input type="text" className="input-field" id="fullname" name="fullname" placeholder=" " required />
            <label htmlFor="fullname" className="floating-label">الإسم الكامل</label>
          </div>

          <div className="form-group full-width">
            <input type="email" className="input-field" id="email" name="email" placeholder=" " required />
            <label htmlFor="email" className="floating-label">البريد الإلكتروني</label>
          </div>

          <div className="form-group">
            <input type="tel" className="input-field" id="phone" name="phone" placeholder=" " required />
            <label htmlFor="phone" className="floating-label">رقم الجوال</label>
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" id="requester" name="requester" defaultValue="" aria-label="الجهة الطالبة" required>
                <option value="" disabled></option>
                <option value="individual">فرد</option>
                <option value="business">شركة</option>
             </select>
             <label htmlFor="requester" className="floating-label">الجهة الطالبة</label>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" id="livestock-type" name="livestock-type" defaultValue="" aria-label="نوع الماشية" required>
                <option value="" disabled></option>
                <option value="camels">إبل</option>
                <option value="sheep">غنم</option>
             </select>
             <label htmlFor="livestock-type" className="floating-label">نوع الماشية</label>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group">
            <input type="number" className="input-field" id="count" name="count" min="1" placeholder=" " required />
            <label htmlFor="count" className="floating-label">عدد المواشي</label>
          </div>

          <div className="form-group">
            <input type="text" className="input-field" id="pickup" name="pickup" placeholder=" " required />
            <label htmlFor="pickup" className="floating-label">عنوان التحميل (المدينة - الحي)</label>
          </div>

          <div className="form-group">
            <input type="text" className="input-field" id="destination" name="destination" placeholder=" " required />
            <label htmlFor="destination" className="floating-label">عنوان الوصول</label>
          </div>

          <div className="form-group full-width">
            <textarea className="textarea-field" id="notes" name="notes" placeholder=" "></textarea>
            <label htmlFor="notes" className="floating-label">ملاحظات إضافية</label>
          </div>

          <button type="submit" className="booking-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب النقل'}
          </button>
        </form>
      </motion.div>
      <ToastContainer />
    </section>
  );
};

export default BookingForm;
