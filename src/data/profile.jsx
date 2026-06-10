import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

// Singleton in-memory cache for synchronous rendering
const profileObj = {};

export const updateProfile = (newProfile) => {
  Object.keys(profileObj).forEach(key => delete profileObj[key]);
  Object.assign(profileObj, newProfile);
};

export const useProfile = () => {
  const [profile, setProfile] = useState(profileObj);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const docRef = doc(db, 'profile', 'dev_profile');
        unsubscribe = onSnapshot(docRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (isMounted) {
              setProfile(data);
              updateProfile(data);
              setLoading(false);
            }
          } else {
            if (isMounted) {
              setLoading(false);
            }
          }
        }, (error) => {
          console.error("Firestore profile listener failed:", error);
          if (isMounted) {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Firestore profile setup error:", error);
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

  return { profile, loading };
};

export default profileObj;
