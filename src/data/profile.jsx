import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import initialProfile from './profile.json';

const loadLocalProfile = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_profile');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached portfolio_profile:', e);
      }
    }
  }
  return initialProfile;
};

// Singleton in-memory cache for components loaded synchronously before useEffect runs
const profileObj = { ...loadLocalProfile() };

export const updateProfile = (newProfile) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_profile', JSON.stringify(newProfile));
  }
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
            // Seed defaults locally/remotely
            const local = loadLocalProfile();
            if (isMounted) {
              setProfile(local);
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore profile listener failed:", error);
          const local = loadLocalProfile();
          if (isMounted) {
            setProfile(local);
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore profile setup error:", error);
        const local = loadLocalProfile();
        if (isMounted) {
          setProfile(local);
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalProfile();
      setProfile(local);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { profile, loading };
};

export default profileObj;
