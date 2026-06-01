import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import initialBlogPosts from './blogPosts.json';
import blogCreativeCoding from '../assets/blog_creative_coding.png';
import blogMicroFrontend from '../assets/blog_micro_frontend.png';
import blogCosmicCanvas from '../assets/blog_cosmic_canvas.png';
import blogStateManagement from '../assets/blog_state_management.png';

export const assetMap = {
  'blog_creative_coding.png': blogCreativeCoding,
  'blog_micro_frontend.png': blogMicroFrontend,
  'blog_cosmic_canvas.png': blogCosmicCanvas,
  'blog_state_management.png': blogStateManagement,
};

export const mapBlogItem = (item) => ({
  ...item,
  imageFile: item.image, // Preserve original filename
  image: assetMap[item.image] || item.image
});

const mapBlogList = (list) => list.map(mapBlogItem);

const loadLocalBlogs = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_blogs');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(storedBlog => {
            const initialBlog = initialBlogPosts.find(b => b.id === storedBlog.id);
            if (initialBlog) {
              const merged = { ...initialBlog, ...storedBlog };
              if (initialBlog.image === "" && typeof storedBlog.image === 'string' && !storedBlog.image.startsWith('data:')) {
                merged.image = "";
              }
              return merged;
            }
            return storedBlog;
          });
        }
      } catch (e) {
        console.error('Failed to parse cached portfolio_blogs:', e);
      }
    }
  }
  return initialBlogPosts;
};

// Default static synchronous reference
const blogPostsList = mapBlogList(loadLocalBlogs());

// Dynamic updater for static cache mutation
export const updateBlogPostsList = (newList) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('portfolio_blogs', JSON.stringify(newList));
  }
  
  blogPostsList.length = 0;
  newList.forEach(item => {
    blogPostsList.push(mapBlogItem(item));
  });
};

// React hook with live Firestore DB subscription
export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'blogs'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const list = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              const initialBlog = initialBlogPosts.find(b => b.id === data.id);
              list.push({ ...initialBlog, ...data });
            });
            
            // Optional: Sort by date or id if needed. 
            // We can sort them so newer posts or specific ordering is maintained.
            // Let's sort based on initialBlogPosts order or preserve as-is.
            if (isMounted) {
              setBlogPosts(mapBlogList(list));
              setLoading(false);
            }
          } else {
            // Firestore exists but is empty
            const local = loadLocalBlogs();
            if (isMounted) {
              setBlogPosts(mapBlogList(local));
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore blogs listener failed. Falling back to local storage:", error);
          const local = loadLocalBlogs();
          if (isMounted) {
            setBlogPosts(mapBlogList(local));
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore blogs listener setup error. Falling back:", error);
        const local = loadLocalBlogs();
        if (isMounted) {
          setBlogPosts(mapBlogList(local));
          setLoading(false);
        }
      }
    } else {
      // Local Fallback
      const local = loadLocalBlogs();
      setBlogPosts(mapBlogList(local));
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { blogPosts, loading };
};

export default blogPostsList;
