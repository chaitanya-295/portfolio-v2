import React, { useState, useEffect } from 'react';
import { useServices, updateServicesList, ServiceIcon } from '../data/services';
import { useProjects, updateProjectsList, ProjectIcon, assetMap } from '../data/projects';
import { useCertifications, updateCertificationsList } from '../data/certifications';
import { useSkills, updateSkillsList, CategoryIcon, SkillLogo } from '../data/skills';
import { useProfile, updateProfile } from '../data/profile';
import { useServicesPage, updateServicesPage } from '../data/servicesPage';
import { useBlogPosts, updateBlogPostsList } from '../data/blogPosts';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import './AdminPanel.css';

// Preset Glow Colors
const GLOW_PRESETS = [
  { name: 'Cyan', value: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' },
  { name: 'Purple', value: 'rgba(168, 85, 247, 0.15)', color: 'var(--accent-purple)' },
  { name: 'Pink', value: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-pink)' },
  { name: 'Indigo', value: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)' }
];

const PLAN_COLOR_PRESETS = [
  { name: 'Cyan', color: '#06b6d4', glowBase: 'rgba(6, 182, 212, 0.18)', glowPopular: 'rgba(6, 182, 212, 0.25)' },
  { name: 'Purple', color: '#a855f7', glowBase: 'rgba(168, 85, 247, 0.18)', glowPopular: 'rgba(168, 85, 247, 0.25)' },
  { name: 'Pink', color: '#ec4899', glowBase: 'rgba(236, 72, 153, 0.18)', glowPopular: 'rgba(236, 72, 153, 0.25)' },
  { name: 'Indigo', color: '#6366f1', glowBase: 'rgba(99, 102, 241, 0.18)', glowPopular: 'rgba(99, 102, 241, 0.25)' },
  { name: 'Magenta', color: '#d946ef', glowBase: 'rgba(217, 70, 239, 0.18)', glowPopular: 'rgba(217, 70, 239, 0.25)' }
];

// List of popular tech logos for selection and search suggestions
const POPULAR_LOGOS = [
  { name: 'React / React Native', slug: 'react' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Node.js', slug: 'nodedotjs' },
  { name: 'Express.js', slug: 'express' },
  { name: 'Python', slug: 'python' },
  { name: 'Django', slug: 'django' },
  { name: 'PostgreSQL', slug: 'postgresql' },
  { name: 'MySQL', slug: 'mysql' },
  { name: 'MongoDB', slug: 'mongodb' },
  { name: 'SQLite', slug: 'sqlite' },
  { name: 'Firebase', slug: 'firebase' },
  { name: 'Git', slug: 'git' },
  { name: 'GitHub', slug: 'github' },
  { name: 'Docker', slug: 'docker' },
  { name: 'Linux / Terminal', slug: 'linux' },
  { name: 'VS Code', slug: 'visualstudiocode' },
  { name: 'C++', slug: 'cplusplus' },
  { name: 'Java', slug: 'openjdk' },
  { name: 'HTML5', slug: 'html5' },
  { name: 'CSS3', slug: 'css3' },
  { name: 'Next.js', slug: 'nextdotjs' },
  { name: 'Vue.js', slug: 'vuedotjs' },
  { name: 'Angular', slug: 'angular' },
  { name: 'Svelte', slug: 'svelte' },
  { name: 'GraphQL', slug: 'graphql' },
  { name: 'Redux', slug: 'redux' },
  { name: 'Sass', slug: 'sass' },
  { name: 'Bootstrap', slug: 'bootstrap' },
  { name: 'AWS', slug: 'amazonwebservices' },
  { name: 'Google Cloud', slug: 'googlecloud' },
  { name: 'Azure', slug: 'microsoftazure' },
  { name: 'Vercel', slug: 'vercel' },
  { name: 'Netlify', slug: 'netlify' },
  { name: 'DigitalOcean', slug: 'digitalocean' },
  { name: 'Redis', slug: 'redis' },
  { name: 'Kotlin', slug: 'kotlin' },
  { name: 'Swift', slug: 'swift' },
  { name: 'Rust', slug: 'rust' },
  { name: 'Go', slug: 'go' },
  { name: 'Ruby', slug: 'ruby' },
  { name: 'Rails', slug: 'rubyonrails' },
  { name: 'PHP', slug: 'php' },
  { name: 'Laravel', slug: 'laravel' },
  { name: 'Flutter', slug: 'flutter' },
  { name: 'Dart', slug: 'dart' },
  { name: 'Figma', slug: 'figma' },
  { name: 'TensorFlow', slug: 'tensorflow' },
  { name: 'PyTorch', slug: 'pytorch' }
];

function LogoSearchSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customLoadError, setCustomLoadError] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClose = () => setIsOpen(false);
    document.addEventListener('click', handleClose);
    return () => document.removeEventListener('click', handleClose);
  }, [isOpen]);

  // Clean slug helper for live custom preview matching Simple Icons slugs
  const getCleanSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .replace(/\.js/g, 'dotjs')
      .replace(/\.net/g, 'dotnet')
      .replace(/\+/g, 'plus')
      .replace(/#/g, 'sharp');
  };

  // Reset load error when search query changes
  useEffect(() => {
    setCustomLoadError(false);
  }, [search]);

  const filtered = POPULAR_LOGOS.filter(
    item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.slug.toLowerCase().includes(search.toLowerCase())
  );

  const activeLogo = POPULAR_LOGOS.find(l => l.slug === value) || { name: value, slug: value };
  const showCustomOption = search.trim().length > 0 && !POPULAR_LOGOS.some(l => l.slug === getCleanSlug(search));

  return (
    <div 
      className="logo-search-container" 
      onClick={(e) => e.stopPropagation()} 
      style={{ position: 'relative', width: '100%' }}
    >
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="admin-select"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          height: '44px',
          borderRadius: '12px',
          border: isOpen ? '1px solid rgba(168, 85, 247, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: isOpen ? '0 0 15px rgba(168, 85, 247, 0.15)' : 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
            <SkillLogo name={value} />
          </div>
          <span style={{ fontSize: '13.5px', color: 'white', textTransform: 'capitalize' }}>
            {activeLogo.name || value || 'Select Logo'}
          </span>
        </div>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', opacity: 0.7 }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '12px',
            background: 'rgba(15, 10, 29, 0.96)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(168, 85, 247, 0.15)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            maxHeight: '300px'
          }}
        >
          {/* Search Input */}
          <input
            type="text"
            className="admin-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type technology (e.g. redis, rust)..."
            autoFocus
            style={{
              padding: '8px 12px',
              fontSize: '13px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.02)'
            }}
          />

          {/* Results List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              overflowY: 'auto',
              flexGrow: 1,
              paddingRight: '2px'
            }}
          >
            {/* Live Search Option if query doesn't match predefined list */}
            {showCustomOption && (
              <div
                onClick={() => {
                  onChange(getCleanSlug(search));
                  setIsOpen(false);
                  setSearch('');
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  background: 'rgba(168, 85, 247, 0.08)',
                  border: '1px solid rgba(168, 85, 247, 0.25)',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                    {!customLoadError ? (
                      <img
                        src={`https://cdn.simpleicons.org/${getCleanSlug(search)}`}
                        alt={search}
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                        onError={() => setCustomLoadError(true)}
                      />
                    ) : (
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>✦</div>
                    )}
                  </div>
                  <span style={{ fontSize: '13px', color: 'white', fontWeight: '500' }}>
                    Use custom: "{getCleanSlug(search)}"
                  </span>
                </div>
                <span style={{ fontSize: '10px', color: !customLoadError ? '#34d399' : 'var(--text-secondary)', fontWeight: '600' }}>
                  {!customLoadError ? 'Online Preview' : 'Text Initials'}
                </span>
              </div>
            )}

            {/* List of Curated Icons */}
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.slug}
                  onClick={() => {
                    onChange(item.slug);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    background: value === item.slug ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: '1px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = value === item.slug ? 'rgba(255,255,255,0.06)' : 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                    <SkillLogo name={item.slug} />
                  </div>
                  <span style={{ fontSize: '13px', color: 'white' }}>{item.name}</span>
                </div>
              ))
            ) : (
              !showCustomOption && (
                <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
                  No match found. Type slug to search online!
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const hexToRgba = (hex, alpha = 0.18) => {
  if (!hex) return '';
  const cleanHex = hex.replace('#', '');
  if (cleanHex.length !== 6 && cleanHex.length !== 3) return '';
  let r, g, b;
  if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return '';
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('services'); // 'services', 'projects', or 'certifications'
  const { services, loading: servicesLoading } = useServices();
  const { projects, loading: projectsLoading } = useProjects();
  const { certifications, loading: certificationsLoading } = useCertifications();
  const { skills, loading: skillsLoading } = useSkills();
  const { profile, loading: profileLoading } = useProfile();
  const { config: servicesPageConfig, loading: servicesPageLoading } = useServicesPage();
  const { blogPosts, loading: blogsLoading } = useBlogPosts();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);

  // Form Fields State (Profile)
  const [profName, setProfName] = useState('');
  const [profEmail, setProfEmail] = useState('');
  const [profResumeUrl, setProfResumeUrl] = useState('');
  const [profAvatar, setProfAvatar] = useState('');
  const [profShortBio, setProfShortBio] = useState('');
  const [profHomeBio, setProfHomeBio] = useState('');
  const [profLongBioInput, setProfLongBioInput] = useState('');
  const [profPhrasesInput, setProfPhrasesInput] = useState('');
  const [profGithubUrl, setProfGithubUrl] = useState('');
  const [profLinkedinUrl, setProfLinkedinUrl] = useState('');
  const [profInstagramUrl, setProfInstagramUrl] = useState('');
  const [profBadgesInput, setProfBadgesInput] = useState('');
  const [profStats, setProfStats] = useState([
    { value: '', label: '' },
    { value: '', label: '' },
    { value: '', label: '' }
  ]);
  const [profSkills, setProfSkills] = useState([]);

  // Form Fields State (Services Page)
  const [spHeroBadge, setSpHeroBadge] = useState('');
  const [spHeroTitle, setSpHeroTitle] = useState('');
  const [spHeroSubtitle, setSpHeroSubtitle] = useState('');
  const [spHeroDesc, setSpHeroDesc] = useState('');
  const [spPlans, setSpPlans] = useState([]);
  const [spWhyHire, setSpWhyHire] = useState([]);
  const [spStatusText, setSpStatusText] = useState('');
  const [spStatusProgress, setSpStatusProgress] = useState(98);
  const [spPerformanceScore, setSpPerformanceScore] = useState('');
  const [spSpeedIndex, setSpSpeedIndex] = useState('');
  const [spSeoScore, setSpSeoScore] = useState('');
  const [spSecurityScore, setSpSecurityScore] = useState('');
  const [spCtaTitle, setSpCtaTitle] = useState('');
  const [spCtaDesc, setSpCtaDesc] = useState('');
  const [spWhatsappLink, setSpWhatsappLink] = useState('');
  const [spEmailAddress, setSpEmailAddress] = useState('');

  // Form Fields State (Services)
  const [sTitle, setSTitle] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sGlow, setSGlow] = useState('rgba(6, 182, 212, 0.15)');
  const [sIconName, setSIconName] = useState('web');
  const [sTagsInput, setSTagsInput] = useState('');

  // Form Fields State (Projects)
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('');
  const [pImage, setPImage] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pFullDesc, setPFullDesc] = useState('');
  const [pRole, setPRole] = useState('');
  const [pDate, setPDate] = useState('');
  const [pLiveUrl, setPLiveUrl] = useState('');
  const [pGithubUrl, setPGithubUrl] = useState('');
  const [pYoutubeUrl, setPYoutubeUrl] = useState('');
  const [pGlow, setPGlow] = useState('rgba(6, 182, 212, 0.15)');
  const [pIconName, setPIconName] = useState('orbit');
  const [pTagsInput, setPTagsInput] = useState('');
  const [pFeaturesInput, setPFeaturesInput] = useState('');

  // Form Fields State (Certifications)
  const [cTitle, setCTitle] = useState('');
  const [cIssuer, setCIssuer] = useState('');
  const [cDate, setCDate] = useState('');
  const [cGlow, setCGlow] = useState('rgba(6, 182, 212, 0.15)');
  const [cLink, setCLink] = useState('');

  // Form Fields State (Education)
  const [eduDegree, setEduDegree] = useState('');
  const [eduSchool, setEduSchool] = useState('');
  const [eduDuration, setEduDuration] = useState('');
  const [eduGrade, setEduGrade] = useState('');
  const [eduGlow, setEduGlow] = useState('rgba(6, 182, 212, 0.15)');
  const [eduDescription, setEduDescription] = useState('');

  // Form Fields State (Experience)
  const [expRole, setExpRole] = useState('');
  const [expCompany, setExpCompany] = useState('');
  const [expDuration, setExpDuration] = useState('');
  const [expGlow, setExpGlow] = useState('rgba(168, 85, 247, 0.15)');
  const [expDescription, setExpDescription] = useState('');
  const [expCertificate, setExpCertificate] = useState('');

  // Form Fields State (Skills/Tech Stack)
  const [skTitle, setSkTitle] = useState('');
  const [skType, setSkType] = useState('frontend');
  const [skGlow, setSkGlow] = useState('rgba(6, 182, 212, 0.15)');
  const [skIconName, setSkIconName] = useState('frontend');
  const [skLanguages, setSkLanguages] = useState([]);

  // Form Fields State (Blogs)
  const [bTitle, setBTitle] = useState('');
  const [bCategory, setBCategory] = useState('Creative Dev');
  const [bDate, setBDate] = useState('');
  const [bReadTime, setBReadTime] = useState('5 min read');
  const [bDesc, setBDesc] = useState('');
  const [bImage, setBImage] = useState('');
  const [bTagsInput, setBTagsInput] = useState('');
  const [bGlow, setBGlow] = useState('rgba(6, 182, 212, 0.18)');
  const [bContent, setBContent] = useState([]);

  // UI Status State
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Clean React components and computed fields before storage
  const cleanServicesForStorage = (list) => {
    return list.map(s => {
      const clean = { ...s };
      delete clean.color;
      delete clean.icon;
      return clean;
    });
  };

  const cleanProjectsForStorage = (list) => {
    return list.map(p => {
      const clean = { ...p };
      if (clean.imageFile) {
        clean.image = clean.imageFile;
      }
      delete clean.icon;
      delete clean.imageFile;
      return clean;
    });
  };

  const cleanCertificationsForStorage = (list) => {
    return list.map(c => {
      const clean = { ...c };
      delete clean.color;
      return clean;
    });
  };

  const cleanSkillsForStorage = (list) => {
    return list.map(c => {
      const clean = { ...c };
      delete clean.icon;
      delete clean.color;
      if (clean.languages) {
        clean.languages = clean.languages.map(lang => {
          const lClean = { ...lang };
          delete lClean.logo;
          return lClean;
        });
      }
      return clean;
    });
  };

  // Sync form states with selected service
  useEffect(() => {
    if (activeTab === 'services') {
      if (selectedItem && !isCreateMode) {
        setSTitle(selectedItem.title || '');
        setSDesc(selectedItem.desc || '');
        setSGlow(selectedItem.glow || 'rgba(6, 182, 212, 0.15)');
        setSIconName(selectedItem.iconName || 'web');
        setSTagsInput(selectedItem.tags ? selectedItem.tags.join(', ') : '');
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setSTitle('');
        setSDesc('');
        setSGlow('rgba(6, 182, 212, 0.15)');
        setSIconName('web');
        setSTagsInput('');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with selected project
  useEffect(() => {
    if (activeTab === 'projects') {
      if (selectedItem && !isCreateMode) {
        setPTitle(selectedItem.title || '');
        setPCategory(selectedItem.category || '');
        setPImage(selectedItem.imageFile || selectedItem.image || '');
        setPDesc(selectedItem.desc || '');
        setPFullDesc(selectedItem.fullDesc || '');
        setPRole(selectedItem.role || '');
        setPDate(selectedItem.date || '');
        setPLiveUrl(selectedItem.liveUrl || '');
        setPGithubUrl(selectedItem.githubUrl || '');
        setPYoutubeUrl(selectedItem.youtubeUrl || '');
        setPGlow(selectedItem.glow || 'rgba(6, 182, 212, 0.15)');
        setPIconName(selectedItem.iconName || 'orbit');
        setPTagsInput(selectedItem.tags ? selectedItem.tags.join(', ') : '');
        setPFeaturesInput(selectedItem.features ? selectedItem.features.join('\n') : '');
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setPTitle('');
        setPCategory('');
        setPImage('');
        setPDesc('');
        setPFullDesc('');
        setPRole('');
        setPDate('');
        setPLiveUrl('');
        setPGithubUrl('');
        setPYoutubeUrl('');
        setPGlow('rgba(6, 182, 212, 0.15)');
        setPIconName('orbit');
        setPTagsInput('');
        setPFeaturesInput('');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with selected certification
  useEffect(() => {
    if (activeTab === 'certifications') {
      if (selectedItem && !isCreateMode) {
        setCTitle(selectedItem.title || '');
        setCIssuer(selectedItem.issuer || '');
        setCDate(selectedItem.date || '');
        setCGlow(selectedItem.glow || 'rgba(6, 182, 212, 0.15)');
        setCLink(selectedItem.link || '');
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setCTitle('');
        setCIssuer('');
        setCDate('');
        setCGlow('rgba(6, 182, 212, 0.15)');
        setCLink('');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with selected tech stack category
  useEffect(() => {
    if (activeTab === 'tech-stack') {
      if (selectedItem && !isCreateMode) {
        setSkTitle(selectedItem.title || '');
        setSkType(selectedItem.type || 'frontend');
        setSkGlow(selectedItem.glow || 'rgba(6, 182, 212, 0.15)');
        setSkIconName(selectedItem.iconName || 'frontend');
        setSkLanguages(selectedItem.languages ? selectedItem.languages.map(lang => ({
          name: lang.name || '',
          level: lang.level || '',
          percentage: lang.percentage || 80,
          logoName: lang.logoName || 'react'
        })) : []);
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setSkTitle('');
        setSkType('frontend');
        setSkGlow('rgba(6, 182, 212, 0.15)');
        setSkIconName('frontend');
        setSkLanguages([]);
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with selected education qualification
  useEffect(() => {
    if (activeTab === 'education') {
      if (selectedItem && !isCreateMode) {
        setEduDegree(selectedItem.degree || '');
        setEduSchool(selectedItem.school || '');
        setEduDuration(selectedItem.duration || '');
        setEduGrade(selectedItem.grade || '');
        const activePreset = GLOW_PRESETS.find(p => p.color === selectedItem.color) || GLOW_PRESETS[0];
        setEduGlow(activePreset.value);
        setEduDescription(selectedItem.description || '');
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setEduDegree('');
        setEduSchool('');
        setEduDuration('');
        setEduGrade('');
        setEduGlow('rgba(6, 182, 212, 0.15)');
        setEduDescription('');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with selected professional experience
  useEffect(() => {
    if (activeTab === 'experience') {
      if (selectedItem && !isCreateMode) {
        setExpRole(selectedItem.role || '');
        setExpCompany(selectedItem.company || '');
        setExpDuration(selectedItem.duration || '');
        const activePreset = GLOW_PRESETS.find(p => p.color === selectedItem.color) || GLOW_PRESETS[1];
        setExpGlow(activePreset.value);
        setExpDescription(selectedItem.description || '');
        setExpCertificate(selectedItem.certificate || '');
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setExpRole('');
        setExpCompany('');
        setExpDuration('');
        setExpGlow('rgba(168, 85, 247, 0.15)');
        setExpDescription('');
        setExpCertificate('');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  // Sync form states with profile settings
  useEffect(() => {
    if (activeTab === 'profile') {
      if (profile) {
        setProfName(profile.name || '');
        setProfEmail(profile.email || '');
        setProfResumeUrl(profile.resumeUrl || '');
        setProfAvatar(profile.avatar || '');
        setProfShortBio(profile.shortBio || '');
        setProfHomeBio(profile.homeBio || (profile.longBio && profile.longBio.length > 0 ? profile.longBio[0] : ''));
        setProfLongBioInput(profile.longBio ? profile.longBio.join('\n') : '');
        setProfPhrasesInput(profile.phrases ? profile.phrases.join(', ') : '');
        setProfGithubUrl(profile.githubUrl || '');
        setProfLinkedinUrl(profile.linkedinUrl || '');
        setProfInstagramUrl(profile.instagramUrl || '');
        setProfBadgesInput(profile.skillsBadges ? profile.skillsBadges.join(', ') : '');
        setProfStats(profile.stats ? profile.stats.map(s => ({ value: s.value || '', label: s.label || '' })) : [
          { value: '', label: '' },
          { value: '', label: '' },
          { value: '', label: '' }
        ]);
        setProfSkills(profile.skillsList ? profile.skillsList.map(s => ({ name: s.name || '', level: s.level || 80, color: s.color || 'var(--accent-cyan)' })) : []);
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [profile, activeTab]);

  // Sync form states with Services Page config
  useEffect(() => {
    if (activeTab === 'services-page') {
      if (servicesPageConfig) {
        setSpHeroBadge(servicesPageConfig.heroBadge || '');
        setSpHeroTitle(servicesPageConfig.heroTitle || '');
        setSpHeroSubtitle(servicesPageConfig.heroSubtitle || '');
        setSpHeroDesc(servicesPageConfig.heroDesc || '');
        setSpPlans(servicesPageConfig.plans ? servicesPageConfig.plans.map(p => ({ ...p })) : []);
        setSpWhyHire(servicesPageConfig.whyHireMe ? servicesPageConfig.whyHireMe.map(w => ({ ...w })) : []);
        setSpStatusText(servicesPageConfig.statusText || '');
        setSpStatusProgress(servicesPageConfig.statusProgress || 98);
        setSpPerformanceScore(servicesPageConfig.performanceScore || '');
        setSpSpeedIndex(servicesPageConfig.speedIndex || '');
        setSpSeoScore(servicesPageConfig.seoScore || '');
        setSpSecurityScore(servicesPageConfig.securityScore || '');
        setSpCtaTitle(servicesPageConfig.ctaTitle || '');
        setSpCtaDesc(servicesPageConfig.ctaDesc || '');
        setSpWhatsappLink(servicesPageConfig.whatsappLink || '');
        setSpEmailAddress(servicesPageConfig.emailAddress || '');
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [servicesPageConfig, activeTab]);

  // Sync form states with selected blog post
  useEffect(() => {
    if (activeTab === 'blogs') {
      if (selectedItem && !isCreateMode) {
        setBTitle(selectedItem.title || '');
        setBCategory(selectedItem.category || 'Creative Dev');
        setBDate(selectedItem.date || '');
        setBReadTime(selectedItem.readTime || '5 min read');
        setBDesc(selectedItem.desc || '');
        setBImage(selectedItem.imageFile || selectedItem.image || '');
        setBTagsInput(selectedItem.tags ? selectedItem.tags.join(', ') : '');
        setBGlow(selectedItem.glow || 'rgba(6, 182, 212, 0.18)');
        setBContent(selectedItem.content || []);
        setSuccessMsg('');
        setErrorMsg('');
      } else if (isCreateMode) {
        setBTitle('');
        setBCategory('Creative Dev');
        setBDate(new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }));
        setBReadTime('5 min read');
        setBDesc('');
        setBImage('');
        setBTagsInput('');
        setBGlow('rgba(6, 182, 212, 0.18)');
        setBContent([{ type: 'paragraph', text: '' }]);
        setSuccessMsg('');
        setErrorMsg('');
      }
    }
  }, [selectedItem, isCreateMode, activeTab]);

  const handleStartCreate = () => {
    setIsCreateMode(true);
    setSelectedItem(null);
  };

  const handleSelectItem = (item) => {
    setIsCreateMode(false);
    setSelectedItem(item);
  };

  const handleCancel = () => {
    setIsCreateMode(false);
    setSelectedItem(null);
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 1.5MB for localStorage performance
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setPImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 1.5MB for localStorage performance
    if (file.size > 1.5 * 1024 * 1024) {
      alert("PDF file is too large. Please select a PDF file smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setCLink(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 1.5MB for Firestore/localStorage performance
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Resume PDF file is too large. Please select a PDF file smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setProfResumeUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 1.5MB for Firestore/localStorage performance
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Avatar image file is too large. Please select an image smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setProfAvatar(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleExpCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Limit to 1.5MB for Firestore/localStorage performance
    if (file.size > 1.5 * 1024 * 1024) {
      alert("Certificate file is too large. Please select a file smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setExpCertificate(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveService = async () => {
    const tags = sTagsInput.split(',').map(t => t.trim()).filter(t => t !== '');
    let updatedRawList = [];

    if (isCreateMode) {
      const nextId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 0;
      const newService = {
        id: nextId,
        title: sTitle,
        desc: sDesc,
        glow: sGlow,
        iconName: sIconName,
        tags
      };

      updatedRawList = [...services, newService];

      if (db) {
        await addDoc(collection(db, 'services'), newService);
      }
      setSuccessMsg('Service created successfully!');
    } else {
      const updatedService = {
        ...selectedItem,
        title: sTitle,
        desc: sDesc,
        glow: sGlow,
        iconName: sIconName,
        tags
      };

      updatedRawList = services.map(s => s.id === selectedItem.id ? updatedService : s);

      if (db) {
        const q = query(collection(db, 'services'), where('id', '==', selectedItem.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await updateDoc(querySnapshot.docs[0].ref, {
            title: sTitle,
            desc: sDesc,
            glow: sGlow,
            iconName: sIconName,
            tags
          });
        }
      }
      setSuccessMsg('Service updated successfully!');
    }

    const cleaned = cleanServicesForStorage(updatedRawList);
    updateServicesList(cleaned);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveProject = async () => {
    const tags = pTagsInput.split(',').map(t => t.trim()).filter(t => t !== '');
    const features = pFeaturesInput.split('\n').map(f => f.trim()).filter(f => f !== '');
    let updatedRawList = [];

    const projectData = {
      title: pTitle,
      category: pCategory,
      image: pImage,
      desc: pDesc,
      fullDesc: pFullDesc,
      role: pRole,
      date: pDate,
      liveUrl: pLiveUrl,
      githubUrl: pGithubUrl,
      youtubeUrl: pYoutubeUrl,
      glow: pGlow,
      color: GLOW_PRESETS.find(p => p.value === pGlow)?.color || 'var(--accent-purple)',
      iconName: pIconName,
      tags,
      features,
      challenges: selectedItem?.challenges || [],
      solutions: selectedItem?.solutions || []
    };

    if (isCreateMode) {
      const nextId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 0;
      const newProject = {
        id: nextId,
        ...projectData
      };

      updatedRawList = [...projects, newProject];

      if (db) {
        await addDoc(collection(db, 'projects'), newProject);
      }
      setSuccessMsg('Project created successfully!');
    } else {
      const updatedProject = {
        ...selectedItem,
        ...projectData
      };

      updatedRawList = projects.map(p => p.id === selectedItem.id ? updatedProject : p);

      if (db) {
        const q = query(collection(db, 'projects'), where('id', '==', selectedItem.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await updateDoc(querySnapshot.docs[0].ref, projectData);
        }
      }
      setSuccessMsg('Project updated successfully!');
    }

    const cleaned = cleanProjectsForStorage(updatedRawList);
    updateProjectsList(cleaned);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveCertification = async () => {
    let updatedRawList = [];

    const certData = {
      title: cTitle,
      issuer: cIssuer,
      date: cDate,
      glow: cGlow,
      link: cLink
    };

    if (isCreateMode) {
      const nextId = certifications.length > 0 ? Math.max(...certifications.map(c => c.id)) + 1 : 0;
      const newCert = {
        id: nextId,
        ...certData
      };

      updatedRawList = [...certifications, newCert];

      if (db) {
        await addDoc(collection(db, 'certifications'), newCert);
      }
      setSuccessMsg('Certification created successfully!');
    } else {
      const updatedCert = {
        ...selectedItem,
        ...certData
      };

      updatedRawList = certifications.map(c => c.id === selectedItem.id ? updatedCert : c);

      if (db) {
        const q = query(collection(db, 'certifications'), where('id', '==', selectedItem.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await updateDoc(querySnapshot.docs[0].ref, certData);
        }
      }
      setSuccessMsg('Certification updated successfully!');
    }

    const cleaned = cleanCertificationsForStorage(updatedRawList);
    updateCertificationsList(cleaned);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveSkill = async () => {
    let updatedRawList = [];

    const skillData = {
      title: skTitle,
      type: skType,
      glow: skGlow,
      color: GLOW_PRESETS.find(p => p.value === skGlow)?.color || 'var(--accent-purple)',
      iconName: skIconName,
      languages: skLanguages
    };

    if (isCreateMode) {
      const nextId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 0;
      const newCategory = {
        id: nextId,
        ...skillData
      };

      updatedRawList = [...skills, newCategory];

      if (db) {
        await addDoc(collection(db, 'skills'), newCategory);
      }
      setSuccessMsg('Tech stack category created successfully!');
    } else {
      const updatedCategory = {
        ...selectedItem,
        ...skillData
      };

      updatedRawList = skills.map(s => s.id === selectedItem.id ? updatedCategory : s);

      if (db) {
        const q = query(collection(db, 'skills'), where('id', '==', selectedItem.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await updateDoc(querySnapshot.docs[0].ref, skillData);
        }
      }
      setSuccessMsg('Tech stack category updated successfully!');
    }

    const cleaned = cleanSkillsForStorage(updatedRawList);
    updateSkillsList(cleaned);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveEducation = async () => {
    const updatedEduItem = {
      degree: eduDegree,
      school: eduSchool,
      duration: eduDuration,
      grade: eduGrade,
      description: eduDescription,
      color: GLOW_PRESETS.find(p => p.value === eduGlow)?.color || 'var(--accent-cyan)'
    };

    let updatedEducationList = [];
    const currentEducation = profile.education || [];

    if (isCreateMode) {
      updatedEducationList = [...currentEducation, updatedEduItem];
      setSuccessMsg('Education qualification added successfully!');
    } else {
      updatedEducationList = currentEducation.map((item, idx) => 
        idx === selectedItem.index ? updatedEduItem : item
      );
      setSuccessMsg('Education qualification updated successfully!');
    }

    const updatedProfile = {
      ...profile,
      education: updatedEducationList
    };

    if (db) {
      await setDoc(doc(db, 'profile', 'dev_profile'), updatedProfile);
    }
    updateProfile(updatedProfile);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveExperience = async () => {
    const updatedExpItem = {
      role: expRole,
      company: expCompany,
      duration: expDuration,
      description: expDescription,
      color: GLOW_PRESETS.find(p => p.value === expGlow)?.color || 'var(--accent-purple)',
      glow: expGlow.replace('0.15', '0.05'),
      certificate: expCertificate
    };

    let updatedExperienceList = [];
    const currentExperiences = profile.experiences || [];

    if (isCreateMode) {
      updatedExperienceList = [...currentExperiences, updatedExpItem];
      setSuccessMsg('Experience item added successfully!');
    } else {
      updatedExperienceList = currentExperiences.map((item, idx) => 
        idx === selectedItem.index ? updatedExpItem : item
      );
      setSuccessMsg('Experience item updated successfully!');
    }

    const updatedProfile = {
      ...profile,
      experiences: updatedExperienceList
    };

    if (db) {
      await setDoc(doc(db, 'profile', 'dev_profile'), updatedProfile);
    }
    updateProfile(updatedProfile);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSaveProfile = async () => {
    const longBio = profLongBioInput.split('\n').map(p => p.trim()).filter(p => p !== '');
    const phrases = profPhrasesInput.split(',').map(p => p.trim()).filter(p => p !== '');
    const skillsBadges = profBadgesInput.split(',').map(b => b.trim()).filter(b => b !== '');

    const updatedProfile = {
      ...profile,
      name: profName,
      email: profEmail,
      resumeUrl: profResumeUrl,
      avatar: profAvatar,
      shortBio: profShortBio,
      homeBio: profHomeBio,
      longBio,
      phrases,
      githubUrl: profGithubUrl,
      linkedinUrl: profLinkedinUrl,
      instagramUrl: profInstagramUrl,
      skillsBadges,
      stats: profStats,
      skillsList: profSkills,
      education: profile.education || [],
      experiences: profile.experiences || []
    };

    if (db) {
      await setDoc(doc(db, 'profile', 'dev_profile'), updatedProfile);
    }
    updateProfile(updatedProfile);
    setSuccessMsg('Profile settings updated successfully!');
  };

  const handleSaveServicesPage = async () => {
    const updatedConfig = {
      heroBadge: spHeroBadge,
      heroTitle: spHeroTitle,
      heroSubtitle: spHeroSubtitle,
      heroDesc: spHeroDesc,
      plans: spPlans,
      whyHireMe: spWhyHire,
      statusText: spStatusText,
      statusProgress: parseInt(spStatusProgress) || 0,
      performanceScore: spPerformanceScore,
      speedIndex: spSpeedIndex,
      seoScore: spSeoScore,
      securityScore: spSecurityScore,
      ctaTitle: spCtaTitle,
      ctaDesc: spCtaDesc,
      whatsappLink: spWhatsappLink,
      emailAddress: spEmailAddress
    };

    if (db) {
      await setDoc(doc(db, 'services_page', 'config'), updatedConfig);
    }
    updateServicesPage(updatedConfig);
    setSuccessMsg('Services page settings updated successfully!');
  };

  const handleBlogImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1.5 * 1024 * 1024) {
      alert("Image is too large. Please select an image smaller than 1.5MB for performance optimization.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target.result;
      setBImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleAddBlock = (type) => {
    setBContent([...bContent, { type, text: '', code: '', language: 'javascript' }]);
  };

  const handleRemoveBlock = (index) => {
    setBContent(bContent.filter((_, idx) => idx !== index));
  };

  const handleBlockChange = (index, field, value) => {
    const updated = bContent.map((block, idx) => {
      if (idx === index) {
        return { ...block, [field]: value };
      }
      return block;
    });
    setBContent(updated);
  };

  const handleMoveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === bContent.length - 1) return;
    
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...bContent];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setBContent(updated);
  };

  const handleSaveBlog = async () => {
    const tags = bTagsInput.split(',').map(t => t.trim()).filter(t => t !== '');
    let updatedRawList = [];

    const blogData = {
      title: bTitle,
      category: bCategory,
      date: bDate,
      readTime: bReadTime,
      desc: bDesc,
      image: bImage,
      glow: bGlow,
      accentColor: PLAN_COLOR_PRESETS.find(p => p.glowBase === bGlow || p.glowPopular === bGlow)?.color || '#06b6d4',
      tags,
      content: bContent
    };

    if (isCreateMode) {
      const baseSlug = bTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const uniqueId = baseSlug || `blog-${Date.now()}`;
      
      const newBlog = {
        id: uniqueId,
        ...blogData
      };

      updatedRawList = [...blogPosts, newBlog];

      if (db) {
        await setDoc(doc(db, 'blogs', uniqueId), newBlog);
      }
      setSuccessMsg('Blog post created successfully!');
    } else {
      const updatedBlog = {
        ...selectedItem,
        ...blogData
      };

      updatedRawList = blogPosts.map(b => b.id === selectedItem.id ? updatedBlog : b);

      if (db) {
        await setDoc(doc(db, 'blogs', selectedItem.id), blogData);
      }
      setSuccessMsg('Blog post updated successfully!');
    }

    const cleanBlogsForStorage = (list) => {
      return list.map(b => {
        const clean = { ...b };
        if (clean.imageFile) {
          clean.image = clean.imageFile;
        }
        delete clean.imageFile;
        return clean;
      });
    };

    const cleaned = cleanBlogsForStorage(updatedRawList);
    updateBlogPostsList(cleaned);
    setIsCreateMode(false);
    setSelectedItem(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      if (activeTab === 'services') {
        await handleSaveService();
      } else if (activeTab === 'projects') {
        await handleSaveProject();
      } else if (activeTab === 'blogs') {
        await handleSaveBlog();
      } else if (activeTab === 'certifications') {
        await handleSaveCertification();
      } else if (activeTab === 'tech-stack') {
        await handleSaveSkill();
      } else if (activeTab === 'education') {
        await handleSaveEducation();
      } else if (activeTab === 'experience') {
        await handleSaveExperience();
      } else if (activeTab === 'services-page') {
        await handleSaveServicesPage();
      } else {
        await handleSaveProfile();
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setErrorMsg("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    const displayTitle = activeTab === 'education' ? selectedItem.degree : activeTab === 'experience' ? selectedItem.role : selectedItem.title;
    if (!window.confirm(`Are you sure you want to delete "${displayTitle}"?`)) return;

    setIsDeleting(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      if (activeTab === 'services') {
        const updatedRawList = services.filter(s => s.id !== selectedItem.id);
        if (db) {
          const q = query(collection(db, 'services'), where('id', '==', selectedItem.id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
          }
        }
        const cleaned = cleanServicesForStorage(updatedRawList);
        updateServicesList(cleaned);
        setSuccessMsg('Service deleted successfully!');
      } else if (activeTab === 'projects') {
        const updatedRawList = projects.filter(p => p.id !== selectedItem.id);
        if (db) {
          const q = query(collection(db, 'projects'), where('id', '==', selectedItem.id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
          }
        }
        const cleaned = cleanProjectsForStorage(updatedRawList);
        updateProjectsList(cleaned);
        setSuccessMsg('Project deleted successfully!');
      } else if (activeTab === 'certifications') {
        const updatedRawList = certifications.filter(c => c.id !== selectedItem.id);
        if (db) {
          const q = query(collection(db, 'certifications'), where('id', '==', selectedItem.id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
          }
        }
        const cleaned = cleanCertificationsForStorage(updatedRawList);
        updateCertificationsList(cleaned);
        setSuccessMsg('Certification deleted successfully!');
      } else if (activeTab === 'education') {
        const updatedEducationList = (profile.education || []).filter((_, idx) => idx !== selectedItem.index);
        const updatedProfile = {
          ...profile,
          education: updatedEducationList
        };
        if (db) {
          await setDoc(doc(db, 'profile', 'dev_profile'), updatedProfile);
        }
        updateProfile(updatedProfile);
        setSuccessMsg('Education qualification deleted successfully!');
      } else if (activeTab === 'experience') {
        const updatedExperienceList = (profile.experiences || []).filter((_, idx) => idx !== selectedItem.index);
        const updatedProfile = {
          ...profile,
          experiences: updatedExperienceList
        };
        if (db) {
          await setDoc(doc(db, 'profile', 'dev_profile'), updatedProfile);
        }
        updateProfile(updatedProfile);
        setSuccessMsg('Experience item deleted successfully!');
      } else if (activeTab === 'blogs') {
        const updatedRawList = blogPosts.filter(b => b.id !== selectedItem.id);
        if (db) {
          await deleteDoc(doc(db, 'blogs', selectedItem.id));
        }
        const cleanBlogsForStorage = (list) => {
          return list.map(b => {
            const clean = { ...b };
            if (clean.imageFile) {
              clean.image = clean.imageFile;
            }
            delete clean.imageFile;
            return clean;
          });
        };
        const cleaned = cleanBlogsForStorage(updatedRawList);
        updateBlogPostsList(cleaned);
        setSuccessMsg('Blog post deleted successfully!');
      } else {
        const updatedRawList = skills.filter(s => s.id !== selectedItem.id);
        if (db) {
          const q = query(collection(db, 'skills'), where('id', '==', selectedItem.id));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            await deleteDoc(querySnapshot.docs[0].ref);
          }
        }
        const cleaned = cleanSkillsForStorage(updatedRawList);
        updateSkillsList(cleaned);
        setSuccessMsg('Tech stack category deleted successfully!');
      }
      setSelectedItem(null);
    } catch (err) {
      console.error("Error deleting item:", err);
      setErrorMsg("Failed to delete item. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const activeGlow = activeTab === 'services' ? sGlow : activeTab === 'projects' ? pGlow : activeTab === 'blogs' ? bGlow : activeTab === 'certifications' ? cGlow : activeTab === 'education' ? eduGlow : activeTab === 'experience' ? expGlow : activeTab === 'services-page' ? 'rgba(6, 182, 212, 0.15)' : skGlow;
  const activeColor = GLOW_PRESETS.find(p => p.value === activeGlow)?.color || 'var(--accent-cyan)';

  return (
    <div className="admin-container">
      {/* Header Title */}
      <div className="section-header reveal-on-scroll reveal-fade-up visible" style={{ marginBottom: '32px' }}>
        <div className="services-badge">
          <span className="sparkle-spark">✦</span> Operations Console
        </div>
        <h2 className="section-title">
          Portfolio <span className="text-gradient">Manager Dashboard</span>
        </h2>
        <p className="section-desc">
          Add, edit, or delete items in the services directory or the projects showcase database.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="tabs-container" style={{ marginBottom: '40px', maxWidth: '900px', margin: '0 auto 40px auto', display: 'flex', gap: '8px' }}>
        <button
          className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => { setActiveTab('services'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Services
        </button>
        <button
          className={`tab-btn ${activeTab === 'services-page' ? 'active' : ''}`}
          onClick={() => { setActiveTab('services-page'); setSelectedItem({ id: 'services-page' }); setIsCreateMode(false); }}
          style={{ flex: 1.2 }}
        >
          Services Page
        </button>
        <button
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => { setActiveTab('projects'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Projects
        </button>
        <button
          className={`tab-btn ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => { setActiveTab('certifications'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Certifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'tech-stack' ? 'active' : ''}`}
          onClick={() => { setActiveTab('tech-stack'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Tech Stack
        </button>
        <button
          className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => { setActiveTab('education'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Education
        </button>
        <button
          className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => { setActiveTab('experience'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Experience
        </button>
        <button
          className={`tab-btn ${activeTab === 'blogs' ? 'active' : ''}`}
          onClick={() => { setActiveTab('blogs'); handleCancel(); }}
          style={{ flex: 1 }}
        >
          Blogs
        </button>
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => { setActiveTab('profile'); setSelectedItem({ id: 'profile' }); setIsCreateMode(false); }}
          style={{ flex: 1 }}
        >
          Profile
        </button>
      </div>

      <div className="admin-layout-grid">
        {/* Left Column: Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeTab !== 'profile' && activeTab !== 'services-page' && (
            <button 
              onClick={handleStartCreate}
              className={`btn-primary ${isCreateMode ? 'active' : ''}`}
              style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '14px' }}
              disabled={isSaving || isDeleting}
            >
              + Add New {activeTab === 'services' ? 'Service' : activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'certifications' ? 'Certification' : activeTab === 'tech-stack' ? 'Tech Category' : activeTab === 'education' ? 'Education' : activeTab === 'experience' ? 'Experience' : 'Item'}
            </button>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '550px', overflowY: 'auto', paddingRight: '4px' }}>
            {activeTab === 'blogs' ? (
              blogsLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Blogs...</div>
              ) : blogPosts.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Blogs configured.</div>
              ) : (
                blogPosts.map(b => {
                  const accentColor = PLAN_COLOR_PRESETS.find(p => p.glowBase === b.glow || p.glowPopular === b.glow)?.color || '#06b6d4';
                  return (
                    <div 
                      key={b.id} 
                      onClick={() => handleSelectItem(b)}
                      className="glass-panel"
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.3s ease',
                        border: (selectedItem?.id === b.id && !isCreateMode) ? `1px solid ${accentColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: (selectedItem?.id === b.id && !isCreateMode) ? `0 0 15px ${b.glow}` : 'none',
                        background: (selectedItem?.id === b.id && !isCreateMode) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: `rgba(${b.glow.includes('6, 182, 212') ? '6, 182, 212' : b.glow.includes('168, 85, 247') ? '168, 85, 247' : b.glow.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: accentColor,
                        flexShrink: 0
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                        </svg>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{b.title}</h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{b.category} • {b.readTime}</p>
                      </div>
                    </div>
                  );
                })
              )
            ) : activeTab === 'services' ? (
              servicesLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Services...</div>
              ) : services.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Services configured.</div>
              ) : (
                services.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => handleSelectItem(s)}
                    className="glass-panel"
                    style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.3s ease',
                      border: (selectedItem?.id === s.id && !isCreateMode) ? `1px solid ${s.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: (selectedItem?.id === s.id && !isCreateMode) ? `0 0 15px ${s.glow}` : 'none',
                      background: (selectedItem?.id === s.id && !isCreateMode) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `rgba(${s.glow.includes('6, 182, 212') ? '6, 182, 212' : s.glow.includes('168, 85, 247') ? '168, 85, 247' : s.glow.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: s.color,
                      flexShrink: 0
                    }}>
                      {s.icon}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{s.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{s.desc}</p>
                    </div>
                  </div>
                ))
              )
            ) : activeTab === 'projects' ? (
              projectsLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Projects...</div>
              ) : projects.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Projects configured.</div>
              ) : (
                projects.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => handleSelectItem(p)}
                    className="glass-panel"
                    style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.3s ease',
                      border: (selectedItem?.id === p.id && !isCreateMode) ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: (selectedItem?.id === p.id && !isCreateMode) ? `0 0 15px ${p.glow}` : 'none',
                      background: (selectedItem?.id === p.id && !isCreateMode) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `rgba(${p.glow.includes('6, 182, 212') ? '6, 182, 212' : p.glow.includes('168, 85, 247') ? '168, 85, 247' : p.glow.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: p.color,
                      flexShrink: 0
                    }}>
                      {p.icon}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.category}</p>
                    </div>
                  </div>
                ))
              )
            ) : activeTab === 'certifications' ? (
              certificationsLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Certifications...</div>
              ) : certifications.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Certifications configured.</div>
              ) : (
                certifications.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => handleSelectItem(c)}
                    className="glass-panel"
                    style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.3s ease',
                      border: (selectedItem?.id === c.id && !isCreateMode) ? `1px solid ${c.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: (selectedItem?.id === c.id && !isCreateMode) ? `0 0 15px ${c.glow}` : 'none',
                      background: (selectedItem?.id === c.id && !isCreateMode) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `rgba(${c.glow.includes('6, 182, 212') ? '6, 182, 212' : c.glow.includes('168, 85, 247') ? '168, 85, 247' : c.glow.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: c.color,
                      flexShrink: 0
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{c.issuer}</p>
                    </div>
                  </div>
                ))
              )
            ) : activeTab === 'tech-stack' ? (
              skillsLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Tech Stack...</div>
              ) : skills.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Tech Stack categories configured.</div>
              ) : (
                skills.map(s => (
                  <div 
                    key={s.id} 
                    onClick={() => handleSelectItem(s)}
                    className="glass-panel"
                    style={{
                      padding: '16px 20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      transition: 'all 0.3s ease',
                      border: (selectedItem?.id === s.id && !isCreateMode) ? `1px solid ${s.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: (selectedItem?.id === s.id && !isCreateMode) ? `0 0 15px ${s.glow}` : 'none',
                      background: (selectedItem?.id === s.id && !isCreateMode) ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      background: `rgba(${s.glow.includes('6, 182, 212') ? '6, 182, 212' : s.glow.includes('168, 85, 247') ? '168, 85, 247' : s.glow.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: s.color,
                      flexShrink: 0
                    }}>
                      <CategoryIcon name={s.iconName} />
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{s.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {s.languages ? s.languages.map(l => l.name).join(', ') : 'No skills listed'}
                      </p>
                    </div>
                  </div>
                ))
              )
            ) : activeTab === 'education' ? (
              profileLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Education...</div>
              ) : (profile.education || []).length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Education qualifications configured.</div>
              ) : (
                (profile.education || []).map((edu, idx) => {
                  const itemColor = edu.color || 'var(--accent-cyan)';
                  const activePreset = GLOW_PRESETS.find(p => p.color === itemColor) || GLOW_PRESETS[0];
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectItem({ ...edu, index: idx })}
                      className="glass-panel"
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.3s ease',
                        border: (selectedItem?.index === idx && !isCreateMode && activeTab === 'education') ? `1px solid ${itemColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: (selectedItem?.index === idx && !isCreateMode && activeTab === 'education') ? `0 0 15px ${activePreset.value}` : 'none',
                        background: (selectedItem?.index === idx && !isCreateMode && activeTab === 'education') ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: `rgba(${activePreset.value.includes('6, 182, 212') ? '6, 182, 212' : activePreset.value.includes('168, 85, 247') ? '168, 85, 247' : activePreset.value.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: itemColor,
                        flexShrink: 0
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        </svg>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{edu.degree}</h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{edu.school}</p>
                      </div>
                    </div>
                  );
                })
              )
            ) : activeTab === 'experience' ? (
              profileLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Experience...</div>
              ) : (profile.experiences || []).length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>No Experience items configured.</div>
              ) : (
                (profile.experiences || []).map((exp, idx) => {
                  const itemColor = exp.color || 'var(--accent-purple)';
                  const activePreset = GLOW_PRESETS.find(p => p.color === itemColor) || GLOW_PRESETS[1];
                  return (
                    <div 
                      key={idx} 
                      onClick={() => handleSelectItem({ ...exp, index: idx })}
                      className="glass-panel"
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.3s ease',
                        border: (selectedItem?.index === idx && !isCreateMode && activeTab === 'experience') ? `1px solid ${itemColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: (selectedItem?.index === idx && !isCreateMode && activeTab === 'experience') ? `0 0 15px ${activePreset.value}` : 'none',
                        background: (selectedItem?.index === idx && !isCreateMode && activeTab === 'experience') ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: `rgba(${activePreset.value.includes('6, 182, 212') ? '6, 182, 212' : activePreset.value.includes('168, 85, 247') ? '168, 85, 247' : activePreset.value.includes('236, 72, 153') ? '236, 72, 153' : '99, 102, 241'}, 0.1)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: itemColor,
                        flexShrink: 0
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        </svg>
                      </div>
                      <div style={{ overflow: 'hidden' }}>
                        <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{exp.role}</h4>
                        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{exp.company}</p>
                      </div>
                    </div>
                  );
                })
              )
            ) : activeTab === 'services-page' ? (
              servicesPageLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Services Page...</div>
              ) : (
                <div 
                  onClick={() => setSelectedItem({ id: 'services-page' })}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    border: (selectedItem?.id === 'services-page') ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: (selectedItem?.id === 'services-page') ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
                    background: (selectedItem?.id === 'services-page') ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px' }}>Services Page</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>Hero, Plans, Live Status & CTA</p>
                  </div>
                </div>
              )
            ) : (
              profileLoading ? (
                <div style={{ color: 'var(--text-secondary)', padding: '20px', textAlign: 'center' }}>Loading Profile...</div>
              ) : (
                <div 
                  onClick={() => setSelectedItem({ id: 'profile' })}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'all 0.3s ease',
                    border: (selectedItem?.id === 'profile') ? '1px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: (selectedItem?.id === 'profile') ? '0 0 15px rgba(6, 182, 212, 0.15)' : 'none',
                    background: (selectedItem?.id === 'profile') ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.01)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ color: 'white', margin: '0 0 4px 0', fontSize: '14.5px' }}>{profName || 'My Profile'}</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '12px' }}>General Settings & Bio</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden', height: 'fit-content' }}>
          {(selectedItem || isCreateMode) && (
            <div 
              className="bio-glow-effect" 
              style={{ 
                background: `radial-gradient(circle at 100% 0%, ${activeGlow} 0%, rgba(0, 0, 0, 0) 70%)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1
              }}
            ></div>
          )}

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '24px' }}>
              {activeTab === 'profile' 
                ? 'Edit Developer Profile Settings'
                : activeTab === 'services-page'
                  ? 'Edit Services Page Settings'
                  : isCreateMode 
                    ? `Create New ${activeTab === 'services' ? 'Service' : activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'certifications' ? 'Certification' : activeTab === 'tech-stack' ? 'Tech Category' : activeTab === 'education' ? 'Education' : activeTab === 'experience' ? 'Experience' : 'Item'}` 
                    : selectedItem 
                      ? `Edit: ${activeTab === 'education' ? selectedItem.degree : activeTab === 'experience' ? selectedItem.role : selectedItem.title}` 
                      : `Select a ${activeTab === 'services' ? 'Service' : activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'certifications' ? 'Certification' : activeTab === 'tech-stack' ? 'Tech Category' : activeTab === 'education' ? 'Education' : activeTab === 'experience' ? 'Experience' : 'Item'} or Add New`}
            </h3>

            {(!selectedItem && !isCreateMode && activeTab !== 'profile') ? (
              <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
                {activeTab === 'services' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a service from the list or click "+ Add New Service" to start editing.</p>
                  </>
                ) : activeTab === 'projects' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a project from the list or click "+ Add New Project" to start editing.</p>
                  </>
                ) : activeTab === 'blogs' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5v-15z" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a blog post from the list or click "+ Add New Blog" to start editing.</p>
                  </>
                ) : activeTab === 'certifications' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a certification from the list or click "+ Add New Certification" to start editing.</p>
                  </>
                ) : activeTab === 'tech-stack' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a tech category from the list or click "+ Add New Tech Category" to start editing.</p>
                  </>
                ) : activeTab === 'education' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select an academic qualification from the list or click "+ Add New Education" to start editing.</p>
                  </>
                ) : activeTab === 'experience' ? (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a professional experience from the list or click "+ Add New Experience" to start editing.</p>
                  </>
                ) : (
                  <>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', opacity: 0.5 }}>
                      <polyline points="4 17 10 11 4 5" />
                      <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '15px' }}>Please select a tech category from the list or click "+ Add New Tech Category" to start editing.</p>
                  </>
                )}
              </div>
            ) : (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* EDUCATION FORM FIELDS */}
                {activeTab === 'education' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Degree */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Degree / Certificate</label>
                        <input 
                          type="text" 
                          value={eduDegree} 
                          onChange={(e) => setEduDegree(e.target.value)} 
                          className="admin-input"
                          placeholder="Bachelor of Science in Computer Science"
                          required
                        />
                      </div>

                      {/* School */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">School / University</label>
                        <input 
                          type="text" 
                          value={eduSchool} 
                          onChange={(e) => setEduSchool(e.target.value)} 
                          className="admin-input"
                          placeholder="Stanford University"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Duration */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Timeline Duration</label>
                        <input 
                          type="text" 
                          value={eduDuration} 
                          onChange={(e) => setEduDuration(e.target.value)} 
                          className="admin-input"
                          placeholder="2022 - 2026"
                          required
                        />
                      </div>

                      {/* Grade / GPA */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Grade / GPA (Optional)</label>
                        <input 
                          type="text" 
                          value={eduGrade} 
                          onChange={(e) => setEduGrade(e.target.value)} 
                          className="admin-input"
                          placeholder="9.8 CGPA or A+"
                        />
                      </div>
                    </div>

                    {/* Accent Color Presets */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="admin-label">Border Accent Glow Color</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', height: '44px' }}>
                        {GLOW_PRESETS.map(p => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setEduGlow(p.value)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: eduGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              border: eduGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: eduGlow === p.value ? 'white' : 'var(--text-secondary)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                              <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: p.color,
                                boxShadow: `0 0 8px ${p.color}`,
                                display: 'inline-block'
                              }}></span>
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Description / Coursework Details</label>
                      <textarea 
                        value={eduDescription} 
                        onChange={(e) => setEduDescription(e.target.value)} 
                        className="admin-input" 
                        rows="4"
                        placeholder="Describe your achievements, GPA, key courses..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </>
                )}

                {/* EXPERIENCE FORM FIELDS */}
                {activeTab === 'experience' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Role */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Role / Job Title</label>
                        <input 
                          type="text" 
                          value={expRole} 
                          onChange={(e) => setExpRole(e.target.value)} 
                          className="admin-input"
                          placeholder="Full Stack Engineer"
                          required
                        />
                      </div>

                      {/* Company */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Company / Organization</label>
                        <input 
                          type="text" 
                          value={expCompany} 
                          onChange={(e) => setExpCompany(e.target.value)} 
                          className="admin-input"
                          placeholder="Google"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Duration */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Timeline Duration</label>
                        <input 
                          type="text" 
                          value={expDuration} 
                          onChange={(e) => setExpDuration(e.target.value)} 
                          className="admin-input"
                          placeholder="2024 - Present"
                          required
                        />
                      </div>

                      {/* Experience Certificate */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Experience Certificate (PDF/Image)</label>
                        
                        {expCertificate ? (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            position: 'relative'
                          }}>
                            {/* Document Icon Preview */}
                            <div style={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              background: '#0a0516',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: 'var(--accent-purple)'
                            }}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                            </div>
                            
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                              <span style={{ fontSize: '13px', color: 'white', fontWeight: '500', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Certificate Loaded</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                {expCertificate.startsWith('data:') ? 'Custom Uploaded Document' : 'Credential Link URL'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                              <label className="btn-secondary" style={{ 
                                padding: '8px 14px', 
                                fontSize: '12px', 
                                margin: 0, 
                                cursor: 'pointer',
                                borderRadius: '8px',
                                background: 'transparent'
                              }}>
                                Change
                                <input 
                                  type="file" 
                                  accept="application/pdf,image/*" 
                                  onChange={handleExpCertificateUpload}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              
                              <button 
                                type="button"
                                onClick={() => setExpCertificate('')}
                                className="btn-secondary"
                                style={{
                                  padding: '8px 14px', 
                                  fontSize: '12px', 
                                  color: '#f87171', 
                                  borderColor: 'rgba(239, 68, 68, 0.15)',
                                  background: 'rgba(239, 68, 68, 0.02)',
                                  borderRadius: '8px'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '24px',
                            border: '2px dashed rgba(255, 255, 255, 0.12)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.01)',
                            transition: 'all 0.3s ease'
                          }} className="upload-dropzone">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ margin: '0 0 4px 0', fontSize: '13.5px', color: 'white', fontWeight: '500' }}>Click to upload certificate</p>
                              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>PDF or Image (Max 1.5MB)</p>
                            </div>
                            <input 
                              type="file" 
                              accept="application/pdf,image/*" 
                              onChange={handleExpCertificateUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Accent Color Presets */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label className="admin-label">Border Accent Glow Color</label>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', height: '44px' }}>
                          {GLOW_PRESETS.map(p => (
                            <button
                              key={p.name}
                              type="button"
                              onClick={() => setExpGlow(p.value)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                background: expGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                border: expGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '30px',
                                padding: '6px 14px',
                                color: expGlow === p.value ? 'white' : 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              <span style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                background: p.color,
                                boxShadow: `0 0 8px ${p.color}`,
                                display: 'inline-block'
                              }}></span>
                              {p.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Job Description / Responsibilities</label>
                      <textarea 
                        value={expDescription} 
                        onChange={(e) => setExpDescription(e.target.value)} 
                        className="admin-input" 
                        rows="4"
                        placeholder="Describe your role, projects built, achievements..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </>
                )}

                {/* SERVICES FORM FIELDS */}
                {activeTab === 'services' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Title */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Service Title</label>
                        <input 
                          type="text" 
                          value={sTitle} 
                          onChange={(e) => setSTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="Web Experiences"
                          required
                        />
                      </div>

                      {/* Icon Selector */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Service Icon Type</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${activeColor}`,
                            boxShadow: `0 0 10px ${activeGlow}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: activeColor,
                            flexShrink: 0
                          }}>
                            <ServiceIcon name={sIconName} color={activeColor} />
                          </div>
                          <select 
                            value={sIconName} 
                            onChange={(e) => setSIconName(e.target.value)}
                            className="admin-select"
                            style={{ padding: '13px 16px', flexGrow: 1 }}
                          >
                            <option value="web">Web Monitor / Browser</option>
                            <option value="solutions">Solutions Stack / Layers</option>
                            <option value="interactive">Interactive / Nodes</option>
                            <option value="scalable">Scalable Systems / Gear</option>
                            <option value="modern">Modern Lightning Bolt</option>
                            <option value="responsive">Responsive / Adaptive Globe</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Service Description</label>
                      <textarea 
                        value={sDesc} 
                        onChange={(e) => setSDesc(e.target.value)} 
                        className="admin-input" 
                        rows="3"
                        placeholder="Describe what services you provide..."
                        style={{ resize: 'vertical' }}
                        required
                      />
                    </div>

                    {/* Accent Color */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="admin-label">Theme Glow Accent Color</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {GLOW_PRESETS.map(p => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setSGlow(p.value)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: sGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              border: sGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: sGlow === p.value ? 'white' : 'var(--text-secondary)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: p.color,
                              boxShadow: `0 0 8px ${p.color}`,
                              display: 'inline-block'
                            }}></span>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Service Keywords / Tags (comma separated)</label>
                      <input 
                        type="text" 
                        value={sTagsInput} 
                        onChange={(e) => setSTagsInput(e.target.value)} 
                        placeholder="HTML5, CSS3, ES6, SEO" 
                        className="admin-input"
                      />
                      {sTagsInput && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                          {sTagsInput.split(',').map((t, idx) => {
                            const tagClean = t.trim();
                            if (!tagClean) return null;
                            return (
                              <span 
                                key={idx} 
                                style={{ 
                                  background: 'rgba(255, 255, 255, 0.03)', 
                                  border: `1px solid ${activeColor}`, 
                                  color: activeColor, 
                                  padding: '2px 8px', 
                                  borderRadius: '8px', 
                                  fontSize: '10px'
                                }}
                              >
                                {tagClean}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* PROJECTS FORM FIELDS */}
                {activeTab === 'projects' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Title */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Project Title</label>
                        <input 
                          type="text" 
                          value={pTitle} 
                          onChange={(e) => setPTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="3D Solar System"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Category</label>
                        <input 
                          type="text" 
                          value={pCategory} 
                          onChange={(e) => setPCategory(e.target.value)} 
                          className="admin-input"
                          placeholder="Creative Dev / WebGL"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Role */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Your Role</label>
                        <input 
                          type="text" 
                          value={pRole} 
                          onChange={(e) => setPRole(e.target.value)} 
                          className="admin-input"
                          placeholder="Lead Creative Developer"
                          required
                        />
                      </div>

                      {/* Timeline */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Timeline / Date</label>
                        <input 
                          type="text" 
                          value={pDate} 
                          onChange={(e) => setPDate(e.target.value)} 
                          className="admin-input"
                          placeholder="Jan 2025 - Mar 2025"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Icon Selector */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Project Icon Type</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '10px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: `1px solid ${activeColor}`,
                            boxShadow: `0 0 10px ${activeGlow}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: activeColor,
                            flexShrink: 0
                          }}>
                            <ProjectIcon name={pIconName} color={activeColor} />
                          </div>
                          <select 
                            value={pIconName} 
                            onChange={(e) => setPIconName(e.target.value)}
                            className="admin-select"
                            style={{ padding: '13px 16px', flexGrow: 1 }}
                          >
                            <option value="orbit">Orbit / Celestial</option>
                            <option value="chart">Chart / Analytics</option>
                            <option value="play">Play / Portal</option>
                            <option value="map">Map / Target</option>
                            <option value="black-hole">Concentric / Black Hole</option>
                            <option value="atom">Atom / Quantum</option>
                          </select>
                        </div>
                      </div>

                      {/* Image Asset Selector */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Project Mockup Image</label>
                        
                        {pImage ? (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            position: 'relative'
                          }}>
                            {/* Live Image Preview Thumb */}
                            <div style={{
                              width: '80px',
                              height: '45px',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              background: '#0a0516',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <img 
                                src={assetMap[pImage] || pImage} 
                                alt="Mockup preview" 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </div>
                            
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                              <span style={{ fontSize: '13px', color: 'white', fontWeight: '500', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Mockup Image Loaded</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                {pImage.startsWith('data:') ? 'Custom Uploaded File' : 'Default Preset Asset'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                              <label className="btn-secondary" style={{ 
                                padding: '8px 14px', 
                                fontSize: '12px', 
                                margin: 0, 
                                cursor: 'pointer',
                                borderRadius: '8px',
                                background: 'transparent'
                              }}>
                                Change
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleImageUpload}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              
                              <button 
                                type="button"
                                onClick={() => setPImage('')}
                                className="btn-secondary"
                                style={{
                                  padding: '8px 14px', 
                                  fontSize: '12px', 
                                  color: '#f87171', 
                                  borderColor: 'rgba(239, 68, 68, 0.15)',
                                  background: 'rgba(239, 68, 68, 0.02)',
                                  borderRadius: '8px'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '24px',
                            border: '2px dashed rgba(255, 255, 255, 0.12)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.01)',
                            transition: 'all 0.3s ease'
                          }} className="upload-dropzone">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ margin: '0 0 4px 0', fontSize: '13.5px', color: 'white', fontWeight: '500' }}>Click to upload mockup image</p>
                              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>PNG, JPG or WEBP (Max 1.5MB)</p>
                            </div>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Short Description (for cards)</label>
                      <input 
                        type="text" 
                        value={pDesc} 
                        onChange={(e) => setPDesc(e.target.value)} 
                        className="admin-input"
                        placeholder="An interactive, physically accurate Three.js simulation of planetary orbits..."
                        required
                      />
                    </div>

                    {/* Full Overview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Detailed Project Overview</label>
                      <textarea 
                        value={pFullDesc} 
                        onChange={(e) => setPFullDesc(e.target.value)} 
                        className="admin-input" 
                        rows="3"
                        placeholder="Provide a comprehensive project description..."
                        style={{ resize: 'vertical' }}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Live Link */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Live Site Link</label>
                        <input 
                          type="text" 
                          value={pLiveUrl} 
                          onChange={(e) => setPLiveUrl(e.target.value)} 
                          className="admin-input"
                          placeholder="#"
                        />
                      </div>

                      {/* Source Link */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Source Code Link</label>
                        <input 
                          type="text" 
                          value={pGithubUrl} 
                          onChange={(e) => setPGithubUrl(e.target.value)} 
                          className="admin-input"
                          placeholder="#"
                        />
                      </div>
                    </div>

                    {/* YouTube Video URL */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">YouTube Video Demo Link</label>
                      <input 
                        type="text" 
                        value={pYoutubeUrl} 
                        onChange={(e) => setPYoutubeUrl(e.target.value)} 
                        className="admin-input"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>

                    {/* Accent Color Preset */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="admin-label">Theme Glow Accent Color</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {GLOW_PRESETS.map(p => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setPGlow(p.value)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: pGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              border: pGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: pGlow === p.value ? 'white' : 'var(--text-secondary)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: p.color,
                              boxShadow: `0 0 8px ${p.color}`,
                              display: 'inline-block'
                            }}></span>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tags input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Technical Stack Tags (comma separated)</label>
                      <input 
                        type="text" 
                        value={pTagsInput} 
                        onChange={(e) => setPTagsInput(e.target.value)} 
                        placeholder="Three.js, WebGL, React, GLSL" 
                        className="admin-input"
                      />
                      {pTagsInput && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                          {pTagsInput.split(',').map((t, idx) => {
                            const tagClean = t.trim();
                            if (!tagClean) return null;
                            return (
                              <span 
                                key={idx} 
                                style={{ 
                                  background: 'rgba(255, 255, 255, 0.03)', 
                                  border: `1px solid ${activeColor}`, 
                                  color: activeColor, 
                                  padding: '2px 8px', 
                                  borderRadius: '8px', 
                                  fontSize: '10px'
                                }}
                              >
                                {tagClean}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Features input */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Key Features (one per line)</label>
                      <textarea 
                        value={pFeaturesInput} 
                        onChange={(e) => setPFeaturesInput(e.target.value)} 
                        className="admin-input"
                        rows="3"
                        placeholder="Real-time orbital mechanics simulation using Runge-Kutta...&#10;Custom planet shaders with dynamic clouds..."
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                  </>
                )}

                {/* CERTIFICATIONS FORM FIELDS */}
                {activeTab === 'certifications' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Title */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Certification Title</label>
                        <input 
                          type="text" 
                          value={cTitle} 
                          onChange={(e) => setCTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="AWS Certified Solutions Architect"
                          required
                        />
                      </div>

                      {/* Issuer */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Issuer</label>
                        <input 
                          type="text" 
                          value={cIssuer} 
                          onChange={(e) => setCIssuer(e.target.value)} 
                          className="admin-input"
                          placeholder="Amazon Web Services (AWS)"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Date */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Issue Date</label>
                        <input 
                          type="text" 
                          value={cDate} 
                          onChange={(e) => setCDate(e.target.value)} 
                          className="admin-input"
                          placeholder="Jan 2025"
                          required
                        />
                      </div>

                      {/* Certification PDF Document */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Certification PDF Document</label>
                        
                        {cLink ? (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '16px',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            position: 'relative'
                          }}>
                            {/* Document Icon Preview */}
                            <div style={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '6px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              background: '#0a0516',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              color: 'var(--accent-cyan)'
                            }}>
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                            </div>
                            
                            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                              <span style={{ fontSize: '13px', color: 'white', fontWeight: '500', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Certification PDF Loaded</span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                                {cLink.startsWith('data:') ? 'Custom Uploaded PDF' : 'Credential Link URL'}
                              </span>
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                              <label className="btn-secondary" style={{ 
                                padding: '8px 14px', 
                                fontSize: '12px', 
                                margin: 0, 
                                cursor: 'pointer',
                                borderRadius: '8px',
                                background: 'transparent'
                              }}>
                                Change
                                <input 
                                  type="file" 
                                  accept="application/pdf" 
                                  onChange={handlePdfUpload}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              
                              <button 
                                type="button"
                                onClick={() => setCLink('')}
                                className="btn-secondary"
                                style={{
                                  padding: '8px 14px', 
                                  fontSize: '12px', 
                                  color: '#f87171', 
                                  borderColor: 'rgba(239, 68, 68, 0.15)',
                                  background: 'rgba(239, 68, 68, 0.02)',
                                  borderRadius: '8px'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label style={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            padding: '24px',
                            border: '2px dashed rgba(255, 255, 255, 0.12)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            background: 'rgba(255, 255, 255, 0.01)',
                            transition: 'all 0.3s ease'
                          }} className="upload-dropzone">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <div style={{ textAlign: 'center' }}>
                              <p style={{ margin: '0 0 4px 0', fontSize: '13.5px', color: 'white', fontWeight: '500' }}>Click to upload certification PDF</p>
                              <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-secondary)' }}>PDF Document (Max 1.5MB)</p>
                            </div>
                            <input 
                              type="file" 
                              accept="application/pdf" 
                              onChange={handlePdfUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Accent Color Preset */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="admin-label">Theme Glow Accent Color</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {GLOW_PRESETS.map(p => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setCGlow(p.value)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: cGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              border: cGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: cGlow === p.value ? 'white' : 'var(--text-secondary)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: p.color,
                              boxShadow: `0 0 8px ${p.color}`,
                              display: 'inline-block'
                            }}></span>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TECH STACK FORM FIELDS */}
                {activeTab === 'tech-stack' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Title */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Category Name</label>
                        <input 
                          type="text" 
                          value={skTitle} 
                          onChange={(e) => setSkTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="Frontend"
                          required
                        />
                      </div>

                      {/* Icon / Type Selector */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Icon / Category Type</label>
                        <select 
                          value={skIconName} 
                          onChange={(e) => {
                            setSkIconName(e.target.value);
                            setSkType(e.target.value);
                          }}
                          className="admin-select"
                          style={{ padding: '13px 16px', width: '100%' }}
                        >
                          <option value="frontend">Frontend (Code Brackets)</option>
                          <option value="backend">Backend (Database)</option>
                          <option value="tools">Tools / Devops (Terminal CLI)</option>
                        </select>
                      </div>
                    </div>

                    {/* Accent Color Preset */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label className="admin-label">Theme Glow Accent Color</label>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {GLOW_PRESETS.map(p => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setSkGlow(p.value)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              background: skGlow === p.value ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                              border: skGlow === p.value ? `1px solid ${p.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '30px',
                              padding: '6px 14px',
                              color: skGlow === p.value ? 'white' : 'var(--text-secondary)',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <span style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              background: p.color,
                              boxShadow: `0 0 8px ${p.color}`,
                              display: 'inline-block'
                            }}></span>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Skills Sub-Editor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>Skills List</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setSkLanguages([...skLanguages, { name: '', level: '', percentage: 80, logoName: 'react' }]);
                          }}
                          className="btn-secondary"
                          style={{ padding: '8px 16px', fontSize: '12.5px', margin: 0, borderRadius: '8px' }}
                        >
                          + Add Skill
                        </button>
                      </div>

                      {skLanguages.length === 0 ? (
                        <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '13px' }}>
                          No skills added to this category yet. Click "+ Add Skill" to start.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto', paddingRight: '4px' }}>
                          {skLanguages.map((lang, idx) => (
                            <div 
                              key={idx} 
                              style={{ 
                                padding: '16px', 
                                background: 'rgba(255, 255, 255, 0.02)', 
                                border: '1px solid rgba(255, 255, 255, 0.06)', 
                                borderRadius: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px'
                              }}
                            >
                              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 1fr', gap: '12px', alignItems: 'center' }}>
                                {/* Skill Name */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Skill Name</label>
                                  <input 
                                    type="text" 
                                    value={lang.name} 
                                    onChange={(e) => {
                                      const updated = [...skLanguages];
                                      updated[idx].name = e.target.value;
                                      setSkLanguages(updated);
                                    }} 
                                    className="admin-input"
                                    placeholder="React"
                                    style={{ padding: '8px 12px', fontSize: '13px' }}
                                    required
                                  />
                                </div>

                                {/* Logo / Icon Type */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Logo Icon</label>
                                  <LogoSearchSelector 
                                    value={lang.logoName} 
                                    onChange={(val) => {
                                      const updated = [...skLanguages];
                                      updated[idx].logoName = val;
                                      setSkLanguages(updated);
                                    }}
                                  />
                                </div>

                                {/* Level */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Proficiency Level</label>
                                  <input 
                                    type="text" 
                                    value={lang.level} 
                                    onChange={(e) => {
                                      const updated = [...skLanguages];
                                      updated[idx].level = e.target.value;
                                      setSkLanguages(updated);
                                    }} 
                                    className="admin-input"
                                    placeholder="Framework / Language"
                                    style={{ padding: '8px 12px', fontSize: '13px' }}
                                  />
                                </div>

                                {/* Remove Skill */}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px' }}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSkLanguages(skLanguages.filter((_, i) => i !== idx));
                                    }}
                                    style={{
                                      background: 'rgba(239, 68, 68, 0.05)',
                                      border: '1px solid rgba(239, 68, 68, 0.15)',
                                      color: '#f87171',
                                      padding: '8px 12px',
                                      borderRadius: '8px',
                                      fontSize: '12px',
                                      cursor: 'pointer',
                                      transition: 'all 0.2s'
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>

                              {/* Percentage Slider */}
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', minWidth: '85px' }}>Proficiency:</span>
                                <input 
                                  type="range" 
                                  min="0" 
                                  max="100" 
                                  value={lang.percentage} 
                                  onChange={(e) => {
                                    const updated = [...skLanguages];
                                    updated[idx].percentage = parseInt(e.target.value);
                                    setSkLanguages(updated);
                                  }}
                                  style={{ flexGrow: 1, accentColor: activeColor, height: '4px' }}
                                />
                                <span style={{ fontSize: '13px', color: 'white', fontWeight: '600', fontFamily: 'monospace', minWidth: '40px', textAlign: 'right' }}>
                                  {lang.percentage}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === 'profile' && (
                  <>
                    {/* Avatar Upload Section */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '24px', marginBottom: '8px' }}>
                      <div style={{ position: 'relative' }}>
                        <div style={{
                          width: '90px',
                          height: '90px',
                          borderRadius: '50%',
                          border: '2px solid var(--accent-cyan)',
                          boxShadow: '0 0 15px rgba(6, 182, 212, 0.25)',
                          background: '#0a0516',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {profAvatar ? (
                            <img 
                              src={profAvatar} 
                              alt="Avatar Preview" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label" style={{ marginBottom: 0 }}>Profile Avatar Image</label>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                          Upload a professional avatar (PNG, JPG or WEBP, max 1.5MB).
                        </span>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <label className="btn-secondary" style={{ 
                            margin: 0, 
                            padding: '8px 16px', 
                            fontSize: '13px', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            cursor: 'pointer',
                            borderRadius: '10px',
                            background: 'rgba(255,255,255,0.02)',
                            borderColor: 'rgba(255,255,255,0.15)'
                          }}>
                            {profAvatar ? 'Change Photo' : 'Upload Photo'}
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={handleAvatarUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                          
                          {profAvatar && (
                            <button 
                              type="button"
                              onClick={() => setProfAvatar('')}
                              className="btn-secondary"
                              style={{
                                padding: '8px 16px', 
                                fontSize: '13px', 
                                color: '#f87171', 
                                borderColor: 'rgba(239, 68, 68, 0.2)',
                                background: 'rgba(239, 68, 68, 0.02)',
                                borderRadius: '10px'
                              }}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Basic Settings */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Full Name</label>
                        <input 
                          type="text" 
                          value={profName} 
                          onChange={(e) => setProfName(e.target.value)} 
                          className="admin-input"
                          placeholder="Chaitanya Kamble"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Email Address</label>
                        <input 
                          type="email" 
                          value={profEmail} 
                          onChange={(e) => setProfEmail(e.target.value)} 
                          className="admin-input"
                          placeholder="yourname@gmail.com"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Upload Resume (PDF)</label>
                        {profResumeUrl && profResumeUrl.startsWith('data:') ? (
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '10px 14px',
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            height: '44px'
                          }}>
                            <span style={{ fontSize: '13px', color: '#34d399', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              PDF Resume Uploaded ({Math.round(profResumeUrl.length * 0.75 / 1024)} KB)
                            </span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <label className="btn-secondary" style={{ 
                                margin: 0, 
                                padding: '6px 12px', 
                                fontSize: '12px', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                cursor: 'pointer',
                                borderRadius: '8px',
                                background: 'transparent'
                              }}>
                                Change
                                <input 
                                  type="file" 
                                  accept="application/pdf" 
                                  onChange={handleResumeUpload}
                                  style={{ display: 'none' }}
                                />
                              </label>
                              
                              <button 
                                type="button"
                                onClick={() => setProfResumeUrl('')}
                                className="btn-secondary"
                                style={{
                                  padding: '6px 12px', 
                                  fontSize: '12px', 
                                  color: '#f87171', 
                                  borderColor: 'rgba(239, 68, 68, 0.15)',
                                  background: 'rgba(239, 68, 68, 0.02)',
                                  borderRadius: '8px'
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label className="btn-secondary" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            width: '100%',
                            height: '44px',
                            margin: 0
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="17 8 12 3 7 8" />
                              <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            {profResumeUrl ? `Link: ${profResumeUrl.slice(0, 25)}... (Upload PDF)` : 'Upload Resume PDF'}
                            <input 
                              type="file" 
                              accept="application/pdf" 
                              onChange={handleResumeUpload}
                              style={{ display: 'none' }}
                            />
                          </label>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Typing Animation Phrases (comma separated)</label>
                        <input 
                          type="text" 
                          value={profPhrasesInput} 
                          onChange={(e) => setProfPhrasesInput(e.target.value)} 
                          className="admin-input"
                          placeholder="Full Stack Developer, UI/UX Designer"
                        />
                      </div>
                    </div>

                    {/* Short Bio */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Short Tagline Bio</label>
                      <textarea 
                        value={profShortBio} 
                        onChange={(e) => setProfShortBio(e.target.value)} 
                        className="admin-input"
                        rows="2"
                        placeholder="Brief summary sentence..."
                        style={{ resize: 'vertical', minHeight: '60px' }}
                      />
                    </div>

                    {/* Homepage Bio */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Homepage Biography (Intro Card)</label>
                      <textarea 
                        value={profHomeBio} 
                        onChange={(e) => setProfHomeBio(e.target.value)} 
                        className="admin-input"
                        rows="3"
                        placeholder="Detailed introduction paragraph displayed in the home page biography card..."
                        style={{ resize: 'vertical', minHeight: '90px' }}
                      />
                    </div>

                    {/* Long Bio Paragraphs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Detailed Biography (One paragraph per line)</label>
                      <textarea 
                        value={profLongBioInput} 
                        onChange={(e) => setProfLongBioInput(e.target.value)} 
                        className="admin-input"
                        rows="4"
                        placeholder="Paragraph 1...&#10;Paragraph 2..."
                        style={{ resize: 'vertical', minHeight: '120px' }}
                      />
                    </div>

                    {/* Social links */}
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>Social Profiles</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>GitHub Link</label>
                          <input 
                            type="text" 
                            value={profGithubUrl} 
                            onChange={(e) => setProfGithubUrl(e.target.value)} 
                            className="admin-input"
                            placeholder="https://github.com/..."
                            style={{ padding: '8px 12px', fontSize: '13px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>LinkedIn Link</label>
                          <input 
                            type="text" 
                            value={profLinkedinUrl} 
                            onChange={(e) => setProfLinkedinUrl(e.target.value)} 
                            className="admin-input"
                            placeholder="https://linkedin.com/in/..."
                            style={{ padding: '8px 12px', fontSize: '13px' }}
                          />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Instagram Link</label>
                          <input 
                            type="text" 
                            value={profInstagramUrl} 
                            onChange={(e) => setProfInstagramUrl(e.target.value)} 
                            className="admin-input"
                            placeholder="https://instagram.com/..."
                            style={{ padding: '8px 12px', fontSize: '13px' }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Skill Badges */}
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Technologies & Tools Badges (comma separated)</label>
                      <input 
                        type="text" 
                        value={profBadgesInput} 
                        onChange={(e) => setProfBadgesInput(e.target.value)} 
                        className="admin-input"
                        placeholder="React, JavaScript, Node.js, Git, Firebase"
                      />
                    </div>

                    {/* Stats editing */}
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>Stats Cards Counters</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                        {profStats.map((stat, idx) => (
                          <div key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--accent-cyan)', fontWeight: '600' }}>Card #{idx + 1}</span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Counter Value</label>
                              <input 
                                type="text" 
                                value={stat.value || ''} 
                                onChange={(e) => {
                                  const updated = [...profStats];
                                  updated[idx].value = e.target.value;
                                  setProfStats(updated);
                                }} 
                                className="admin-input"
                                placeholder="3+"
                                style={{ padding: '6px 10px', fontSize: '12.5px' }}
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Stat Label</label>
                              <input 
                                type="text" 
                                value={stat.label || ''} 
                                onChange={(e) => {
                                  const updated = [...profStats];
                                  updated[idx].label = e.target.value;
                                  setProfStats(updated);
                                }} 
                                className="admin-input"
                                placeholder="Years Coding"
                                style={{ padding: '6px 10px', fontSize: '12.5px' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills list editor */}
                    <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0 }}>Technical Skillset Chart</h4>
                        <button
                          type="button"
                          onClick={() => {
                            setProfSkills([...profSkills, { name: '', level: 80, color: 'var(--accent-cyan)' }]);
                          }}
                          className="btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '12px', margin: 0, borderRadius: '8px' }}
                        >
                          + Add Skill Bar
                        </button>
                      </div>

                      {profSkills.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '10px', fontSize: '12.5px' }}>
                          No skill bars added yet. Click "+ Add Skill Bar" to start.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '2px' }}>
                          {profSkills.map((sk, idx) => (
                            <div key={idx} style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr 1fr', gap: '12px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Skill Area Name</label>
                                  <input 
                                    type="text" 
                                    value={sk.name} 
                                    onChange={(e) => {
                                      const updated = [...profSkills];
                                      updated[idx].name = e.target.value;
                                      setProfSkills(updated);
                                    }} 
                                    className="admin-input"
                                    placeholder="Frontend Development"
                                    style={{ padding: '6px 10px', fontSize: '12.5px' }}
                                    required
                                  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <label style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Bar Color</label>
                                  <select 
                                    value={sk.color} 
                                    onChange={(e) => {
                                      const updated = [...profSkills];
                                      updated[idx].color = e.target.value;
                                      setProfSkills(updated);
                                    }}
                                    className="admin-select"
                                    style={{ padding: '6px 10px', fontSize: '12.5px', height: '34px', borderRadius: '8px' }}
                                  >
                                    <option value="var(--accent-cyan)">Cyan</option>
                                    <option value="var(--accent-purple)">Purple</option>
                                    <option value="var(--accent-pink)">Pink</option>
                                    <option value="var(--accent-indigo)">Indigo</option>
                                  </select>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '14px' }}>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setProfSkills(profSkills.filter((_, i) => i !== idx));
                                    }}
                                    style={{
                                      background: 'rgba(239, 68, 68, 0.05)',
                                      border: '1px solid rgba(239, 68, 68, 0.15)',
                                      color: '#f87171',
                                      padding: '6px 10px',
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', minWidth: '70px' }}>Proficiency:</span>
                                <input 
                                  type="range" 
                                  min="0" 
                                  max="100" 
                                  value={sk.level} 
                                  onChange={(e) => {
                                    const updated = [...profSkills];
                                    updated[idx].level = parseInt(e.target.value);
                                    setProfSkills(updated);
                                  }}
                                  style={{ flexGrow: 1, accentColor: sk.color || 'var(--accent-cyan)', height: '4px' }}
                                />
                                <span style={{ fontSize: '12px', color: 'white', fontWeight: '600', minWidth: '35px', textAlign: 'right' }}>{sk.level}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {activeTab === 'services-page' && (
                  <>
                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '15px', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '16px' }}>Hero Section</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Hero Badge Pill</label>
                        <input 
                          type="text" 
                          value={spHeroBadge} 
                          onChange={(e) => setSpHeroBadge(e.target.value)} 
                          className="admin-input"
                          placeholder="Services & Pricing"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Headline Title</label>
                        <input 
                          type="text" 
                          value={spHeroTitle} 
                          onChange={(e) => setSpHeroTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="Transparent Pricing."
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Gradient Subtitle</label>
                        <input 
                          type="text" 
                          value={spHeroSubtitle} 
                          onChange={(e) => setSpHeroSubtitle(e.target.value)} 
                          className="admin-input"
                          placeholder="Quality Solutions."
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Hero Description</label>
                        <textarea 
                          value={spHeroDesc} 
                          onChange={(e) => setSpHeroDesc(e.target.value)} 
                          className="admin-input"
                          rows="2"
                          placeholder="Choose the perfect package..."
                          required
                        />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '15px', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '16px', marginTop: '24px' }}>Pricing Plan Tiers</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {spPlans.map((plan, pIdx) => (
                        <div key={pIdx} style={{ padding: '20px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h5 style={{ color: plan.accentColor || 'white', fontSize: '14.5px', fontWeight: '600', margin: 0 }}>
                              {plan.name} Plan
                            </h5>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'white', cursor: 'pointer' }}>
                              <input 
                                type="checkbox"
                                checked={!!plan.popular}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;
                                  const updated = spPlans.map((p, i) => {
                                    const isTargetPopular = i === pIdx ? isChecked : (isChecked ? false : p.popular);
                                    // Auto recalculate glow based on checked state
                                    const calcGlow = hexToRgba(p.accentColor, isTargetPopular ? 0.25 : 0.18);
                                    return { 
                                      ...p, 
                                      popular: isTargetPopular,
                                      glow: calcGlow || p.glow
                                    };
                                  });
                                  setSpPlans(updated);
                                }}
                                style={{ accentColor: 'var(--accent-purple)' }}
                              />
                              Featured Tier ("MOST POPULAR")
                            </label>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Price Value</label>
                              <input 
                                type="text"
                                className="admin-input"
                                value={plan.price}
                                onChange={(e) => {
                                  const updated = [...spPlans];
                                  updated[pIdx].price = e.target.value;
                                  setSpPlans(updated);
                                }}
                                placeholder="₹9,999"
                                required
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Button Action Text</label>
                              <input 
                                type="text"
                                className="admin-input"
                                value={plan.actionText}
                                onChange={(e) => {
                                  const updated = [...spPlans];
                                  updated[pIdx].actionText = e.target.value;
                                  setSpPlans(updated);
                                }}
                                placeholder="Get Started"
                                required
                              />
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Description</label>
                            <input 
                              type="text"
                              className="admin-input"
                              value={plan.desc}
                              onChange={(e) => {
                                  const updated = [...spPlans];
                                  updated[pIdx].desc = e.target.value;
                                  setSpPlans(updated);
                              }}
                              placeholder="Ideal for..."
                              required
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label className="admin-label">Theme Accent Color & Glow Preset</label>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                              {PLAN_COLOR_PRESETS.map(preset => {
                                const isActive = plan.accentColor === preset.color;
                                return (
                                  <button
                                    key={preset.name}
                                    type="button"
                                    onClick={() => {
                                      const updated = [...spPlans];
                                      updated[pIdx].accentColor = preset.color;
                                      updated[pIdx].glow = plan.popular ? preset.glowPopular : preset.glowBase;
                                      setSpPlans(updated);
                                    }}
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                                      border: isActive ? `1px solid ${preset.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                                      borderRadius: '30px',
                                      padding: '6px 14px',
                                      color: isActive ? 'white' : 'var(--text-secondary)',
                                      cursor: 'pointer',
                                      fontSize: '12px',
                                      fontWeight: '600',
                                      transition: 'all 0.3s ease'
                                    }}
                                  >
                                    <span style={{
                                      width: '10px',
                                      height: '10px',
                                      borderRadius: '50%',
                                      background: preset.color,
                                      boxShadow: `0 0 8px ${preset.color}`,
                                      display: 'inline-block'
                                    }}></span>
                                    {preset.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Features (one per line)</label>
                            <textarea 
                              className="admin-input"
                              value={plan.features ? plan.features.join('\n') : ''}
                              onChange={(e) => {
                                const updated = [...spPlans];
                                updated[pIdx].features = e.target.value.split('\n').filter(f => f.trim() !== '');
                                setSpPlans(updated);
                              }}
                              rows="4"
                              placeholder="Feature 1&#10;Feature 2"
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '15px', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '16px', marginTop: '24px' }}>"Why Hire Me?" Points</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {spWhyHire.map((item, wIdx) => (
                        <div key={wIdx} style={{ padding: '16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <span style={{ fontSize: '11.5px', color: 'var(--accent-cyan)', fontWeight: '600' }}>Benefit Card #{wIdx + 1}</span>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Title</label>
                              <input 
                                type="text"
                                className="admin-input"
                                value={item.title}
                                onChange={(e) => {
                                  const updated = [...spWhyHire];
                                  updated[wIdx].title = e.target.value;
                                  setSpWhyHire(updated);
                                }}
                                placeholder="SEO Ready"
                                required
                              />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Description</label>
                              <input 
                                type="text"
                                className="admin-input"
                                value={item.desc}
                                onChange={(e) => {
                                  const updated = [...spWhyHire];
                                  updated[wIdx].desc = e.target.value;
                                  setSpWhyHire(updated);
                                }}
                                placeholder="Built with SEO best practices..."
                                required
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '15px', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '16px', marginTop: '24px' }}>Project Status Card</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Globe Status Indicator</label>
                        <input 
                          type="text" 
                          value={spStatusText} 
                          onChange={(e) => setSpStatusText(e.target.value)} 
                          className="admin-input"
                          placeholder="Live & Healthy"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Progress Bar Fill (%)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={spStatusProgress} 
                            onChange={(e) => setSpStatusProgress(parseInt(e.target.value) || 0)}
                            style={{ flexGrow: 1, accentColor: 'var(--accent-cyan)' }}
                          />
                          <span style={{ fontSize: '14px', color: 'white', fontWeight: '600', minWidth: '40px', textAlign: 'right' }}>{spStatusProgress}%</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Performance Score Text</label>
                        <input 
                          type="text" 
                          value={spPerformanceScore} 
                          onChange={(e) => setSpPerformanceScore(e.target.value)} 
                          className="admin-input"
                          placeholder="98/100"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Speed Index Text</label>
                        <input 
                          type="text" 
                          value={spSpeedIndex} 
                          onChange={(e) => setSpSpeedIndex(e.target.value)} 
                          className="admin-input"
                          placeholder="0.3s"
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">SEO Score Text</label>
                        <input 
                          type="text" 
                          value={spSeoScore} 
                          onChange={(e) => setSpSeoScore(e.target.value)} 
                          className="admin-input"
                          placeholder="100/100"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Security Grade Text</label>
                        <input 
                          type="text" 
                          value={spSecurityScore} 
                          onChange={(e) => setSpSecurityScore(e.target.value)} 
                          className="admin-input"
                          placeholder="SSL A+"
                          required
                        />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--accent-cyan)', fontSize: '15px', fontWeight: '600', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '8px', marginBottom: '16px', marginTop: '24px' }}>Free Consultation Banner (CTA)</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">CTA Headline Title</label>
                        <input 
                          type="text" 
                          value={spCtaTitle} 
                          onChange={(e) => setSpCtaTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="Need Help Choosing a Plan?"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">CTA Description</label>
                        <textarea 
                          value={spCtaDesc} 
                          onChange={(e) => setSpCtaDesc(e.target.value)} 
                          className="admin-input"
                          rows="2"
                          placeholder="Let's discuss your project requirements..."
                          required
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">WhatsApp Contact Link URL</label>
                        <input 
                          type="text" 
                          value={spWhatsappLink} 
                          onChange={(e) => setSpWhatsappLink(e.target.value)} 
                          className="admin-input"
                          placeholder="https://wa.me/919730593429"
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Direct Email Address</label>
                        <input 
                          type="email" 
                          value={spEmailAddress} 
                          onChange={(e) => setSpEmailAddress(e.target.value)} 
                          className="admin-input"
                          placeholder="chaitanyakamble2005@gmail.com"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'blogs' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Title */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Blog Title</label>
                        <input 
                          type="text" 
                          value={bTitle} 
                          onChange={(e) => setBTitle(e.target.value)} 
                          className="admin-input"
                          placeholder="WebGL simulations with Three.js"
                          required
                        />
                      </div>

                      {/* Category */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Category</label>
                        <input 
                          type="text" 
                          value={bCategory} 
                          onChange={(e) => setBCategory(e.target.value)} 
                          className="admin-input"
                          placeholder="e.g. Creative Dev"
                          required
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {/* Date */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Publish Date</label>
                        <input 
                          type="text" 
                          value={bDate} 
                          onChange={(e) => setBDate(e.target.value)} 
                          className="admin-input"
                          placeholder="June 01, 2026"
                          required
                        />
                      </div>

                      {/* Read Time */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Read Time</label>
                        <input 
                          type="text" 
                          value={bReadTime} 
                          onChange={(e) => setBReadTime(e.target.value)} 
                          className="admin-input"
                          placeholder="5 min read"
                          required
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Short Summary (for Card)</label>
                      <textarea 
                        value={bDesc} 
                        onChange={(e) => setBDesc(e.target.value)} 
                        className="admin-textarea"
                        placeholder="Provide a brief summary shown on the preview card."
                        rows="3"
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
                      {/* Tags */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Tags (comma separated)</label>
                        <input 
                          type="text" 
                          value={bTagsInput} 
                          onChange={(e) => setBTagsInput(e.target.value)} 
                          className="admin-input"
                          placeholder="WebGL, Three.js, Math"
                        />
                      </div>

                      {/* Color Preset */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label className="admin-label">Theme Preset</label>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {PLAN_COLOR_PRESETS.map((p, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setBGlow(p.glowBase)}
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                background: p.color,
                                border: bGlow === p.glowBase ? '2px solid white' : '2px solid transparent',
                                boxShadow: bGlow === p.glowBase ? `0 0 10px ${p.color}` : 'none',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              title={p.name}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label className="admin-label">Blog Image File (Card & Header)</label>
                      {bImage ? (
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '16px', 
                          padding: '16px', 
                          border: '1px dashed rgba(255, 255, 255, 0.15)', 
                          borderRadius: '12px',
                          background: 'rgba(255, 255, 255, 0.01)'
                        }}>
                          <div style={{
                            width: '90px',
                            height: '60px',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <img 
                              src={assetMap[bImage] || bImage} 
                              alt="Blog post cover" 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                            <span style={{ fontSize: '13px', color: 'white', fontWeight: '500', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Cover Image Loaded</span>
                            <span style={{ fontSize: '11px', color: '#9ca3af' }}>
                              {bImage.startsWith('data:') ? 'Custom Uploaded Cover' : 'Default Asset File'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <label className="btn-secondary" style={{ padding: '8px 14px', fontSize: '12px', cursor: 'pointer', borderRadius: '8px' }}>
                              Change
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleBlogImageUpload}
                                style={{ display: 'none' }}
                              />
                            </label>
                            <button 
                              type="button"
                              onClick={() => setBImage('')}
                              className="btn-secondary"
                              style={{ padding: '8px 14px', fontSize: '12px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.15)', background: 'rgba(239, 68, 68, 0.02)', borderRadius: '8px' }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <label style={{ 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '12px',
                          padding: '24px',
                          border: '2px dashed rgba(255, 255, 255, 0.12)',
                          borderRadius: '12px',
                          cursor: 'pointer',
                          background: 'rgba(255, 255, 255, 0.01)',
                          transition: 'all 0.3s ease'
                        }} className="upload-dropzone">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                          </svg>
                          <span style={{ fontSize: '13.5px', color: '#d1d5db', fontWeight: '500' }}>Click to upload cover image</span>
                          <span style={{ fontSize: '11px', color: '#6b7280' }}>Accepts PNG, JPG, WebP up to 1.5MB</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleBlogImageUpload} 
                            style={{ display: 'none' }}
                          />
                        </label>
                      )}
                    </div>

                    {/* Blog Content Block Editor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                      <label className="admin-label" style={{ fontSize: '15px', color: 'white', fontWeight: '700' }}>Article Content Blocks</label>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {bContent.map((block, index) => (
                          <div 
                            key={index} 
                            style={{ 
                              background: 'rgba(255, 255, 255, 0.01)', 
                              border: '1px solid rgba(255, 255, 255, 0.06)', 
                              borderRadius: '8px', 
                              padding: '16px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '10px'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.04)', paddingBottom: '8px' }}>
                              <span style={{ 
                                fontSize: '12px', 
                                fontWeight: '700', 
                                color: block.type === 'heading' ? 'var(--accent-pink)' : block.type === 'code' ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                              }}>
                                Block #{index + 1}: {block.type}
                              </span>
                              
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button 
                                  type="button" 
                                  onClick={() => handleMoveBlock(index, 'up')}
                                  style={{ background: 'none', border: 'none', color: index === 0 ? '#4b5563' : '#d1d5db', cursor: index === 0 ? 'default' : 'pointer', fontSize: '13px' }}
                                  disabled={index === 0}
                                  title="Move Up"
                                >
                                  ▲
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => handleMoveBlock(index, 'down')}
                                  style={{ background: 'none', border: 'none', color: index === bContent.length - 1 ? '#4b5563' : '#d1d5db', cursor: index === bContent.length - 1 ? 'default' : 'pointer', fontSize: '13px' }}
                                  disabled={index === bContent.length - 1}
                                  title="Move Down"
                                >
                                  ▼
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => handleRemoveBlock(index)}
                                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px', marginLeft: '8px', fontWeight: '600' }}
                                  title="Remove Block"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>

                            {/* Block values fields */}
                            {block.type === 'code' ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                  <label style={{ fontSize: '12px', color: '#9ca3af' }}>Language:</label>
                                  <input
                                    type="text"
                                    value={block.language || 'javascript'}
                                    onChange={(e) => handleBlockChange(index, 'language', e.target.value)}
                                    style={{
                                      background: 'rgba(0,0,0,0.3)',
                                      border: '1px solid rgba(255, 255, 255, 0.1)',
                                      borderRadius: '4px',
                                      padding: '4px 8px',
                                      color: 'white',
                                      fontSize: '12px',
                                      width: '120px'
                                    }}
                                  />
                                </div>
                                <textarea
                                  value={block.code || ''}
                                  onChange={(e) => handleBlockChange(index, 'code', e.target.value)}
                                  className="admin-textarea"
                                  placeholder="// Enter code here..."
                                  rows="6"
                                  style={{ fontFamily: 'monospace', fontSize: '13.5px', background: 'rgba(0,0,0,0.3)' }}
                                />
                              </div>
                            ) : (
                              <textarea
                                value={block.text || ''}
                                onChange={(e) => handleBlockChange(index, 'text', e.target.value)}
                                className="admin-textarea"
                                placeholder={block.type === 'heading' ? 'Enter subheading title...' : 'Enter paragraph text content...'}
                                rows={block.type === 'heading' ? '2' : '4'}
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add block trigger panel */}
                      <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                        <button 
                          type="button" 
                          onClick={() => handleAddBlock('paragraph')} 
                          className="btn-secondary" 
                          style={{ padding: '8px 16px', fontSize: '12px', flex: 1, justifyContent: 'center' }}
                        >
                          + Paragraph Block
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleAddBlock('heading')} 
                          className="btn-secondary" 
                          style={{ padding: '8px 16px', fontSize: '12px', flex: 1, justifyContent: 'center' }}
                        >
                          + Heading Block
                        </button>
                        <button 
                          type="button" 
                          onClick={() => handleAddBlock('code')} 
                          className="btn-secondary" 
                          style={{ padding: '8px 16px', fontSize: '12px', flex: 1, justifyContent: 'center' }}
                        >
                          + Code Block
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Status Messages */}
                {successMsg && (
                  <div className="status-message success-alert">
                    <span style={{ fontSize: '16px' }}>✓</span> {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="status-message error-alert">
                    <span style={{ fontSize: '16px' }}>⚠</span> {errorMsg}
                  </div>
                )}

                 {/* Actions Row */}
                 <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                   <div>
                     {!isCreateMode && selectedItem && activeTab !== 'profile' && activeTab !== 'services-page' && (
                       <button 
                         type="button" 
                         onClick={handleDelete} 
                         className="btn-secondary"
                         style={{ 
                           padding: '12px 24px', 
                           fontSize: '14.5px', 
                           color: '#f87171', 
                           borderColor: 'rgba(239, 68, 68, 0.2)',
                           background: 'rgba(239, 68, 68, 0.02)'
                         }}
                         disabled={isSaving || isDeleting}
                       >
                         {isDeleting ? 'Deleting...' : `Delete ${activeTab === 'services' ? 'Service' : activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'certifications' ? 'Certification' : 'Tech Category'}`}
                       </button>
                     )}
                   </div>
 
                   <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto' }}>
                     {activeTab !== 'profile' && activeTab !== 'services-page' && (
                       <button 
                         type="button" 
                         onClick={handleCancel} 
                         className="btn-secondary"
                         style={{ padding: '12px 24px', fontSize: '14.5px' }}
                         disabled={isSaving || isDeleting}
                       >
                         Cancel
                       </button>
                     )}
                     <button 
                       type="submit" 
                       className="btn-primary"
                       style={{ padding: '12px 32px', fontSize: '14.5px', minWidth: '150px', justifyContent: 'center' }}
                       disabled={isSaving || isDeleting}
                     >
                       {isSaving ? (
                         <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                           <span style={{
                             width: '16px',
                             height: '16px',
                             borderRadius: '50%',
                             border: '2px solid rgba(255, 255, 255, 0.2)',
                             borderTopColor: 'white',
                             animation: 'spin-slow 1s linear infinite'
                           }}></span>
                           Saving...
                         </span>
                       ) : activeTab === 'profile'
                         ? 'Save Profile'
                         : activeTab === 'services-page'
                           ? 'Save Page Settings'
                           : isCreateMode 
                             ? `Create ${activeTab === 'services' ? 'Service' : activeTab === 'projects' ? 'Project' : activeTab === 'blogs' ? 'Blog' : activeTab === 'certifications' ? 'Certification' : 'Tech Category'}` 
                             : 'Save Changes'}
                     </button>
                   </div>        
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
