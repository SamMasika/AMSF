<template>
<v-container fluid class="message ">

    <v-alert v-if="successMessage" v-model="successMessage" color="green" dismissible  text class="my-4 custom-alert" @input="reloadPage">
        <div class="text-h6">{{ successMessage }} </div>
    </v-alert>
    <v-alert v-if="errorMessage" v-model="errorMessage" color="red" dismissible  text class="my-4 custom-alert" @input="reloadPage">
        <div class="text-h6"> {{ errorMessage }} </div>
    </v-alert>

    <v-dialog v-model="dialog" persistent max-width="900px">
        <template>
            <v-row class="header-row">
                <v-col cols="6">
                    <h1 class="mx-3 display-5 my-1">Asset</h1>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn class="white--text mx-5 btn rounded-lg" medium elevation="24" color="blue" @click="dialog = true">
                        <v-icon>mdi-plus</v-icon>Add Asset
                    </v-btn>
                </v-col>
            </v-row>
        </template>

    </v-dialog>

    <v-dialog v-model="confirmDialogVisible" max-width="400px">
        <v-card class="rounded-xl" :elevation="24">
            <v-card-title class=" text-center">
            </v-card-title>
            <div class=" text-center">
                <v-icon size="80" color="red">mdi-delete-circle</v-icon>
            </div>
            <v-card-text class="text-h5 text--bold my-5 text-center " color="blue "> Are you sure you want to delete this <b class=""> {{ assetToDelete.name }}?</b> </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue " elevation="24" @click="confirmDialogVisible = false" class="rounded-lg btn white--text">Cancel</v-btn>
                <v-btn color="red" elevation="24" @click="deleteAsset" class="rounded-lg btn white--text">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAsset" persistent max-width="700px">
        <v-card class="rounded-lg">
            <v-card-title class="blue  white--text">
                <span class="text-h5">Assign Asset</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialogAsset = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-text-field type="text" label="Name" color="blue " disabled class="rounded-lg" outlined dense required v-model="assetEdit.phone_type"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row v-if="assetEdit.phone_type=='MobilePhone'">
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.section_id" :items="sections"></v-select>
                        </v-col>
                    </v-row>
                    <v-row v-if="assetEdit.phone_type=='Landline'">
                        <v-col cols="12" sm="12" md="12" lg="12">
                            <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.office_id" :items="offices"></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="assignAsset">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-row class="mx-5">
        <v-col cols="12" sm="6" md="6" lg="6" class="mt-3">
            <v-select v-model="itemsPerPage" :items="itemsPerPageOptions" label="Items per page" dense outlined class="custom-select"></v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="3" md="3" lg="3" class="mt-2">
            <v-text-field v-model="search" append-icon="mdi-magnify" outlined dense class="rounded-lg" color="blue " label="Search"></v-text-field>
        </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="filteredAssets" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer :search="search" class="elevation-0 " @page-count="pageCount = $event">
        <template v-slot:[`item.actions`]="{ item }">

            <div class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" class="btn rounded-lg" outlined small>
                            Action <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <router-link :to="{ name: 'order-view', params: { id: item.id } }" style="text-decoration:none;">
                                    <v-btn small class="btn" text color="blue lighten-1">
                                        <v-icon>mdi-eye</v-icon> View
                                    </v-btn>
                                </router-link>
                            </v-list-item-title>
                        </v-list-item>
                        <template v-if="item.asset.status==0">
                            <v-list-item class="custom-list-item">
                                <v-list-item-title>
                                    <v-btn text small @click="editAsset(item)" title="Delete" class="btn" color="blue lighten-1">
                                        <v-icon>mdi-pencil</v-icon> Assign
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </template>

                        <v-list-item class="custom-list-item">
                            <v-list-item-title>
                                <v-btn text small @click="deleteDialog(item)" title="Delete" class="btn" color="blue lighten-1">
                                    <v-icon>mdi-delete</v-icon> Delete
                                </v-btn>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>
        </template>
        <template v-slot:[`item.asset.status`]="{ item }">
            <template v-if="item.asset.status==1">
                <v-chip small color="red" dark>
                    Allocated
                </v-chip>
            </template>
            <template v-else>
                <v-chip small color="green" dark>
                    Deallocated
                </v-chip>
            </template>
          
        </template>
        <!-- Modify this part to display "NIL" for office and section when NULL -->
        <template v-slot:[`item.asset.section.name`]="{ item }">
            {{ item.asset.section?.name || 'NIL' }}
        </template>
        <template v-slot:[`item.asset.office.name`]="{ item }">
            {{ item.asset.office?.name || 'NIL' }}
        </template>

        <template v-slot:[`item.asset.purchasing_price`]="{ item }">
            {{ formatPrice(item.asset.purchasing_price) }}
        </template>
        <template v-slot:[`item.asset.purchase_date`]="{ item }">
            <span v-if="item.asset.purchase_date">
                {{ formatDate(item.asset.purchase_date) }}
            </span>
            <span v-else class="no-expiration">
                <i>N/A</i>
            </span>
        </template>
    </v-data-table>
    <v-row class="pagination-row mx-8">
        <v-col cols sm="6" md="6" lg="6">
            <p class="items-range blue--text text-darken-4">
                <b>Showing {{ startIndex }} - {{ endIndex }} out of {{ filteredAssets.length }}</b>
            </p>
        </v-col>
        <v-col cols sm="6" md="6" lg="6" class="text-right">
            <v-pagination v-model="page" :length="pageCount" circle show-arrows="off" :total-visible="5" class="pagination-no-elevation" prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
            </v-pagination>
        </v-col>
    </v-row>

