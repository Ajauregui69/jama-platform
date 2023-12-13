<template>
  <div class="col-sm-12">
    <div class="card">
      <div class="card-header">
        <h5>Scope</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive product-table">
          <table
            class="display assets-table"
            id="basic-1"
          >
            <thead>
              <tr>
                <th
                  class="sorting_asc"
                  tabindex="0"
                  aria-controls="basic-1"
                  rowspan="1"
                  colspan="1"
                  aria-sort="ascending"
                  aria-label="Image: activate to sort column descending"
                >
                  ID
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="basic-1"
                  rowspan="1"
                  colspan="1"
                  aria-label="Details: activate to sort column ascending"
                >
                  Asset Type
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="basic-1"
                  rowspan="1"
                  colspan="1"
                  aria-label="Amount: activate to sort column ascending"
                >
                  Asset
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="basic-1"
                  rowspan="1"
                  colspan="1"
                  aria-label="Amount: activate to sort column ascending"
                >
                  Out / In Scope
                </th>
                <th
                  class="sorting"
                  tabindex="0"
                  aria-controls="basic-1"
                  rowspan="1"
                  colspan="1"
                  aria-label="Amount: activate to sort column ascending"
                >
                  Bounty
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(asset, $a) in assets" :key="$a">
                <td>
                  <span>{{ $a + 1 }}</span>
                </td>
                <td>
                  <span>{{ asset.type }}</span>
                </td>
                <td>{{ asset.asset_name }}</td>
                <td>{{ asset.scope }}</td>
                <td class="text-center"><span :class="badgeClass(`${asset.bounty}`)">{{ asset.bounty }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed:{
    ...mapState({
      assets: (state) => state.programs.assets
    }),
  },
  methods:{
    badgeClass(status) {

      if (status === "ineligible") {
        return "badge badge-danger";
      } else  {
        return "badge badge-success";
      }
    },
  }
};
</script>

<style lang="scss">
tbody{
  td{
    text-transform: capitalize;
  }
}
</style>
