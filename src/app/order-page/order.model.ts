export class OrderModel {
    orderType: string;
    quantity: number;
    shellFlavor: string;
    cakeFlavor: string;
    icingFlavor: string;

    constructor(_orderType: string, _quantity: number, _shellFlavor: string, _cakeFlavor: string, _icingFlavor: string){
        this.orderType = _orderType;
        this.quantity = _quantity;
        this.shellFlavor = _shellFlavor;
        this.cakeFlavor = _cakeFlavor;
        this.icingFlavor = _icingFlavor;
    }
}