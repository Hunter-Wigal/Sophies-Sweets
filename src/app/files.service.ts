import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
//import "firebase/storage";
import { FirebaseStorage, StorageReference, getStorage, list, listAll, ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { Firestore, getFirestore, addDoc, collection, getDocs, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { OrderModel } from "./order-page/order.model";

@Injectable({ providedIn: 'root' })
export class FilesService {
    storage: FirebaseStorage;
    db: Firestore;

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

        this.storage = getStorage(app);
        this.db = getFirestore(app);
    }

    public async getMacaronImages() {
        const macaronRef = ref(this.storage, "Pictures");
        const macaronRefs = (await list(ref(macaronRef, "/Macarons"))).items;

        return macaronRefs;

    }

    public async getCupcakeImages() {
        const pictureRef = ref(this.storage, "Pictures");
        const cupcakeRefs = (await list(ref(pictureRef, "/Cupcakes"))).items;

        return cupcakeRefs;

    }

    public async getCakeImages() {
        const picturesRef = ref(this.storage, "Pictures");
        const cakeRefs = (await list(ref(picturesRef, "/Cakes"))).items;

        return cakeRefs;

    }

    public async addOrder(order: OrderModel) {
        try {
            const docRef = await addDoc(collection(this.db, "Orders"), {
                name: order.name,
                email: order.email,
                phone: order.phone,
                requestedDate: order.requestedDate,
                type: order.type,
                quantity: order.quantity,
                cake_flavor: order.cake_flavor,
                macaron_flavor: order.macaron_flavor,
                icing: order.icing,
                comments: order.comments
            });

            return "success";
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async getOrders() {
        let orders: OrderModel[] = [];
        const querySnapshot = await getDocs(collection(this.db, "Orders"));
        querySnapshot.forEach((doc) => {
            orders.push(<OrderModel>doc.data())
        });
        return orders;
    }

}