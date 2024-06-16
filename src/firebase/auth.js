import { auth } from './firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  getAuth,
  signInWithPopup,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");
try {
    await signInWithRedirect(auth, provider);
    const result = await getRedirectResult(auth);
    
    if (result) {
      const db = getFirestore();
      // User signed in successfully, add user to Firestore
      const user = result.user;
      console.log(user);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        providerId: user.providerId,

      });
    }
  }
  catch(error){

  }
  
  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};