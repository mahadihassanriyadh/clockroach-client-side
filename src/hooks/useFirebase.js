import { useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    getIdToken,
} from "firebase/auth";
import initializeFirebase from "../Pages/Login/Firebase/Firebase.init";
import { useEffect } from "react";

// initialize firebase app
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState("");

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError("");
                const newUser = { email: email, displayName: name };
                // save user to the database
                saveUser(email, name, "POST");

                // send name to firebase after cration
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {
                        // Profile updated!
                        // ...
                    })
                    .catch((error) => {
                        setError(error);
                    });

                setUser(newUser);
                history.replace("/");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || "/";

                history.replace(destination);
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const signInWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                saveUser(user.email, user.displayName, "PUT");
                setError("");
                const destination = location?.state?.from || "/";
                history.replace(destination);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                setUser(user);
                getIdToken(user).then((idToken) => {
                    setToken(idToken);
                });
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, []);

    useEffect(() => {
        fetch(`https://clockroach-server.onrender.com/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => setAdmin(data.admin));
    }, [user.email]);

    const logout = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    };

    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch("https://clockroach-server.onrender.com/users", {
            method: method,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        }).then();
    };

    return {
        user,
        admin,
        token,
        registerUser,
        logout,
        loginUser,
        isLoading,
        error,
        setError,
        signInWithGoogle,
    };
};

export default useFirebase;
