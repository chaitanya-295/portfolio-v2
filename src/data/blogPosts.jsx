import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';

export const assetMap = {};

export const mapBlogItem = (item) => ({
  ...item,
  imageFile: item.image, // Preserve original filename
  image: assetMap[item.image] || item.image
});

const mapBlogList = (list) => list.map(mapBlogItem);

// Default static synchronous reference
const blogPostsList = [];

// Dynamic updater for static cache mutation
export const updateBlogPostsList = (newList) => {
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
          const list = [];
          snapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          
          if (isMounted) {
            setBlogPosts(mapBlogList(list));
            setLoading(false);
          }
        }, (error) => {
          console.error("Firestore blogs listener failed:", error);
          if (isMounted) {
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Firestore blogs listener setup error:", error);
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

  return { blogPosts, loading };
};

export default blogPostsList;
