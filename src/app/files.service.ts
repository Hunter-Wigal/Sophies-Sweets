import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
//import "firebase/storage";
import { FirebaseStorage, StorageReference, getStorage, list, listAll, ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
<<<<<<< HEAD
import { Firestore, addDoc, collection, getFirestore } from "firebase/firestore";
=======
import { Firestore, getFirestore, addDoc, collection } from "firebase/firestore";
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
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

<<<<<<< HEAD
          this.storage = getStorage(app);
          this.db = getFirestore(app);
=======
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);

        this.storage = getStorage(app);
        this.db = getFirestore(app);
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
    }

    public async getMacaronImages() {
        const macaronRef = ref(this.storage, "Pictures");
        const macaronRefs = (await list(ref(macaronRef, "/NewMacarons"))).items;

        return macaronRefs;

    }

    public async getCupcakeImages() {
        const pictureRef = ref(this.storage, "Pictures");
        const cupcakeRefs = (await list(ref(pictureRef, "/NewCupcakes"))).items;

        return cupcakeRefs;

    }

    public async getCakeImages() {
        const picturesRef = ref(this.storage, "Pictures");
        const cakeRefs = (await list(ref(picturesRef, "/NewCakes"))).items;

        return cakeRefs;

    }

<<<<<<< HEAD
    public async addOrder(order: OrderModel){
        try {
            const docRef = await addDoc(collection(this.db, "Orders"), {
              name: order.name,
              email: order.email,
              phone: order.phoneNumber,
              type: order.orderType,
              quantity: order.quantity,
              flavor: order.cakeFlavor,
              icing: order.icingFlavor,
              comments: order.addComments
            });
            console.log("Document written");
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    public async getOrders(){
      const orders = [];
=======
    public async addOrder(order: OrderModel) {
        try {
            const docRef = await addDoc(collection(this.db, "Orders"), {
                name: order.name,
                email: order.email,
                phone: order.phone,
                type: order.orderType,
                quantity: order.quantity,
                flavor: order.cakeFlavor,
                icing: order.icingFlavor,
                comments: order.comments
            });

            return "success";
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    public async getOrders() {

>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
    }

}