 'use client'

import Link from "next/link"
import { motion as m } from "framer-motion"
import styles from '../styles/home.module.css'

export default function HomePage() {
  return (
    <main className={styles.mainContainer}>
      {/* Background decorative elements */}
      <div className={styles.backgroundDecorator}>
        <div className={`${styles.decoratorCircle} ${styles.decoratorTop}`}></div>
        <div className={`${styles.decoratorCircle} ${styles.decoratorBottom}`}></div>
        <div className={`${styles.decoratorCircle} ${styles.decoratorCenter}`}></div>
      </div>

      <div className={styles.contentContainer}>
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.heroSection}
        >
          <h1 className={styles.heroTitle}>
            Welcome to Event Manager
          </h1>
          <p className={styles.heroDescription}>
            Your one-stop solution for organizing and managing events. Create, plan, and execute memorable events with ease.
          </p>
          <div className={styles.buttonContainer}>
            <Link 
              href="/login"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Get Started
            </Link>
            <Link 
              href="/register"
              className={`${styles.button} ${styles.buttonOutline}`}
            >
              Learn More
            </Link>
          </div>
        </m.div>
        
        <div className={styles.featuresSection}>
          {[
            {
              title: "Easy Event Creation",
              description: "Create and manage events with our intuitive interface",
              icon: "🎉",
              gradient: "from-pink-500 to-purple-500"
            },
            {
              title: "Real-time Updates",
              description: "Stay informed with instant notifications and updates",
              icon: "⚡",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              title: "Secure Platform",
              description: "Your data is protected with enterprise-grade security",
              icon: "🔒",
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((feature, index) => (
            <m.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={styles.featureCard}
            >
              <div className={`${styles.featureIcon} bg-gradient-to-r ${feature.gradient}`}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>
                {feature.title}
              </h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </m.div>
          ))}
        </div>

        {/* Stats Section */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className={styles.statsSection}
        >
          {[
            { number: "10K+", label: "Events Created", gradient: "from-pink-500 to-purple-500" },
            { number: "50K+", label: "Happy Users", gradient: "from-blue-500 to-cyan-500" },
            { number: "99%", label: "Success Rate", gradient: "from-green-500 to-emerald-500" },
            { number: "24/7", label: "Support", gradient: "from-orange-500 to-red-500" }
          ].map((stat, index) => (
            <div key={stat.label} className={styles.statItem}>
              <div className={`${styles.statNumber} bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.number}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </m.div>

        {/* CTA Section */}
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className={styles.ctaSection}
        >
          <h2 className={styles.ctaTitle}>
            Ready to Start Managing Events?
          </h2>
          <p className={styles.ctaDescription}>
            Join thousands of event organizers who trust our platform for their event management needs.
          </p>
          <Link 
            href="/register"
            className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonGradient}`}
          >
            Create Your First Event
          </Link>
        </m.div>
      </div>
    </main>
  )
}