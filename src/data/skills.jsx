import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import initialSkillsList from './skills.json';

// Category SVGs
export const CategoryIcon = ({ name }) => {
  switch (name) {
    case 'frontend':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'backend':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case 'tools':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-indigo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    default:
      return null;
  }
};

// Skill Logos
export const SkillLogo = ({ name }) => {
  switch (name) {
    case 'react':
      return (
        <svg width="22" height="22" viewBox="-11.5 -10.23 23 20.47" fill="none" stroke="#61DAFB" strokeWidth="1.2">
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'tailwind':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6 4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6 4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      );
    case 'javascript':
      return (
        <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>JS</div>
      );
    case 'typescript':
      return (
        <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>TS</div>
      );
    case 'node':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#339933">
          <path d="M12 0L2.8 5.3v10.6L12 21.2l9.2-5.3V5.3zm.9 3.5c1.4.2 2.7.9 3.5 1.9l-1.4 1.4c-.6-.7-1.4-1.1-2.3-1.2V3.5zm-1.8 0v2.1c-.9.1-1.7.5-2.3 1.2L7.4 5.4c.8-1 2.1-1.7 3.5-1.9zm-4.3 4.2l1.4 1.4c-.3.5-.4 1.1-.4 1.7v1.8c0 .6.1 1.2.4 1.7L6.8 15c-.6-1-1-2.1-1-3.3v-1.8c0-1.2.4-2.3 1-3.2zm10.4 0c.6 1 1 2.1 1 3.2v1.8c0 1.2-.4 2.3-1 3.3l-1.4-1.4c.3-.5.4-1.1.4-1.7v-1.8c0-.6-.1-1.2-.4-1.7l1.4-1.4zm-7 5v1.8c0 1 .4 1.9 1 2.6l-1.4 1.4c-1.2-1.2-1.8-2.8-1.8-4.5V11.2h2.2v1.5zm6 0h2.2v1.5c0 1.7-.6 3.3-1.8 4.5l-1.4-1.4c.6-.7 1-1.6 1-2.6v-1.8z" />
        </svg>
      );
    case 'express':
      return (
        <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '9px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>EX</div>
      );
    case 'python':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 0C5.4 0 5.4 2.8 5.4 2.8V6h6.6V7H5.4s-5.4 0-5.4 5.4c0 5.4 4.8 5.4 4.8 5.4h2.9v-4.1c0-3 2.4-5.4 5.4-5.4h4.1V2.8S18.6 0 12 0z" fill="#3776AB" />
          <path d="M12 24c6.6 0 6.6-2.8 6.6-2.8V18H12v-1h6.6s5.4 0 5.4-5.4C24 6.2 19.2 6.2 19.2 6.2h-2.9v4.1c0 3-2.4 5.4-5.4 5.4H6.8V21.2S5.4 24 12 24z" fill="#FFE873" />
        </svg>
      );
    case 'django':
      return (
        <div style={{ width: '24px', height: '24px', background: '#092e20', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold', fontFamily: 'serif' }}>dj</div>
      );
    case 'database':
    case 'sql':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#4169E1">
          <path d="M12 1C6 1 2 3.2 2 6v12c0 2.8 4 5 10 5s10-2.2 10-5V6c0-2.8-4-5-10-5zm8 5c0 1.2-3.6 3-8 3S4 7.2 4 6s3.6-3 8-3 8 1.8 8 3zm0 6c0 1.2-3.6 3-8 3S4 13.2 4 12V8.2c1.7 1.1 4.7 1.8 8 1.8s6.3-.7 8-1.8V12zm0 6c0 1.2-3.6 3-8 3s-8-1.8-8-3v-3.8c1.7 1.1 4.7 1.8 8 1.8s6.3-.7 8-1.8V18z" />
        </svg>
      );
    case 'git':
    case 'github':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.3 11.2L12.8.7a2.5 2.5 0 0 0-3.6 0L1.2 8.7a2.5 2.5 0 0 0 0 3.6l10.5 10.5a2.5 2.5 0 0 0 3.6 0l8-8a2.5 2.5 0 0 0 0-3.6zM12 18.2a2 2 0 0 1-2.8 0 2 2 0 0 1 0-2.8l1.6-1.6v-3.4a2 2 0 0 1-1.3-1.9 2 2 0 1 1 3.4 1.4v3.9l-1 1a2 2 0 0 1 .1 3.3z" />
        </svg>
      );
    case 'docker':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13.9 10.6h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2h-2.2zm-2.8 0h2.2v2.2H8.3zm-2.8 0h2.2v2.2H5.5zm8.4-2.8h2.2V10h-2.2zm-2.8 0h2.2V10h-2.2zm-2.8 0h2.2V10H8.3zm8.4-2.8h2.2v2.2h-2.2zm-14.7 7c-.2.7-.3 1.5-.3 2.2 0 4.6 3.8 8.3 8.3 8.3s8.3-3.7 8.3-8.3h-1.1c0 3.9-3.2 7.2-7.2 7.2S5.7 18.9 5.7 15h1.1l2.2-2.2H3.6v.1z" />
        </svg>
      );
    case 'linux':
    case 'terminal':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FCC624">
          <path d="M12 .5C8 .5 6.6 4.3 6.6 5.8c0 1.2.6 1.7.6 1.7s-1.8.8-2.6 2.3c-.8 1.5-.5 3.3.3 3.9.8.6.6.6.6.6s-.9.8-1.1 2.3c-.2 1.5 1.1 2.2 1.1 2.2s.3 1.3 1.9 1.7c1.6.4 3 0 3 0s1.4.8 4 0c2.6-.8 1.9-3.2 1.9-3.2s1.4-1.3 1-3.2c-.4-1.9-2.2-2.5-2.2-2.5s.4-1 .4-2.2c0-1.2-1-6.1-5-6.1zm0 3c2.2 0 2.2 2 2.2 3s-1 1.7-2.2 1.7-2.2-.7-2.2-1.7 1-3 2.2-3z" />
        </svg>
      );
    case 'vscode':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#007ACC">
          <path d="M23.9 6.5l-2.7-2.7c-.1-.1-.3-.1-.4 0L12.5 10l-4.7-4.2c-.1-.1-.3-.1-.4 0L.3 8.3c-.4.4-.4 1 0 1.4l5.3 4.8L.3 19.3c-.4.4-.4 1 0 1.4l7.1 2.5c.1 0 .3 0 .4-.1l4.7-4.2 8.3 6.2c.1.1.3.1.4 0l2.7-2.7c.3-.3.3-.9 0-1.2L15.5 15l8.4-7.3c.3-.3.3-.9 0-1.2z" />
        </svg>
      );
    case 'cpp':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#00599C">
          <path d="M24 10.182h-2.182V8h-1.636v2.182H18v1.636h2.182V14h1.636v-2.182H24zM13.23 4.542c-4.116-.27-7.854 2.37-8.985 6.326a9.09 9.09 0 0 0 5.485 11.233c3.966 1.396 8.358-.337 10.334-4.084l-2.45-1.42a6.223 6.223 0 0 1-7.067 2.82 6.22 6.22 0 0 1-3.766-7.669A6.222 6.222 0 0 1 13.92 7.37c2.72.18 5.176 1.83 6.136 4.385l2.45-1.42A9.092 9.092 0 0 0 13.23 4.542zm4.316 5.64H15.36V8h-1.636v2.182h-2.182v1.636h2.182V14h1.636v-2.182h2.182z"/>
        </svg>
      );
    case 'java':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#EA2D2E">
          <path d="M11.968 18.06c-.66.082-1.393-.162-1.393-.162a4.417 4.417 0 0 1 2.368-2.613c1.787-.843 3.659-.728 5.253-.418a16.892 16.892 0 0 1-6.228 3.193zm7.68-1.503c-.22.046-2.459-.364-5.617-1.12-2.316-.554-4.838-.934-7.078.293a5.556 5.556 0 0 0-.294 3.738C8.52 18.307 12.392 16.924 19.648 16.557zM2.8 19.907c0 .94 3.6 1.704 8.04 1.704s8.04-.764 8.04-1.704-3.6-1.704-8.04-1.704-8.04.764-8.04 1.704zm11.238-7.854c.732.18 1.157.653 1.11 1.258-.09.914-1.69 1.488-3.056 1.63a7.48 7.48 0 0 1 1.946-2.888zm.974-1.28c-.143.08-.293.18-.456.3-.772.585-2.02 1.533-2.378 2.656-.44 1.385.228 2.217.228 2.217s-.766-.994-.488-2.26c.325-1.483 1.748-2.52 2.64-3.136.236-.163.383-.245.454-.277zm1.196-1.545a16.815 16.815 0 0 0-4.004-.728c.382.49.692 1.1.868 1.79 1.417.065 2.502-.387 3.136-1.062z"/>
        </svg>
      );
    case 'dsa':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="3" />
          <circle cx="6" cy="19" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="12" y1="8" x2="6" y2="16" />
          <line x1="12" y1="8" x2="18" y2="16" />
        </svg>
      );
    case 'oop':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="7" height="7" rx="1" />
          <rect x="15" y="3" width="7" height="7" rx="1" />
          <rect x="8.5" y="14" width="7" height="7" rx="1" />
          <line x1="5.5" y1="10" x2="5.5" y2="12" />
          <line x1="18.5" y1="10" x2="18.5" y2="12" />
          <line x1="5.5" y1="12" x2="18.5" y2="12" />
          <line x1="12" y1="12" x2="12" y2="14" />
        </svg>
      );
    case 'html':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#E34F26">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm4 3l1.4 15.5L12 20.7l5.1-2.2L18.5 3H5.5zm11 5H9.7l-.2-2h7l-.2-2h-9.2l.6 6h6.7l-.3 3.5-3.1.9-3.1-.9-.2-2.2H6.9l.4 4.5 4.7 1.3 4.7-1.3.8-8.8z"/>
        </svg>
      );
    case 'css':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#1572B6">
          <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm4 3l1.4 15.5L12 20.7l5.1-2.2L18.5 3H5.5zm11 5H9.7l-.2-2h7l-.2-2h-9.2l.6 6H15.1l-.3 3.5-2.8.8-2.8-.8-.2-2.2H6.9l.4 4.5 4.7 1.3 4.7-1.3.8-8.8H16.5z"/>
        </svg>
      );
    default:
      if (name && name !== 'custom') {
        return <CdnLogo name={name} />;
      }
      return (
        <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          ✦
        </div>
      );
  }
};

