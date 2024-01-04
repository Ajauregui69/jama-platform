<template>
  <div class="mx-auto">
    <!-- Botones de PayPal -->
    <div id="paypal-button-container"></div>
  </div>
</template>

<script>
import { loadScript } from "@paypal/paypal-js";
import axios from "axios";

export default {
  props: {
    clientIdPaypal: String, // propiedad heredada de otro componente
    secretPaypal: String, // propiedad heredada de otro componente
    amount: Number, // propiedad heredada de otro componente
    hackerUserId: Number,
    hackerID: Number,
    notePayment: String,
    reportID: Number,
  },
  data() {
    return {
      paypalSdkLoaded: false,
      paymentInfo: {
        orderId: null, // ID de la orden de PayPal
        transactionAmount: null, // Monto de la transacción
        status: null, // Estado de la transacción (aprobado, cancelado, etc.)
      },
    };
  },
  mounted() {
    this.loadPaypalSdk();
  },
  methods: {
    async loadPaypalSdk() {
      const clientId = this.clientIdPaypal;

      const paypalSdk = await loadScript({
        "client-id": clientId,
        currency: "MXN",
        components: "buttons",
        vault: false,
      });

      this.paypalSdkLoaded = true;
      this.renderPayPalButton();
    },
    renderPayPalButton() {
      if (this.paypalSdkLoaded) {
        const paypalButtonContainer = document.getElementById(
          "paypal-button-container"
        );
        paypalButtonContainer.innerHTML = "";

        paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "MXN",
                      value: this.amount,
                    },
                    description: this.notePayment, // Información interna para el pago
                  },
                ],
              });
            },

            onApprove: async (data, actions) => {
              try {
                // Aquí puedes manejar la captura de pago exitosa
                const captureResult = await this.capturePayment(data.orderID);

                // Para guardar la información de los pagos
                this.saveDataOrder(captureResult);
              } catch (error) {
                // Aquí puedes manejar el error de la captura de pago
                console.error("Error en la captura de pago:", error);
                alert(
                  "Error en la captura de pago. Por favor, intenta nuevamente."
                );
              }
            },
            onError: (err) => {
              // Aquí puedes definir la lógica para manejar errores de pago
              console.error("Error en el pago", err);
              alert(
                "Ha ocurrido un error en el pago. Por favor, intenta nuevamente."
              );
            },
            onCancel: (data) => {
              // Aquí puedes definir la lógica para cuando el usuario cancele el pago
              alert("Pago cancelado por el usuario.");
              this.paymentInfo.status = "Cancelado";
            },
            style: {
              // Personaliza el estilo del botón de PayPal
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
            // Resto del código de configuración de PayPal...
          })
          .render("#paypal-button-container");
      }
    },

    async capturePayment(orderId) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_JAMA}/capture/${orderId}`,
          {
            id: this.hackerUserId,
          }
        );

        return response;
      } catch (e) {
        console.log(e);
      }
    },

    async saveDataOrder(dataOrder, hackerId) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_JAMA}/orders`, {
          orderId: dataOrder.data.responseCapture.data.id,
          hackerId: this.hackerID,
          reportId: this.reportID,
          amount: this.amount,
          note: this.notePayment,
          status: dataOrder.data.responseCapture.data.status,
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.Paypal {
  display: inline-block;
}
</style>
