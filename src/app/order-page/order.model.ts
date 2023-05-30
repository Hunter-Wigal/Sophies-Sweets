export class OrderModel {
    name: string;
    email: string;
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
        this.orderType = _orderType;
        this.quantity = _quantity;
        this.cakeFlavor = _cakeFlavor;
        this.icingFlavor = _icingFlavor;
        this.comments = _comments;
    }
}