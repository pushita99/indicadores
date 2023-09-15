<template>
    <div class="card">
        <div class="field">
            <label for="directionId" class="mb-3">Dirección</label>
            <AutoComplete placeholder="Buscar dirección" id="directionId" :dropdown="true" v-model="direction"
                :suggestions="autoFilteredDirections" @complete="searchDirections($event)" :force-selection="true"
                field="name" @item-select="loadData(direction.id)" />

        </div>
      
        <div v-if="loading">
            cargando...
            <ProgressSpinner />
            <ProgressSpinner aria-label="Basic ProgressSpinner" />
        </div>
        <div v-if="!indicadores || indicadores.length === 0">
           No hay indicadores para esta direccion...
            
        </div>
        <div v-show="!loading ">
            <!-- class="p-datatable p-component p-datatable-responsive-scroll p-datatable-grouped-header p-datatable-grouped-footer"> -->

            <div class="p-datatable-wrapper">
                <!-- <table class="p-datatable-table" v-if="indicadores"> -->
                <table class="tabla" v-if="indicadores && indicadores.length > 0">
                    <!-- <thead class="p-datatable-thead"> -->
                    <thead class="">
                        <tr>
                            <th rowspan="3">
                                <div class="">
                                    <!-- <div class="p-column-header-content"> -->
                                    <span class="p-column-title">Indicadores</span>
                                </div>

                            </th>
                            <th :colspan="2 * indicadores[0].companies.length">
                                <div class="p-column-header-content">
                                    <span class="p-column-title"> Empresas</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th v-for="empresa in indicadores[0].companies" colspan="2">
                                <div class="p-column-header-content">
                                    <span class="p-column-title">{{ empresa.name }}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <template v-for="empresa in indicadores[0].companies">
                                <th>
                                    <div class="p-column-header-content">
                                        <span class="p-column-title">Plan</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="p-column-header-content">
                                        <span class="p-column-title">Real</span>
                                    </div>
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="">
                        <!-- <tbody class="p-datatable-tbody"> -->
                        <tr v-for="indicador in indicadores">
                            <td>{{ indicador.name }}</td>
                            <template v-for="empresa in indicador.companies">
                                <td>
                                    {{ empresa.planification }}
                                </td>
                                <td>
                                    {{ empresa.value }}
                                </td>
                            </template>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../../store/auth.store';
import { BASE_URL } from '@/services/http-adaptator.js';
const API_URL = BASE_URL + "reports/general_report/";
const DIRECTION = BASE_URL + "direction/";

export default {
    data() {
        return {
            sales: null,
            indicadores: [],
            autoFilteredDirections: [],
            directions: null,
            direction: null,
            loading: true,
        }
    },
    created() {

    },
    methods: {
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        async loadData(id) {
            this.loading = true;
            try {
                const resource = await axios.get(`${API_URL}${id}`);
                this.indicadores = resource.data;
                this.loading = false;
            } catch (e) {
                console.log(e);
            }
        },
        async loadDirections() {
            try {
                const resource = await axios.get(DIRECTION);
                this.directions = resource.data;
            } catch (e) {
                console.log(e);
            }
        },
        getDirectionId() {
            const store = useAuthStore();
            return store.user.user.direction.id;
        },
        searchDirections(event) {
            setTimeout(() => {
                if (!event.query.trim().length) {
                    this.autoFilteredDirections = [...this.directions];
                }
                else {
                    this.autoFilteredDirections = this.directions.filter((direction) => {
                        return direction.name.toLowerCase().startsWith(event.query.toLowerCase());
                    });
                }
            }, 250);
        }

    },
    computed: {
        lastYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.lastYearProfit;
            }

            return this.formatCurrency(total);
        },
        thisYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.thisYearProfit;
            }

            return this.formatCurrency(total);
        },
        ancho() {
            const columnas = this.indicadores[0].empresas.lenth + 1;
            return (100 / columnas);
        }
    },
    mounted() {
        this.loadData(this.getDirectionId());
        this.loadDirections();
    }
}
</script>
<style>
.tabla tr>td {
    text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;

}

.tabla {
    border-collapse: collapse;
    width: 100%;
}

.tabla tr>th {
    text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;
    font-family: var(--font-family);
    font-weight: bold !important;
}


@keyframes p-progress-spinner-color {
    100%,
    0% {
        stroke: #d62d20;
    }
    40% {
        stroke: #0057e7;
    }
    66% {
        stroke: #008744;
    }
    80%,
    90% {
        stroke: #ffa700;
    }
}
</style>