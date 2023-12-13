<template>
  <table class="table table-bordered table-striped">
    <tbody>
      <tr>
        <td class="item">
          <h6 class="p-2 mb-0">Report Description</h6>
        </td>
        <td class="Hours">
          <h6 class="p-2 mb-0">Severity</h6>
        </td>
        <td class="Rate">
          <h6 class="p-2 mb-0">Rating</h6>
        </td>
        <td class="subtotal">
          <h6 class="p-2 mb-0">Reward</h6>
        </td>
      </tr>
      <tr>
        <td>
          <label>Report</label>
          <p class="m-0">{{ reportTitle }}</p>
        </td>
        <td>
          <p class="itemtext digits">{{ severity }}</p>
        </td>
        <td>
          <p class="itemtext digits">{{ rating }}</p>
        </td>
        <td>
          <p class="itemtext digits">{{ `$ ${amount}` }}</p>
        </td>
      </tr>
      <!-- <tr>
        <td>
          <p class="itemtext"></p>
        </td>
        <td>
          <p class="m-0">HST</p>
        </td>
        <td>
          <p class="m-0 digits">13%</p>
        </td>
        <td>
          <p class="m-0 digits"></p>
        </td>
      </tr> -->
      <tr>
        <td></td>
        <td></td>
        <td class="Rate">
          <h6 class="mb-0 p-2">Total</h6>
        </td>
        <td class="payment digits">
          <h6 class="mb-0 p-2">{{ `$ ${amount}` }}</h6>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { invoice } from "../../data/ecommerce/invoice";
export default {
  props: {
    reportTitle: String,
    severity: String,
    rating: String,
    amount: String,
  },
  data() {
    return {
      invoices: invoice,
    };
  },
};
</script>
