<script setup>
import { puechaseSalesDetails1, puechaseSalesDetails2 } from "../data/default";


</script>
<template>
  <div class="col-xxl-auto col-xl-3 col-sm-4 box-col-4">
    <div class="row">
      <div
        class="col-xl-12"
        v-for="puechaseSales in puechaseSalesDetails1"
        :key="puechaseSales"
      >
        <div class="card widget-1">
          <div class="card-body">
            <div class="widget-content">
              <div :class="puechaseSales.widgetClass">
                <div class="bg-round">
                  <svg class="svg-fill">
                    <use
                      :xlink:href="
                        'src/assets/svg/icon-sprite.svg' +
                        `#${puechaseSales.svgIcon1}`
                      "
                    ></use>
                  </svg>
                  <svg class="half-circle svg-fill">
                    <use
                      :xlink:href="
                        'src/assets/svg/icon-sprite.svg' +
                        `#${puechaseSales.svgIcon2}`
                      "
                    ></use>
                  </svg>
                </div>
              </div>
              <div>
                <h4>{{ puechaseSales.number }}</h4>
                <span class="f-light">
                  {{ puechaseSales.title }}
                </span>
              </div>
            </div>
            <div :class="puechaseSales.growthClass">
              <i :class="puechaseSales.iconClass"></i
              ><span>{{ puechaseSales.growthNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-xxl-auto col-xl-3 col-sm-4 box-col-4">
    <div class="row">
      <div
        class="col-xl-12"
        v-for="puechaseSales in puechaseSalesDetails2"
        :key="puechaseSales"
      >
        <div class="card widget-1">
          <div class="card-body">
            <div class="widget-content">
              <div :class="puechaseSales.widgetClass">
                <div class="bg-round">
                  <svg class="svg-fill">
                    <use
                      :xlink:href="
                        'src/assets/svg/icon-sprite.svg' +
                        `#${puechaseSales.svgIcon1}`
                      "
                    ></use>
                  </svg>
                  <svg class="half-circle svg-fill">
                    <use
                      :xlink:href="
                        'src/assets/svg/icon-sprite.svg' +
                        `#${puechaseSales.svgIcon2}`
                      "
                    ></use>
                  </svg>
                </div>
              </div>
              <div>
                <h4>{{ puechaseSales.number }}</h4>
                <span class="f-light">
                  {{ puechaseSales.title }}
                </span>
              </div>
            </div>
            <div :class="puechaseSales.growthClass">
              <i :class="puechaseSales.iconClass"></i
              ><span>{{ puechaseSales.growthNumber }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
