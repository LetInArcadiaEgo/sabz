import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection reference
const listingsCollection = collection(db, 'listings');

// Get all listings
export const getListings = async () => {
  try {
    console.log('Fetching listings from Firestore...');
    const querySnapshot = await getDocs(listingsCollection);
    const listings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log('Fetched listings:', listings);
    return listings;
  } catch (error) {
    console.error('Error getting listings:', error);
    return [];
  }
};

// Get a single listing by ID
export const getListing = async (id) => {
  try {
    const docRef = doc(db, 'listings', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.log('No such listing!');
      return null;
    }
  } catch (error) {
    console.error('Error getting listing:', error);
    return null;
  }
};

// Add a new listing
export const addListing = async (listingData) => {
  try {
    console.log('Adding listing to Firestore:', listingData);
    const docRef = await addDoc(listingsCollection, listingData);
    console.log('Successfully added listing with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding listing:', error);
    return null;
  }
}; 