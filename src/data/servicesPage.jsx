import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Singleton in-memory cache for synchronous rendering
const servicesPageObj = {};

export const updateServicesPage = (newConfig) => {
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
            if (isMounted) {
              setLoading(false);
            }
          }
        }, (error) => {
          console.error("Firestore services_page listener failed:", error);
          if (isMounted) {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Firestore services_page setup error:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    } else {
      if (isMounted) {
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { config, loading };
};

export default servicesPageObj;
