import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import initialServicesList from './services.json';

// Resolves theme color dynamically based on glow colors
const getColorFromGlow = (glow) => {
  if (glow.includes('6, 182, 212')) return 'var(--accent-cyan)';
  if (glow.includes('168, 85, 247')) return 'var(--accent-purple)';
  if (glow.includes('236, 72, 153')) return 'var(--accent-pink)';
  if (glow.includes('99, 102, 241')) return 'var(--accent-indigo)';
  return 'var(--accent-purple)';
};

export const ServiceIcon = ({ name, color = 'currentColor' }) => {
  switch (name) {
    case 'web':
    case 'monitor':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case 'solutions':
    case 'layers':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case 'interactive':
    case 'touch':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.02105 19.1625 5.0931 19.3908 5.04505 19.6172L4.8 20.8C4.71818 21.1856 5.01439 21.5 5.4 21.5H12Z" />
          <circle cx="7.5" cy="10.5" r="1.5" fill={color} />
          <circle cx="11.5" cy="7.5" r="1.5" fill={color} />
          <circle cx="16.5" cy="9.5" r="1.5" fill={color} />
          <circle cx="15.5" cy="14.5" r="1.5" fill={color} />
        </svg>
      );
    case 'scalable':
    case 'gear':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'modern':
    case 'lightning':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'responsive':
    case 'devices':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
  }
};

export const mapServiceItem = (item) => {
  const serviceColor = getColorFromGlow(item.glow);
  return {
    ...item,
    color: serviceColor,
    icon: <ServiceIcon name={item.iconName} color={serviceColor} />
  };
};

const mapServicesList = (list) => list.map(mapServiceItem);

const loadLocalServices = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_services');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached portfolio_services:', e);
      }
    }
  }
  return initialServicesList;
};

const servicesList = mapServicesList(loadLocalServices());

export const updateServicesList = (newList) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_services', JSON.stringify(newList));
  }
  
  servicesList.length = 0;
  newList.forEach(item => {
    servicesList.push(mapServiceItem(item));
  });
};

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'services'), orderBy('id', 'asc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const list = [];
            snapshot.forEach((doc) => {
              list.push({ ...doc.data() });
            });
            if (isMounted) {
              setServices(mapServicesList(list));
              setLoading(false);
            }
          } else {
            const local = loadLocalServices();
            if (isMounted) {
              setServices(mapServicesList(local));
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore services listener failed:", error);
          const local = loadLocalServices();
          if (isMounted) {
            setServices(mapServicesList(local));
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore services listener setup error:", error);
        const local = loadLocalServices();
        if (isMounted) {
          setServices(mapServicesList(local));
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalServices();
      setServices(mapServicesList(local));
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { services, loading };
};

export default servicesList;
