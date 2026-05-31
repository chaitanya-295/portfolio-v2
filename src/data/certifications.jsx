import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import initialCertificationsList from './certifications.json';

// Resolves theme color dynamically based on glow colors
const getColorFromGlow = (glow) => {
  if (glow.includes('6, 182, 212')) return 'var(--accent-cyan)';
  if (glow.includes('168, 85, 247')) return 'var(--accent-purple)';
  if (glow.includes('236, 72, 153')) return 'var(--accent-pink)';
  if (glow.includes('99, 102, 241')) return 'var(--accent-indigo)';
  return 'var(--accent-cyan)';
};

export const mapCertificationItem = (item) => {
  const certColor = getColorFromGlow(item.glow);
  return {
    ...item,
    color: certColor
  };
};

const mapCertificationsList = (list) => list.map(mapCertificationItem);

const loadLocalCertifications = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_certifications');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached portfolio_certifications:', e);
      }
    }
  }
  return initialCertificationsList;
};

const certificationsList = mapCertificationsList(loadLocalCertifications());

export const updateCertificationsList = (newList) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_certifications', JSON.stringify(newList));
  }
  
  certificationsList.length = 0;
  newList.forEach(item => {
    certificationsList.push(mapCertificationItem(item));
  });
};

export const useCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'certifications'), orderBy('id', 'asc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const list = [];
            snapshot.forEach((doc) => {
              list.push({ ...doc.data() });
            });
            if (isMounted) {
              setCertifications(mapCertificationsList(list));
              setLoading(false);
            }
          } else {
            const local = loadLocalCertifications();
            if (isMounted) {
              setCertifications(mapCertificationsList(local));
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore certifications listener failed:", error);
          const local = loadLocalCertifications();
          if (isMounted) {
            setCertifications(mapCertificationsList(local));
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore certifications listener setup error:", error);
        const local = loadLocalCertifications();
        if (isMounted) {
          setCertifications(mapCertificationsList(local));
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalCertifications();
      setCertifications(mapCertificationsList(local));
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { certifications, loading };
};

export default certificationsList;
