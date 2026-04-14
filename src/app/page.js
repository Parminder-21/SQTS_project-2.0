'use client';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleBackground() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#6366f1" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Demo workshop date: April 19
    const targetDate = new Date('2026-04-19T00:00:00');
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} style={{ textAlign: 'center' }}>
          <div className="text-gradient" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{String(value).padStart(2, '0')}</div>
          <div style={{ fontSize: '0.8rem', color: '#a1a1aa', textTransform: 'uppercase' }}>{unit}</div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 3D Background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      <div className="container" style={{ paddingTop: '150px' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 100px' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: '4rem', marginBottom: '20px' }}
          >
            Master <span className="text-gradient">Industry Skills</span><br />
            Secure Your Future
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: '1.2rem', color: '#a1a1aa', marginBottom: '40px' }}
          >
            Premium job-focused curriculum with top-tier placement assistance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/register" className="btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }}>
              Start Learning Now
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p style={{ marginTop: '40px', color: '#ec4899', fontWeight: 'bold' }}>Upcoming Workshop (Limited Seats)</p>
            <CountdownTimer />
          </motion.div>
        </div>

        {/* Dynamic Courses Section */}
        <section style={{ padding: '80px 0' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center' }}>Featured <span className="text-gradient">Programs</span></h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {courses.map(course => (
                <motion.div 
                  key={course.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="glass-panel"
                  style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}
                >
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{course.title}</h3>
                  <span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '20px' }}>
                    {course.category}
                  </span>
                  <p style={{ color: '#a1a1aa', marginBottom: '30px', flexGrow: 1 }}>{course.description}</p>
                  
                  <Link href={`/courses/${course.id}`} className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                    View Syllabus
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
