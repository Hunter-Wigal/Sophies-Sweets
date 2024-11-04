import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Router} from '@angular/router';
import {firebaseConfig} from "../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthService {
    private auth: Auth;
    sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    constructor( private router: Router) {
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

            this.auth.onAuthStateChanged((user) => {
                let userSessionTimeout = null;

                if (user === null && userSessionTimeout) {
                  clearTimeout(userSessionTimeout);
                  userSessionTimeout = null;
                } else if(user !== null) {
                  user.getIdTokenResult().then((idTokenResult) => {
                    const authTime = ((idTokenResult.claims.auth_time != undefined) ? (parseInt(idTokenResult.claims.auth_time)  * 1000): 0);
                    const sessionDurationInMilliseconds = 60 * 60 * 1000; // 60 min
                    const expirationInMilliseconds = sessionDurationInMilliseconds - (Date.now() - authTime);
                    userSessionTimeout = setTimeout(() => this.auth.signOut(), expirationInMilliseconds);
                  });
                }
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
