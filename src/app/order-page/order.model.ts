export class OrderModel {
    name: string;
    email: string;
    phone: string;
    type: string;
    quantity: string;
    cake: string;
    icing: string;
    comments: string;

    constructor(_name: string, _email: string, _phone: string, _orderType: string, _quantity: string, _cakeFlavor: string, _icingFlavor: string, _comments: string){
        this.name = _name;
        this.email = _email;
        this.phone = _phone;
        this.type = _orderType;
        this.quantity = _quantity;
        this.cake = _cakeFlavor;
        this.icing = _icingFlavor;
        this.comments = _comments;
    }
}