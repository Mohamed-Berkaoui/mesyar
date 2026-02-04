import { motion } from 'framer-motion';
import { Sprout, User, Utensils } from 'lucide-react';
import './Services.css';

const services = [
  {
    title: 'مالكو المواشي وأصحاب الحلال',
    icon: Sprout,
    colorClass: 'green',
    iconColor: '#22C55E',
    bullets: [
      'نساعد ملاك المواشي وأصحاب الحلال في نقل المواشي (الإبل، والغنم) بين المدن أو داخلها بأمان وكفاءة.',
    ],
  },
  {
    title: 'قطاع الأفراد',
    icon: User,
    colorClass: 'orange',
    iconColor: '#F59E0B',
    bullets: [
      'نقل خاص للهجن والإبل المزاين.',
      'شاحنات مفروشة مخصصة.',
      'ضمان الراحة والسلامة التامة.',
    ],
  },
  {
    title: 'قطاع الأعمال: المطاعم واللحوم، وقصور الأفراح',
    icon: Utensils,
    colorClass: 'red',
    iconColor: '#EF4444',
    bullets: [
      'عقود نقل دورية (يومية/أسبوعية).',
      'النقل من المسالخ أو المزارع إلى الفروع.',
      'فواتير ضريبية وعقود موثقة.',
    ],
  },
];

const Services = () => {
  return (
    <section className="services-section" id="services" dir="rtl">
      <div className="services-container">
        
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="services-title"><span className="title-highlight">خدماتنا</span></h2>
          <p className="services-subtitle">نقدّم خدماتنا لثلاث فئات رئيسية.</p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
            >
              <div className={`service-icon-box ${service.colorClass}`}>
                <service.icon size={24} color={service.iconColor} strokeWidth={1.5} />
              </div>

              <h3>{service.title}</h3>

              <ul className="service-bullets">
                {service.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span className={`bullet-dot ${service.colorClass}`}>•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
