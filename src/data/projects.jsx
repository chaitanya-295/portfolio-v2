import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export const assetMap = {};

export const ProjectIcon = ({ name, color = 'currentColor' }) => {
  switch (name) {
    case 'orbit':
    case 'planet':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'chart':
    case 'analytics':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'portal':
    case 'play':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      );
    case 'target':
    case 'map':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    case 'concentric':
    case 'black-hole':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 6a6 6 0 1 0 6 6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'atom':
    case 'quantum':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(30 12 5)" />
          <ellipse cx="12" cy="5" rx="9" ry="3" transform="rotate(-30 12 5)" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    default:
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
};

// Formulates clean string bindings
export const mapProjectItem = (item) => ({
  ...item,
  imageFile: item.image, // Preserve original filename
  image: assetMap[item.image] || item.image,
  icon: <ProjectIcon name={item.iconName} color={item.color} />
});

const mapProjectsList = (list) => list.map(mapProjectItem);

// Default static synchronous reference
const projectsList = [];

// Dynamic updater for static cache mutation
export const updateProjectsList = (newList) => {
  projectsList.length = 0;
  newList.forEach(item => {
    projectsList.push(mapProjectItem(item));
  });
};

// React hook with live Firestore DB subscription
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'projects'), orderBy('id', 'asc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const list = [];
          snapshot.forEach((doc) => {
            list.push({ ...doc.data() });
          });
          if (isMounted) {
            setProjects(mapProjectsList(list));
            setLoading(false);
          }
        }, (error) => {
          console.error("Firestore projects listener failed:", error);
          if (isMounted) {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Firestore listener setup error:", error);
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

  return { projects, loading };
};

export default projectsList;
