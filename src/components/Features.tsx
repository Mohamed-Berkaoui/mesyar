import { motion } from 'framer-motion';
import { Users, ShieldCheck, Smartphone, Brain } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: Users,
    title: 'النقل الجماعي',
    description: 'خفض التكاليف بنسبة تصل إلى 40% من خلال النقل الجماعي المنظم والفعّال.',
  },
  {
    icon: ShieldCheck,
    title: 'ضمان النقل',
    description: 'حماية شاملة من المخاطر مع ضمان جودة النقل ورعاية الحيوانات.',
  },
  {
    icon: Smartphone,
    title: 'النقل الرقمي',
    description: 'حجز وتتبع رقمي بالكامل عبر المنصة الإلكترونية لتبسيط العمليات.',
  },
  {
    icon: Brain,
    title: 'الذكاء الاصطناعي',
    description: 'مطابقة ذكية بين الطلبات والمسارات لتحسين الكفاءة والتوقيت.',
  },
];

const Features = () => {
  return (
    <section className="features-section" id="about" dir="rtl">
      <div className="features-container">
        
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="features-title">
            <span className="title-highlight">نغيّر مفهوم نقل المواشي</span>
          </h2>
          
          <p className="features-intro">
            في المسار صممنا خدماتنا لضمان وصول الحلول المناسبة في العدد المحدد من مزايا النقل الفردي والنقل الجماعي التي تخفض التكاليف وترفع كفاءة التشغيل للمطاعم والمسالخ وطلبة الخدمة.
          </p>

          <div className="vision-block">
            <h3 className="vision-title">رؤيتنا:</h3>
            <p className="vision-text">
              أن نكون الحل الأول لنقل المواشي في المملكة العربية السعودية تحقيقاً لرؤية 2030 في الأمن الغذائي والرفق بالحيوان.
            </p>
          </div>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="icon-wrapper">
                <feature.icon size={20} color="var(--primary)" strokeWidth={2} />
              </div>
              <div className="card-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
