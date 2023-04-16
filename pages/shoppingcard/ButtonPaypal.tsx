import { ICartItem } from "@/interfaces/sale.interface";
import {
    FUNDING,
    PayPalButtons,
    PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import React, { FC, useRef } from "react";

interface Props {
    handlecreateOrder: () => Promise<any>;
    handleOnCancel: () => void;
    handleOnAprove: (data: any, actions: any) => Promise<void>;
    cartItems: ICartItem[];
    areAllItemsDisabled: () => boolean;
}

export const ButtonPaypal: FC<Props> = ({
    handlecreateOrder,
    handleOnAprove,
    handleOnCancel,
    cartItems,
    areAllItemsDisabled,
}) => {
    const btn = useRef<HTMLDivElement>(null);
    const handleInit = () => {
        console.log("boton init");
        btn.current?.click();
    };

    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AXdG9O8hl6h2Srx1BpGlwYFY91z7vQzuP_EIEd4jomN9rViAacNxoPICoElj4ArWi_dv5x7UCx9F_zWb",
            }}
        >
            <div ref={btn}>
                <PayPalButtons
                    onInit={handleInit}
                    createOrder={handlecreateOrder}
                    onCancel={handleOnCancel}
                    onApprove={handleOnAprove}
                    style={{
                        layout: "horizontal",
                        color: "black",
                        shape: "rect",
                        label: "pay",
                        tagline: false,
                    }}
                    fundingSource={FUNDING.PAYPAL}
                    disabled={cartItems.length === 0 || areAllItemsDisabled()}
                />
            </div>
        </PayPalScriptProvider>
    );
};
