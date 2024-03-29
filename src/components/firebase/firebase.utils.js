import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {

        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: "",
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID

}

export const createUserProfileDocument = async (userAuth, additionalData) => {
        if(!userAuth) return;
        
        const userRef = firestore.doc(`/users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const { displayName, email} = userAuth;
                const createdAt = new Date();

                try {
                        await userRef.set({
                          displayName,
                          email, 
                          createdAt, 
                          ...additionalData
                        });
                } catch (error) {
                        console.log('error creating user', error.message)
                }
        }
        
        return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
        const collectionRef = firestore.collection(collectionKey);

        const batch = firestore.batch();
        objectsToAdd.forEach(obj =>{
                const newDocRef = collectionRef.doc();
                batch.set(newDocRef, obj)
                }
        )

        return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
        const transformedCollection = collections.docs.map(
                doc => {
                        const { title, items } = doc.data();

                        return {
                                routeName: encodeURI(title.toLowerCase()),
                                id: doc.id,
                                title,
                                items
                        }
                }
        )

        return transformedCollection.reduce((init, next) => {
                init[next.title.toLowerCase()] = next;
                return init
        }, {})
}
 
export const getCurrentUser = () => {
        return new Promise((resolve, reject) => {
                const unsubscribe = auth.onAuthStateChanged(userAuth => {
                        unsubscribe();
                        resolve(userAuth);
                }, reject)
        })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
