export class OrderModel {
    name: string;
    email: string;
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
        this.orderType = _orderType;
        this.quantity = _quantity;
        this.cakeFlavor = _cakeFlavor;
        this.icingFlavor = _icingFlavor;
        this.addComments = _comments;
    }
}