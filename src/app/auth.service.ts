import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Router} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth: Auth;
    sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    constructor( private router: Router) {
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
        let user = await signInWithEmailAndPassword(this.auth, email, password)
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                return null;
            });
        return user;
    }

    // public loggedIn(){
    //     return (this.auth.currentUser != null);
    // }

    /**
     * @brief Logs the user out
     */
    public async logout(){
        await this.auth.signOut();
    }

    /**
     * @brief Redirects to a page if the current auth state matches the provided auth boolean
     * @param where The page to redirect to
     * @param auth Whether the user should be logged in or not to redirect there
     */
    redirect(where: string, auth: boolean){
        this.auth.onAuthStateChanged(async (user) => {
            // Variable to store auth state
            let loggedIn = (user == null)
            // If the auth state matches the auth boolean, redirect to the given page
            if (!loggedIn == auth) {
                this.router.navigate([where]);
            }
          });
    }
}