// Component for fetching and displaying Simple Icons CDN logos
export const CdnLogo = ({ name }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div style={{ width: '24px', height: '24px', background: '#1c1e2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8f94a6', fontSize: '11px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
        {name ? name.slice(0, 2).toUpperCase() : '✦'}
      </div>
    );
  }

  // Convert to slug representation expected by Simple Icons
  // Remove space, dots, convert to lowercase
  const cleanSlug = name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/\.js/g, 'dotjs')
    .replace(/\.net/g, 'dotnet')
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp');

  return (
    <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={`https://cdn.simpleicons.org/${cleanSlug}`} 
        alt={name}
        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
        onError={() => setHasError(true)}
      />
    </div>
  );
};

// Map items to inject SVG elements
export const mapSkillsItem = (category) => ({
  ...category,
  icon: <CategoryIcon name={category.iconName} />,
  languages: category.languages.map(lang => ({
    ...lang,
    logo: <SkillLogo name={lang.logoName} />
  }))
});

const mapSkillsList = (list) => list.map(mapSkillsItem);

const loadLocalSkills = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_skills');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse cached portfolio_skills:', e);
      }
    }
  }
  return initialSkillsList;
};

const techCategories = mapSkillsList(loadLocalSkills());

export const updateSkillsList = (newList) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_skills', JSON.stringify(newList));
  }
  
  techCategories.length = 0;
  newList.forEach(item => {
    techCategories.push(mapSkillsItem(item));
  });
};

export const useSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'skills'), orderBy('id', 'asc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const list = [];
            snapshot.forEach((doc) => {
              list.push({ ...doc.data() });
            });
            if (isMounted) {
              setSkills(mapSkillsList(list));
              setLoading(false);
            }
          } else {
            const local = loadLocalSkills();
            if (isMounted) {
              setSkills(mapSkillsList(local));
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore skills listener failed:", error);
          const local = loadLocalSkills();
          if (isMounted) {
            setSkills(mapSkillsList(local));
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore skills listener setup error:", error);
        const local = loadLocalSkills();
        if (isMounted) {
          setSkills(mapSkillsList(local));
          setLoading(false);
        }
      }
    } else {
      const local = loadLocalSkills();
      setSkills(mapSkillsList(local));
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { skills, loading };
};

export default techCategories;