</v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Printer',
    components: {

    },
    data() {
        return {

            dialog: false,
            dialogDelete: false,
            successMessage: '', // Initialize as empty
            errorMessage: '', // Initialize as empty
            assets: [],
            sections: [],
            offices: [],
            assetEdit: {},
            dialogAsset: false,
            confirmDialogVisible: false,
            assetToDelete: {},
            loading: true,
            page: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 20, 50],
            pageCount: 0,
            search: '',
            maxDate: '',

            headers: [{
                    text: 'Phone Type',
                    value: 'phone_type',
                },
                {
                    text: 'Brand',
                    value: 'chapa',
                },
                {
                    text: 'Model',
                    value: 'modeli',
                },
                {
                    text: 'Serial Number',
                    value: 'serial_no',
                },
                {
                    text: 'Asset Tag',
                    value: 'asset.asset_tag',
                },
                {
                    text: 'Condition',
                    value: 'asset.condition',
                },
                {
                    text: 'Purchased Date',
                    value: 'asset.purchase_date',
                },
                {
                    text: 'Purchasing Price(Tsh)',
                    value: 'asset.purchasing_price',
                },
                {
                    text: 'Assignment Status',
                    value: 'asset.status',
                },
                {
                    text: 'Section',
                    value: 'asset.section.name',
                },
                {
                    text: 'Office',
                    value: 'asset.office.name',
                },

                {
                    text: 'Action',
                    value: 'actions'
                }

            ],

        }
    },

    computed: {
        computedHeaders() {
            const headers = [{
                    text: 'Phone Type',
                    value: 'phone_type',
                },
                {
                    text: 'Brand',
                    value: 'chapa',
                },
                {
                    text: 'Model',
                    value: 'modeli',
                },
                {
                    text: 'Serial Number',
                    value: 'serial_no',
                },
                {
                    text: 'Asset Tag',
                    value: 'asset.asset_tag',
                },
                {
                    text: 'Condition',
                    value: 'asset.condition',
                },
                {
                    text: 'Purchased Date',
                    value: 'asset.purchase_date',
                },
                {
                    text: 'Purchasing Price(Tsh)',
                    value: 'asset.purchasing_price',
                },
                {
                    text: 'Assignment Status',
                    value: 'asset.status',
                },
            ];

            // Conditionally add 'Section' header based on phone_type
            if (this.filteredAssets.some(item => item.asset.phone_type === 'Mobilephone')) {
                headers.push({
                    text: 'Section',
                    value: 'asset.section.name',
                });
            }

            // Conditionally add 'Office' header based on phone_type
            if (this.filteredAssets.some(item => item.asset.phone_type === 'Landline')) {
                headers.push({
                    text: 'Office',
                    value: 'asset.office.name',
                });
            }

            // Add 'Action' header
            headers.push({
                text: 'Action',
                value: 'actions'
            });

            return headers;
        },
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },

        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.filteredAssets.length ? this.filteredAssets.length : end;
        },
        filteredAssets() {
            return this.assets.filter(asset => asset.asset.subcategory === 'Phone');
        },

        customDateFormat() {
            return value => {
                if (!value) return '';
                const date = new Date(value);
                const day = date.getDate();
                const month = date.getMonth() + 1; // Months are zero-based
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            };
        },

    },

    methods: {

        reloadPage() {
            location.reload();
        },
        setMaxDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            this.maxDate = `${year}-${month}-${day}`;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            };
            return date.toLocaleDateString('en-US', options);
        },

        formatPrice(price) {
            // Convert price to a number and handle NaN cases
            const parsedPrice = parseFloat(price);
            if (isNaN(parsedPrice)) {
                return '';
            }

            // Format price with commas for thousands
            return parsedPrice.toLocaleString('en-US');
        },
        fetchData() {
            this.isLoading = true
            axios.get('/electronics')
                .then(response => {
                    this.assets = response.data.data
                    console.log(response.data)
                })
            axios.get('/section-list')
                .then(response => {
                    this.sections = response.data.data
                })
            axios.get('/office-list')
                .then(response => {
                    this.offices = response.data.data
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(() => {
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1000);
                })
        },
        // search() {
        //     this.pagination.page = 1;
        //     this.fetchData();
        // },

        addAsset() {
            axios
                .post('/asset-store', this.asset)
                .then(response => {
                    if (response.data.success) {
                        // Success logic
                        this.successMessage = response.data.message;
                        this.errorMessage = ''; // Clear any existing error message
                        // location.reload();
                    } else {
                        // Error handling
                        this.errorMessage = response.data.message;
                        this.successMessage = ''; // Clear any existing success message
                    }
                })
                .catch(error => {
                    // Handle network errors
                    console.error('API call failed!', error);
                    this.errorMessage = 'API call failed: ' + error.message;
                    this.successMessage = ''; // Clear any existing success message
                });

            this.dialog = false;
        },

        //UpdateAsset
        editAsset(item) {
            this.assetEdit = item
            this.dialogAsset = true
        },
        async assignAsset() {

            this.isLoading = true
            await axios.post(
                    "/assign-asset/" + this.assetEdit.id, {
                        section_id: this.assetEdit.section_id,
                        office_id: this.assetEdit.office_id,
                    }
                ).then(response => {
                    if (response.data.success) {
                        // Success logic
                        this.successMessage = response.data.message;
                        this.errorMessage = ''; // Clear any existing error message
                        // location.reload();
                    } else {
                        // Error handling
                        this.errorMessage = response.data.message;
                        this.successMessage = ''; // Clear any existing success message
                    }
                })
                .catch(error => {
                    // Handle network errors
                    console.error('API call failed!', error);
                    this.errorMessage = 'API call failed: ' + error.message;
                    this.successMessage = ''; // Clear any existing success message
                });
            this.dialogAsset = false

        },

        //DeleteAsset

        deleteAsset() {
            axios.delete(`asset-delete/${this.assetToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogAsset = true
                    const index = this.assets.indexOf(this.assetToDelete);
                    if (index > -1) {
                        this.assets.splice(index, 1);
                    }
                    this.confirmDialogVisible = false;
                    // Success logic
                    this.successMessage = response.data.message;
                    this.errorMessage = '';
                })
                .catch(error => {
                    // API call failed, show error message
                    this.confirmDialogVisible = false;
                    this.errorMessage = 'API call failed: ' + error.message;
                    this.successMessage = ''; // Clear any existing success message
                });
        },

        deleteDialog(item) {
            this.assetToDelete = item;
            this.confirmDialogVisible = true;

        },

    },
    mounted() {
        this.fetchData();
        this.setMaxDate();

    },

}
</script>

<style>
.btn {
    text-transform: none !important;
}

.toaster-alert {
    width: 800px;
    height: 200px;
    font-size: 24px;
    padding: 20px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
}

.pagination-no-elevation .v-pagination__item,
.pagination-no-elevation .v-pagination__icon {
    box-shadow: none;
}

/* Remove elevation from pagination arrows */
.pagination-no-elevation .v-pagination__navigation {
    box-shadow: none;
}

.custom-dialog {
    background-color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.text-right .v-pagination {
    justify-content: flex-end;
}

.custom-select {
    max-width: 70px;
    /* Adjust the width as needed */
    font-size: 12px;
    /* Adjust the font size as needed */
}

.custom-list-item {

    margin: -5px 0;
    /* Adjust margins as needed */
    padding: -5px 0;
    /* Adjust paddings as needed */

}

.pagination-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    /* Adjust margin as needed */
}

.basil {
    background-color: #FFFBE6 !important;
}

.basil--text {
    color: #356859 !important;
}

@media (max-width: 768px) {

    /* Hide the text labels in the tab items */
    .tab-label {
        display: none;
    }
}

@media (max-width: 768px) {

    /* Adjust the width of the table for small screens */
    .mx-8 {
        max-width: 90%;
        /* Adjust the percentage as needed */
        margin: 0 auto;
        /* Center the table */
    }
}
</style>
