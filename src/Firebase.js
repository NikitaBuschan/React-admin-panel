import React from "react";
import { collectionGroup, limit, startAt } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaoyH2iXkJGfGDC4kOQt7YQTULTBhKHO4",
  authDomain: "arctic-e5b30.firebaseapp.com",
  projectId: "arctic-e5b30",
  storageBucket: "arctic-e5b30.appspot.com",
  messagingSenderId: "503767848175",
  appId: "1:503767848175:web:da30e8fa16cdb1b9d5371a",
  measurementId: "G-J9M6N8VVCR",
};

initializeApp(firebaseConfig);

// export let categories = [];

export const db = getFirestore();
export const auth = getAuth();

export async function getAllCategories() {
  let categories = [];

  const colRef = collection(db, "cotegories");

  await getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        categories.push({ id: doc.id, name: doc.data().name });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  return categories;
}

export async function updateCategory(id, newCategory) {
  const docRef = doc(db, "cotegories", id);

  await updateDoc(docRef, newCategory);

  return true;
}

export async function getRandomProducts(count) {
  let products = [];
  const productsQuery = query(
    collection(db, "products"),
    orderBy("name"),
    startAt("Iphone6"),
    limit(count)
  );
  const result = await getDocs(productsQuery);

  result.forEach((snap) => {
    console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
    products.push({ id: snap.id, name: snap.data().name });
  });

  return products;
}

export async function getMoreProducts(startAt, limit) {}

// async function queryForDocuments() {
//   const customerOrdersQuery = query(
//     collection(firestore, 'orders'),
//     where('drink', '==', 'Latte'),
//     limit(10)
//   );
//   const querySnapshot = await getDocs(customerOrdersQuery);
//   querySnapshot.forEach((snap) => {
//     console.log(`Document ${snap.id} contains ${JSON.stringify(snap.data())}`);
//   });
// }

export async function updateProduct(id, newProduct) {
  const docRef = doc(db, "products", id);

  await updateDoc(docRef, newProduct);

  return true;
}
