import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, query, onSnapshot, getDocs, where } from 'firebase/firestore';

const loadLocalMessages = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('portfolio_contact_messages');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
      } catch (e) {
        console.error('Failed to parse cached portfolio_contact_messages:', e);
      }
    }
  }
  return [];
};

export const submitContactMessage = async (msg) => {
  const messageWithTimestamp = {
    ...msg,
    id: msg.id || Date.now().toString(),
    timestamp: msg.timestamp || new Date().toISOString()
  };

  // 1. Save locally as fallback/cache
  if (typeof window !== 'undefined') {
    const local = loadLocalMessages();
    const updated = [messageWithTimestamp, ...local];
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  }

  // 2. Save to Firestore
  if (db) {
    try {
      await addDoc(collection(db, 'contacts'), messageWithTimestamp);
    } catch (e) {
      console.warn("Failed to write to Firestore collection 'contacts':", e);
    }
  }
};

export const useContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    if (db) {
      try {
        const q = query(collection(db, 'contacts'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const list = [];
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const data = doc.data();
              // Store docId on the item so we can delete it easily
              list.push({ ...data, docId: doc.id });
            });
            // Sort in memory by timestamp descending
            list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            if (isMounted) {
              setMessages(list);
              setLoading(false);
            }
          } else {
            // Firestore exists but is empty
            const local = loadLocalMessages();
            if (isMounted) {
              setMessages(local);
              setLoading(false);
            }
          }
        }, (error) => {
          console.warn("Firestore contacts listener failed. Falling back to local storage:", error);
          const local = loadLocalMessages();
          if (isMounted) {
            setMessages(local);
            setLoading(false);
          }
        });
      } catch (error) {
        console.warn("Firestore contacts setup error. Falling back:", error);
        const local = loadLocalMessages();
        if (isMounted) {
          setMessages(local);
          setLoading(false);
        }
      }
    } else {
      // Local fallback
      const local = loadLocalMessages();
      setMessages(local);
      setLoading(false);
    }

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { messages, loading };
};

export const deleteContactMessage = async (msg) => {
  const msgId = msg.id;
  const docId = msg.docId;

  // 1. Remove from local storage
  if (typeof window !== 'undefined') {
    const local = loadLocalMessages();
    const updated = local.filter(m => m.id !== msgId);
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  }

  // 2. Remove from Firestore
  if (db) {
    try {
      if (docId) {
        await deleteDoc(doc(db, 'contacts', docId));
      } else {
        // Fallback search by id if docId is not populated
        const q = query(collection(db, 'contacts'), where('id', '==', msgId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          await deleteDoc(querySnapshot.docs[0].ref);
        }
      }
    } catch (e) {
      console.warn("Failed to delete from Firestore:", e);
    }
  }
};
