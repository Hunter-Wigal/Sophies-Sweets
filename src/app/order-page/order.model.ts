export class OrderModel {
    name: string;
    email: string;
<<<<<<< HEAD
    phoneNumber: string;
    orderType: string;
    quantity: number;
    cakeFlavor: string;
    icingFlavor: string;
    addComments: string;

    constructor(_name: string, _email: string, _phone: string, _orderType: string, _quantity: number, _cakeFlavor: string, _icingFlavor: string, _comments: string){
        this.name = _name;
        this.email = _email;
        this.phoneNumber = _phone;
=======
    phone: string;
    orderType: string;
    quantity: string;
    cakeFlavor: string;
    icingFlavor: string;
    comments: string;

    constructor(_name: string, _email: string, _phone: string, _orderType: string, _quantity: string, _cakeFlavor: string, _icingFlavor: string, _comments: string){
        this.name = _name;
        this.email = _email;
        this.phone = _phone;
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
        this.orderType = _orderType;
        this.quantity = _quantity;
        this.cakeFlavor = _cakeFlavor;
        this.icingFlavor = _icingFlavor;
<<<<<<< HEAD
        this.addComments = _comments;
=======
        this.comments = _comments;
>>>>>>> 356fef51b51a9e290aca76d6c9367a42dadb6dc0
    }
}