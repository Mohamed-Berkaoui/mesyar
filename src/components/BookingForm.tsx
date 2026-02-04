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
            <input type="text" className="input-field" placeholder="الإسم الكامل" />
          </div>

          <div className="form-group">
            <input type="text" className="input-field" placeholder="رقم الجوال" />
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" defaultValue="" aria-label="الجهة الطالبة">
                <option value="" disabled>الجهة الطالبة</option>
                <option value="individual">فرد</option>
                <option value="business">شركة</option>
             </select>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group select-wrapper">
             <select className="select-field" defaultValue="" aria-label="نوع الماشية">
                <option value="" disabled>نوع الماشية</option>
                <option value="camels">إبل</option>
                <option value="sheep">غنم</option>
             </select>
             <ChevronDown className="select-chevron" size={20} />
          </div>

          <div className="form-group">
            <input type="number" className="input-field" placeholder="عدد المواشي" />
          </div>

          <div className="form-group">
            <input type="text" className="input-field" placeholder="عنوان التحميل (المدينة - الحي)" />
          </div>

          <div className="form-group">
            <input type="text" className="input-field" placeholder="عنوان الوصول" />
          </div>

          <div className="form-group full-width">
            <textarea className="textarea-field" placeholder="ملاحظات إضافية..."></textarea>
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
