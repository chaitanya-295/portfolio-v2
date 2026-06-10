import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, onSnapshot, getDocs, where } from 'firebase/firestore';

const defaultTestimonials = [
  {
    id: 't1',
    name: 'Sarah Connor',
    role: 'CTO',
    company: 'CyberTech Systems',
    text: "Chaitanya's WebGL planetary simulator exceeded our expectations. The orbital physics details, high-performance shading, and visual fidelity were absolutely top-notch.",
    rating: 5,
    avatar: 'SC',
    glow: 'rgba(6, 182, 212, 0.15)', // Cyan preset
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 't2',
    name: 'David Miller',
    role: 'Product Lead',
    company: 'StellarAnalytics',
    text: 'The cosmic telemetry dashboard he built was stunning. Our real-time data flow integrates perfectly, and the user interaction is exceptionally smooth. Exceptional work!',
    rating: 5,
    avatar: 'DM',
    glow: 'rgba(236, 72, 153, 0.15)', // Pink preset
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Co-Founder',
    company: 'Nebula Web3',
    text: 'An outstanding full-stack developer. Chaitanya integrated our Ethereum smart contracts and custom GLSL shaders seamlessly, launching our minting portal ahead of schedule.',
    rating: 5,
    avatar: 'ER',
    glow: 'rgba(168, 85, 247, 0.15)', // Purple preset
    timestamp: new Date().toISOString()
  }
];

const loadLocalTestimonials = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_testimonials');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
      } catch (e) {
        console.error('Failed to parse cached portfolio_testimonials:', e);
      }
    }
  }
  return defaultTestimonials;
};

export const submitTestimonial = async (review) => {
  const avatarInitials = review.name
    ? review.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'AN';

  const reviewWithMeta = {
    ...review,
    id: review.id || Date.now().toString(),
    avatar: review.avatar || avatarInitials,
    timestamp: review.timestamp || new Date().toISOString()
  };

  // 1. Save locally
  if (typeof window !== 'undefined') {
    const local = loadLocalTestimonials();
    // Filter out potential duplicates by ID
    const filtered = local.filter(t => t.id !== reviewWithMeta.id);
    const updated = [reviewWithMeta, ...filtered];
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
  }

  // 2. Save to Firestore
  if (db) {
    try {
      await addDoc(collection(db, 'testimonials'), reviewWithMeta);
    } catch (e) {
      console.warn("Failed to write to Firestore collection 'testimonials':", e);
      throw e; // Re-throw so UI handles it as an error
    }
  }
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'testimonials'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const list = [];
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const data = doc.data();
              list.push({ ...data, docId: doc.id });
            });
          }

          // Merge local reviews and Firestore reviews to ensure locally-saved reviews display
          const local = loadLocalTestimonials();
          const mergedMap = new Map();

          local.forEach(item => {
            mergedMap.set(item.id, item);
          });

          list.forEach(item => {
            mergedMap.set(item.id, item);
          });

          const mergedList = Array.from(mergedMap.values());
          mergedList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

          if (isMounted) {
            setTestimonials(mergedList);
            setLoading(false);
          }
        }, (error) => {
          console.warn("Firestore testimonials listener failed:", error);
          const local = loadLocalTestimonials();
          if (isMounted) {
            setTestimonials(local);
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore testimonials setup error:", error);
        const local = loadLocalTestimonials();
        if (isMounted) {
          setTestimonials(local);
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalTestimonials();
      setTestimonials(local);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { testimonials, loading };
};

export const deleteTestimonial = async (review) => {
  const reviewId = review.id;
  const docId = review.docId;

  // 1. Remove from local storage
  if (typeof window !== 'undefined') {
    const local = loadLocalTestimonials();
    const updated = local.filter(t => t.id !== reviewId);
    localStorage.setItem('portfolio_testimonials', JSON.stringify(updated));
  }

  // 2. Remove from Firestore
  if (db) {
    try {
      if (docId) {
        await deleteDoc(doc(db, 'testimonials', docId));
      } else {
        const q = query(collection(db, 'testimonials'), where('id', '==', reviewId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await deleteDoc(querySnapshot.docs[0].ref);
        }
      }
    } catch (e) {
      console.warn("Failed to delete from Firestore testimonials:", e);
    }
  }
};
