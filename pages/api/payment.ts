// Creating an environment  
let clientId = "AXdG9O8hl6h2Srx1BpGlwYFY91z7vQzuP_EIEd4jomN9rViAacNxoPICoElj4ArWi_dv5x7UCx9F_zWb";
let clientSecret = "ENtKlL4n4aJu4hwS9dCpqehE8QIbv1jE7aezZbMSpUcvABQIyUziyynT9m4Z0vFdxKZ8FtYjmJe_1iiw";

const paypal = require('@paypal/checkout-server-sdk');
// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

export default async function handler(req:any, res:any) {
    if (req.method === "POST") {
        const { total } = req.body;
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: total,
                    },
                },
            ],
        });
        const response = await client.execute(request);

        return res.json({ id: response.result.id });
    }
}
