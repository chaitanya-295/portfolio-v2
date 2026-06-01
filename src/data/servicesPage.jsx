import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import initialServicesPage from './servicesPage.json';

const loadLocalServicesPage = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_services_page');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached portfolio_services_page:', e);
      }
    }
  }
  return initialServicesPage;
};

// Singleton in-memory cache for synchronous rendering
const servicesPageObj = { ...loadLocalServicesPage() };

export const updateServicesPage = (newConfig) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_services_page', JSON.stringify(newConfig));
  }
  Object.keys(servicesPageObj).forEach(key => delete servicesPageObj[key]);
  Object.assign(servicesPageObj, newConfig);
};

export const useServicesPage = () => {
  const [config, setConfig] = useState(servicesPageObj);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const docRef = doc(db, 'services_page', 'config');
        unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (isMounted) {
              setConfig(data);
              updateServicesPage(data);
              setLoading(false);
            }
          } else {
            // Seed defaults locally if not in DB yet
            const local = loadLocalServicesPage();
            if (isMounted) {
              setConfig(local);
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore services_page listener failed:", error);
          const local = loadLocalServicesPage();
          if (isMounted) {
            setConfig(local);
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore services_page setup error:", error);
        const local = loadLocalServicesPage();
        if (isMounted) {
          setConfig(local);
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalServicesPage();
      setConfig(local);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { config, loading };
};

export default servicesPageObj;
