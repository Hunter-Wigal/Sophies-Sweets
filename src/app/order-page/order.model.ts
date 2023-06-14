export class OrderModel {
    name: string;
    email: string;
    phone: string;
    type: string;
    quantity: string;
    cake_flavor: string;
    macaron_flavor: string;
    icing: string;
    comments: string;
    requestedDate: string;

    constructor(_name: string, _email: string, _phone: string, _orderType: string, _quantity: string, _cakeFlavor: string, _macaronFlavor: string,
         _icingFlavor: string, _comments: string, _requestedDate: string){
        this.name = _name;
        this.email = _email;
        this.phone = _phone;
        this.type = _orderType;
        this.quantity = _quantity;
        this.cake_flavor = _cakeFlavor;
        this.macaron_flavor = _macaronFlavor;
        this.icing = _icingFlavor;
        this.comments = _comments;
        this.requestedDate = _requestedDate;
    }
}