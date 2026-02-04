import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import './BookingForm.css';

const BookingForm = () => {
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

        <form className="booking-form">
          <div className="form-group full-width">
            <input type="text" className="input-field" id="fullname" required />
            <label htmlFor="fullname" className="floating-label">الإسم الكامل</label>
          </div>

          <div className="form-group">
            <input type="text" className="input-field" id="phone" required />
            <label htmlFor="phone" className="floating-label">رقم الجوال</label>
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" id="requester" defaultValue="" aria-label="الجهة الطالبة" required>
                <option value="" disabled></option>
                <option value="individual">فرد</option>
                <option value="business">شركة</option>
             </select>
             <label htmlFor="requester" className="floating-label">الجهة الطالبة</label>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" id="livestock-type" defaultValue="" aria-label="نوع الماشية" required>
                <option value="" disabled></option>
                <option value="camels">إبل</option>
                <option value="sheep">غنم</option>
             </select>
             <label htmlFor="livestock-type" className="floating-label">نوع الماشية</label>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group">
            <input type="number" className="input-field" id="count" required />
            <label htmlFor="count" className="floating-label">عدد المواشي</label>
          </div>

          <div className="form-group">
            <input type="text" className="input-field" id="pickup" required />
            <label htmlFor="pickup" className="floating-label">عنوان التحميل (المدينة - الحي)</label>
          </div>

          <div className="form-group">
            <input type="text" className="input-field" id="destination" required />
            <label htmlFor="destination" className="floating-label">عنوان الوصول</label>
          </div>

          <div className="form-group full-width">
            <textarea className="textarea-field" id="notes"></textarea>
            <label htmlFor="notes" className="floating-label">ملاحظات إضافية</label>
          </div>

          <button type="submit" className="booking-submit-btn">
            إرسال طلب النقل
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default BookingForm;
