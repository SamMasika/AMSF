<template>
<v-container fluid class="message ">
    <div class="text-center">
        <v-alert v-if="successMessage" v-model="successMessage" color="green" dismissible dense text class="my-4 custom-alert" @input="reloadPage">
            <div class="text-h6">{{ successMessage }} </div>
        </v-alert>
        <v-alert v-if="errorMessage" v-model="errorMessage" color="red" dismissible dense text class="my-4 custom-alert" @input="reloadPage">
            <div class="text-h6"> {{ errorMessage }} </div>
        </v-alert>
    </div>

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
        <v-card class="rounded-lg">
            <v-card-title class="blue  white--text ">
                <span class="text-h5 ">Add Asset</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form @click.prevent="addAsset">
                    <v-row>
                        <v-col cols sm="4" md="4" lg="4">
                            <v-select label="--Category--" class="rounded-lg" outlined dense :items="categoryOptions" v-model="asset.category"></v-select>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Asset Tag" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="date" label="Purchased Date" color="blue " :max="maxDate" class="rounded-lg" outlined dense required v-model="asset.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="number" label="Purchasing Price" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Condition--" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="asset.section_id" :items="computerOptions"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols sm="4" md="4" lg="4" v-if="asset.category=='Electronic'">
                            <v-select label="--Electronics--" class="rounded-lg" outlined dense :items="electronicOptions" v-model="asset.subcategory"></v-select>
                        </v-col>
                        <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Computer'">
                            <v-select label="--Computer Type--" class="rounded-lg" outlined dense :items="computerOptions"></v-select>
                        </v-col>
                    </v-row>
                    <v-row v-if="asset.category=='Electronic'">
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Brand" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Model" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Serial Number" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="asset.category=='Furniture'">
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Furniture Type" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Material" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Office" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="asset.category=='Vehicle'">
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Brand" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Model" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="cheses No" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row v-if="asset.category=='Vehicle'">
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Registration Number" color="blue " class="rounded-lg" outlined dense required></v-text-field>
                        </v-col>

                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="addAsset">
                    Save
                </v-btn>
            </v-card-actions>

        </v-card>
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
    <v-dialog v-model="dialogAsset" persistent max-width="800px">
        <v-card>
            <v-card-title class="blue  white--text">
                <span class="text-h5">Edit Asset</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialogAsset = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Firstname" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.fname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Middlename" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.mname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Lastname" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.lname"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="email" label="Email" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.email"></v-text-field>
                        </v-col>Price
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Phone" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.section_id" :items="sections"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.office_id" :items="offices"></v-select>
                        </v-col>
                    </v-row>

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="updateAsset">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAsset" persistent max-width="800px">
        <v-card>
            <v-card-title class="blue  white--text">
                <span class="text-h5">Edit Asset</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialogAsset = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Firstname" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.fname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Middlename" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.mname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Lastname" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.lname"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="email" label="Email" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.email"></v-text-field>
                        </v-col>Price
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Phone" color="blue " class="rounded-lg" outlined dense required v-model="assetEdit.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.section_id" :items="sections"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="assetEdit.office_id" :items="offices"></v-select>
                        </v-col>
                    </v-row>

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="updateAsset">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>


    <h2 class="mx-3 my-3">Assets</h2>
    <v-card class=" rounded-lg my-5" elevation="24">
        <v-card-title class="text-center justify-center py-6">
           
        </v-card-title>
        <v-tabs v-model="tab" background-color="transparent"  grow>
            <v-tab v-for="assettab in assettabs" :key="assettab" class="">
            <v-icon>mdi-table</v-icon> {{ assettab }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(assettab,i) in assettabs" :key="i">
                <template v-if="assettab === 'Electronics'">
                <v-card>
                    <v-card-text>

                    <v-tabs vertical>
                        <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-laptop
                            </v-icon>
                            <span class="tab-label">Computers</span>
                        </v-tab>
                        <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-phone-classic
                            </v-icon>
                            <span class="tab-label">Phones</span>
                        </v-tab>
                        <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-television-classic
                            </v-icon>
                            <span class="tab-label">Televisions</span>
                        </v-tab>
                        
                        <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-printer
                            </v-icon>
                            <span class="tab-label">Printers</span>
                        </v-tab>
                        <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-harddisk
                            </v-icon>
                            <span class="tab-label"> Disks</span>
                        </v-tab>
                        <!-- <v-tab class="my-5 btn">
                            <v-icon left>
                                mdi-fridge
                            </v-icon>
                            <span class="tab-label">Dispenser</span>
                        </v-tab> -->

                        <v-tab-item>
                            <v-card class="rounded-lg" elevation="0">
                                <v-card-text>
                                    <computer></computer>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <phone></phone>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <television></television>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <printer></printer>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <disk></disk>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                    </v-card-text>
                </v-card>
                </template>
                <template v-if="assettab === 'Furniture'">
                <v-card>
                   <v-card-text>
                    <furniture></furniture>
                   </v-card-text>
                </v-card>
                </template>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</v-container>
</template>

<script>
import axios from 'axios';
import Television from '@/components/Asset/Television.vue'
import Printer from '@/components/Asset/Printer.vue'
import Phone from '@/components/Asset/Phone.vue'
import Computer from '@/components/Asset/Computer.vue'
import Disk from '@/components/Asset/Disk.vue'
import Furniture from '@/components/Asset/Furniture.vue'
import {
    computerOptions,
    categoryOptions,
    electronicOptions,
} from '@/json/enum'
export default {
    name: 'Asset',
    components: {
        Television,
        Printer,
        Phone,
        Computer,
        Disk,
        Furniture
    },
    data() {
        return {
            tab: null,
            assettabs: [
                'Electronics', 'Furniture',
            ],
           
            dialog: false,
            computerOptions,
            categoryOptions,
            electronicOptions,
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
            asset: {
                category: '',
                user_id: '',
                subcategory: '',
                model: '',
                brand: '',
                serial_no: '',
                office_id: '',
                purchase_date: '',
                purchasing_price: '',
            },

            headers: [{
                    text: 'Category',
                    value: 'asset.category',
                },
                {
                    text: 'Sub Category',
                    value: 'asset.subcategory',
                },
                {
                    text: 'Computer Type',
                    value: 'computer_type',
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
                    text: 'Staff',
                    value: 'staff.name',
                },

                {
                    text: 'Action',
                    value: 'actions'
                }

            ],
            pheaders: [{
                    text: 'Category',
                    value: 'asset.category',
                },
                {
                    text: 'Sub Category',
                    value: 'asset.subcategory',
                },
                {
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
                    text: 'Staff',
                    value: 'staff.name',
                },

                {
                    text: 'Action',
                    value: 'actions'
                }

            ],

        }
    },

    computed: {
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },

        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.assets.length ? this.assets.length : end;
        },
        filteredAssets() {
            return this.assets.filter(asset => asset.asset.subcategory === 'Computer');
        },
        filteredPhone() {
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
        async updateAsset() {

            this.isLoading = true
            await axios.post(
                    "/asset-update/" + this.assetEdit.id, {
                        name: this.assetEdit.name,
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
    /* .tab-label {
        display: none;
    } */
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
