<template>
<v-container fluid class="message my-5">
    <div class="text-center">
        <!-- Center horizontally -->
        <v-alert v-if="successMessage" v-model="successMessage" color="green" dismissible danse text @input="reloadPage">
            <div class="text-h6">{{ successMessage }} </div>
        </v-alert>
        <v-alert v-if="errorMessage" v-model="errorMessage" color="red" dismissible dense text @input="reloadPage">
            <div class="text-h6"> {{ errorMessage }} </div>
        </v-alert>
    </div>
    <v-card class="rounded-lg" elevation="20">
        <v-card-title class="light-blue lighten-5">
            <v-spacer></v-spacer>
            <v-icon color="blue" class="mx-3" size="40" elevation="20">mdi-plus-circle</v-icon>
            <h4 class="text-h5 blue--text "> Fill in Asset Information here</h4>
            <v-spacer></v-spacer>
            <!-- <v-icon color="white" @click="dialog = false">mdi-close</v-icon> -->
        </v-card-title>
        <v-stepper v-model="step" class="my-5">
            <!-- Step 1 -->
            <v-stepper-header elevation="0">
                <v-stepper-step :complete="step > 1" step="1">Basic Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">Additional Details</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">Confirmation</v-stepper-step>
            </v-stepper-header>

            <!-- Step 1 Content -->
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-form ref="basicInfoForm" @submit.prevent="nextStep" class="my-5">
                        <v-row>
                            <v-col cols sm="4" md="4" lg="4">
                                <v-select label="--Category--" class="rounded-lg" outlined dense :items="categoryOptions" v-model="asset.category" :rules="categoryRules"></v-select>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Asset Tag (NIDC*0...)" color="blue " class="rounded-lg" outlined dense required v-model="asset.asset_tag" :rules="tagRules"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="number" label="Purchasing Price" color="blue " class="rounded-lg" outlined dense required v-model="asset.purchasing_price" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="date" label="Purchased Date" color="blue " :max="maxDate" class="rounded-lg" outlined dense required v-model="asset.purchase_date"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-select label="--Condition--" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="asset.condition" :items="conditionOptions"></v-select>
                            </v-col>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.category=='Electronic'">
                                <v-select label="--Electronics--" class="rounded-lg" outlined dense :items="electronicOptions" v-model="asset.subcategory"></v-select>
                            </v-col>
                        </v-row>

                        <v-btn @click="nextStep" class="float-end rounded-lg btn white--text" color="blue">Next</v-btn>
                    </v-form>
                </v-stepper-content>

                <!-- Step 2 Content -->
                <v-stepper-content step="2">
                    <v-form ref="additionalInfoForm" @submit.prevent="nextStep">
                        <v-row>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Computer'">
                                <v-select label="--Computer Type--" class="rounded-lg" outlined dense :items="computerOptions" v-model="asset.computer_type" append-icon="mdi-laptop"></v-select>
                            </v-col>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.computer_type=='Desktop' && asset.subcategory=='Computer'">
                                <v-text-field type="text" label="Monitor Size(Inch)" color="blue " class="rounded-lg" outlined dense required v-model="asset.monitor_size"></v-text-field>
                            </v-col>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Computer'">
                                <v-textarea label="Accessories" class="rounded-lg" name="input-7-4" outlined dense v-model="asset.accessories"></v-textarea>
                            </v-col>

                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Phone'">
                                <v-select label="--Phone Type--" class="rounded-lg" outlined dense :items="phoneOptions" v-model="asset.phone_type" append-icon="mdi-phone"></v-select>
                            </v-col>

                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Television'">
                                <v-text-field type="text" label="Size(Inch)" color="blue " class="rounded-lg" outlined dense required v-model="asset.size"></v-text-field>
                            </v-col>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Disk'">
                                <v-select label="--Disk Type--" class="rounded-lg" outlined dense :items="diskOptions" v-model="asset.disk_type"></v-select>
                            </v-col>
                            <v-col cols sm="4" md="4" lg="4" v-if="asset.subcategory=='Disk'">
                                <v-text-field type="text" label="Disk Capacity(GB/TB)" color="blue " class="rounded-lg" outlined dense required v-model="asset.disk_size"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="asset.category=='Electronic'">
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Brand" color="blue " class="rounded-lg" outlined dense required v-model="asset.chapa"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Model" color="blue " class="rounded-lg" outlined dense required v-model="asset.modeli"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Serial Number" color="blue " class="rounded-lg" outlined dense required v-model="asset.serial_no" :rules="serialRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="asset.category=='Furniture'">
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-select label="--Furniture Type--" class="rounded-lg" outlined dense :items="furnitureOptions" v-model="asset.furniture_type"></v-select>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-select label="--Furniture Material(s)--" class="rounded-lg" outlined dense :items="materialOptions" v-model="asset.material"></v-select>
                            </v-col>
                            <!-- <v-col cols="12" sm="4" md="4" lg="4">
                                <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="asset.office_id" :items="offices"></v-select>
                            </v-col> -->
                        </v-row>
                        <v-row v-if="asset.category=='Vehicle'">
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Brand" color="blue " class="rounded-lg" outlined dense required v-model="asset.brand"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Model" color="blue " class="rounded-lg" outlined dense required v-model="asset.model"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="cheses No" color="blue " class="rounded-lg" outlined dense required v-model="asset.cheses_no"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="asset.category=='Vehicle'">
                            <v-col cols="12" sm="4" md="4" lg="4">
                                <v-text-field type="text" label="Registration Number" color="blue " class="rounded-lg" outlined dense required v-model="asset.computer_type"></v-text-field>
                            </v-col>

                        </v-row>
                        <v-btn @click="prevStep" class="btn rounded-lg white--text" color="blue">Previous</v-btn>
                        <v-btn @click="nextStep" class="float-end btn rounded-lg white--text" color="blue">Next</v-btn>
                    </v-form>
                </v-stepper-content>

                <!-- Step 3 Content -->
                <v-stepper-content step="3">
                    <v-form ref="asset" @submit.prevent="addAsset">
                        <div>
                            <v-alert text dense color="blue" class="text-h6 mx-8" border="left">
                                Asset information has been successfully filled.You can now click the Submit button to send data.
                            </v-alert>
                        </div>
                        <v-btn @click="prevStep" class="rounded-lg white--text btn rounded-lg" color="blue">Previous</v-btn>
                        <v-btn @click="addAsset" class="float-end rounded-lg white--text btn rounded-lg" color="blue">Submit</v-btn>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-card>

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
                <v-btn color="blue " elevation="0" @click="confirmDialogVisible = false" class="rounded-lg btn white--text">Cancel</v-btn>
                <v-btn color="red" elevation="0" @click="deleteAsset" class="rounded-lg btn white--text">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import axios from 'axios';
