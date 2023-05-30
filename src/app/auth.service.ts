import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";


@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth: Auth;

    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyD13AN3HiBPMEau5gDhQ-3SZUiwiLQ3psU",
            authDomain: "sophiessweets-785d8.firebaseapp.com",
            projectId: "sophiessweets-785d8",
            storageBucket: "sophiessweets-785d8.appspot.com",
            messagingSenderId: "560782189550",
            appId: "1:560782189550:web:64f7ac6c33c7904ba264ff",
            measurementId: "G-6DVTPZBEW7"
        };

        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        this.auth = getAuth(app);
    }

    public async login(email: string, password: string) {
        await signInWithEmailAndPassword(this.auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return null;
            });
    }

    public async loggedIn(){
        return this.auth.currentUser;
    }
}