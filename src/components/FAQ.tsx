import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqData = [
  {
    question: 'هل يتم نقل جميع أنواع المواشي؟',
    answer: 'نعم، في المسار نحن متخصصون في نقل جميع أنواع الحلال بما في ذلك الإبل، الغنم، والماعز بجميع الأحجام.',
  },
  {
    question: 'كيف تتم عملية الحجز والنقل؟',
    answer: 'يمكنك الحجز بسهولة عبر ملء النموذج أعلاه أو التواصل معنا مباشرة عبر الواتساب. سيقوم فريقنا بتنسيق الموعد المناسب.',
  },
  {
    question: 'كيف يتم تحديد تكلفة النقل؟',
    answer: 'تعتمد التكلفة على المسافة، نوع الماشية، والعدد. نحن نضمن أفضل الأسعار التنافسية مع خيارات النقل الجماعي.',
  },
  {
    question: 'هل تقدمون خدمات للمطاعم والمسالخ؟',
    answer: 'بالتأكيد، لدينا عقود خاصة لقطاع الأعمال تشمل جداول نقل منتظمة وفواتير ضريبية معتمدة.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className="faq-section" id="faq" dir="rtl">
        <motion.h2 
          className="faq-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          الأسئلة الشائعة
        </motion.h2>
        <div className="faq-list">
          <AnimatePresence>
            {faqData.map((item, index) => (
              <motion.div 
                key={index} 
                className={`faq-card ${openIndex === index ? 'open' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.12, duration: 0.5 }}
              >
                <div className="faq-header">
                  <span className="faq-question">{item.question}</span>
                  <ChevronDown className="faq-icon" strokeWidth={3} size={20} />
                </div>
                <div className="faq-divider"></div>
                <p className="faq-answer">{item.answer}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <section className="cta-section" dir="rtl">
        <motion.h2 
          className="cta-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          عندك استفسار؟
        </motion.h2>
        <motion.a 
          href="https://wa.me/966000000000" 
          className="whatsapp-btn"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
           <span>تواصل عبر الواتساب</span>
           <MessageCircle fill="white" size={24} />
        </motion.a>
      </section>
    </>
  );
};

export default FAQ;
