import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateProfile, sendEmailVerification, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, onSnapshot, query, where, doc } from "firebase/firestore";
import toast from "react-hot-toast"
import store from "./store";
import { login as loginHandle, logout as logoutHandle } from "./store/auth"
import { openModal } from "./store/modal";
import { setTodos } from "./store/todos";
import { setUserData } from "./utils";

const firebaseConfig = {
    // apiKey: proccess.env.REACT_APP_API_KEY,
    // authDomain: proccess.env.REACT_APP_AUTH_DOMAIN,
    // projectId: proccess.env.REACT_APP_PROJECT_ID,
    // storageBucket: proccess.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    // appId: proccess.env.REACT_APP_ID,
    // measurementId: proccess.env.REACT_APP_MEASUREMENT_ID
    apiKey: "AIzaSyA9gCqF0un8DgGU9zrNxnCB8Ou5GFMUTpA",
    authDomain: "aelita-todolist.firebaseapp.com",
    projectId: "aelita-todolist",
    storageBucket: "aelita-todolist.appspot.com",
    messagingSenderId: "745978843903",
    appId: "1:745978843903:web:f59f80005eec606a20f2ca",
    measurementId: "G-HCFWLZELB2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getFirestore(app)

export const register = async (email, password) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message);
    }
}

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        toast.error(error.message);
    }
}

export const logout = async () => {
    try {
        await signOut(auth)
        return true
    } catch (error) {
        toast.error(error.message);
    }
}

export const update = async data => {
    try {
        await updateProfile(auth.currentUser, data)
        toast.success("profil başarıyla güncellendi")
    } catch (error) {
        toast.error(error.message)
    }
}

export const resetPassword = async password => {
    try {
        await updatePassword(auth.currentUser, password)
        toast.success("şifre başarıyla güncellendi")
    } catch (error) {
        if (error.code === "auth/requires-recent-login") {
            store.dispatch(openModal({
                name: "re-auth-modal"
            }))
        }
        toast.error(error.message)
    }
}

export const emailVerification = async () => {
    try {
        await sendEmailVerification(auth.currentUser)
        toast.success(`doğrulama maili ${auth.currentUser.email} adresine gönderildi. lütfen doğrulayın`)
    } catch (error) {
        toast.error(error.message)
    }
}

export const reAuth = async password => {
    try {
        const credential = await EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )
        const { user } = await reauthenticateWithCredential(auth.currentUser, credential)
        return user
    } catch (error) {
        toast.error(error.message);
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUserData();

        onSnapshot(query(collection(db, "todos"), where('uid', '==', auth.currentUser.uid)), (doc) => {
            store.dispatch(
                setTodos(doc.docs.reduce((todos, todo) => [...todos, { ...todo.data(), id: todo.id }], [])
                )
            )
        })

        return true

    } else {
        store.dispatch(logoutHandle())
    }
})

export const addTodo = async data => {
    try {
        const result = await addDoc(collection(db, "todos"), data)
        return result.id
    } catch (error) {
        toast.error(error.message)
    }
}

export const deleteTodo = async id => {
    try {
        await deleteDoc(doc(db, "todos", id))
    } catch (error) {
        toast.error(error.message)
    }
}

export default app