import {
    computerOptions,
    categoryOptions,
    electronicOptions,
    conditionOptions,
    phoneOptions,
    diskOptions,
    furnitureOptions,
    materialOptions

} from '@/json/enum'
export default {
    name: 'Asset',
    components: {
        // Loader
    },
    data() {
        return {
            dialog: false,
            computerOptions,
            categoryOptions,
            electronicOptions,
            conditionOptions,
            furnitureOptions,
            materialOptions,
            phoneOptions,
            diskOptions,
            dialogDelete: false,
            successMessage: '', // Initialize as empty
            errorMessage: '', // Initialize as empty
            assets: [],
            sections: [],
            offices: [],
            staffs: [],
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
            myModel: '',
      rules: {
        required: (value) => !!value || 'This field is required',
      },
            step: 1,
            asset: {
                category: '',
                user_id: '',
                subcategory: '',
                model: '',
                cheses_no: '',
                brand: '',
                modeli: '',
                chapa: '',
                computer_type: '',
                phone_type: '',
                serial_no: '',
                office_id: '',
                staff_id: '',
                purchase_date: '',
                purchasing_price: '',
            },

            headers: [{
                    text: 'Firstname',
                    value: 'fname',
                },
                {
                    text: 'Middlename',
                    value: 'mname',
                },
                {
                    text: 'Lastname',
                    value: 'lname',
                },
                {
                    text: 'Phone',
                    value: 'phone',
                },
                {
                    text: 'Email',
                    value: 'email',
                },
                {
                    text: 'Section',
                    value: 'section.name',
                },
                {
                    text: 'Office',
                    value: 'office.name',
                },
                {
                    text: 'Action',
                    value: 'actions'
                }

            ],

        }
    },
    watch: {
        'asset.subcategory': function (newSubcategory) {
            console.log('Subcategory changed:', newSubcategory);
            if (newSubcategory === 'Computer') {
                console.log('Resetting computer_type');
                this.asset.computer_type = '';
            } else if (newSubcategory === 'Phone') {
                console.log('Resetting phone_type');
                this.asset.phone_type = '';
            }
        }
    },

    computed: {

        tagRules() {
            return [v => !!v || 'Tag is required'];
        },
        serialRules() {
            return [v => !!v || 'Serial Number is required'];
        },
        dateRules() {
            return [v => !!v || 'Date required'];
        },
        categoryRules() {
            return [v => !!v || 'Category is required'];
        },
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },

        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.assets.length ? this.assets.length : end;
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
        nextStep() {
            // Reference to the current form based on the step
            const currentForm = this.step === 1 ? this.$refs.basicInfoForm : this.$refs.additionalInfoForm;
            // Validate the current form
            if (currentForm.validate()) {
                // Move to the next step only if validation succeeds
                this.step += 1;
            } else {
                // If validation fails, you may want to show an error message or take appropriate action
            }
        },
        prevStep() {
            this.step -= 1;
        },

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
        fetchData() {
            this.isLoading = true
            axios.get('/asset-list')
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
            axios.get('/staff-list')
                .then(response => {
                    this.staffs = response.data.data
                    console.log(this.staffs)
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
            if (this.$refs.asset.validate()) {
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
            }
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
.v-label {
  position: relative;
}

.required-star {
  color: red;
  position: absolute;
  top: 5px;
  right: -10px;
}
.pagination-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    /* Adjust margin as needed */
}
</style>
