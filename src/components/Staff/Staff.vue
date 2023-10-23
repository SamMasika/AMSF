<template>
<v-container fluid class="message">
    <div class="text-center">
        <!-- Center horizontally -->
        <v-alert v-if="successMessage" v-model="successMessage" type="success" dismissible shaped text class="my-4 custom-alert" @input="reloadPage">
            <div class="text-h6">{{ successMessage }} </div>
        </v-alert>
        <v-alert v-if="errorMessage" v-model="errorMessage" type="error" dismissible shaped text class="my-4 custom-alert" @input="reloadPage">
            <div class="text-h6"> {{ errorMessage }} </div>
        </v-alert>
    </div>

    <v-dialog v-model="dialog" persistent max-width="1000px">
        <template v-slot:activator="{ on, attrs }">
            <v-row class="header-row">
                <v-col cols="6">
                    <h1 class="mx-3 my-3">Staff</h1>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-btn class="white--text mx-5 btn rounded-lg" medium elevation="24" color="blue" @click="dialog = true" v-bind="attrs" v-on="on">
                        <v-icon>mdi-plus</v-icon>Add Staff
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <v-card class="rounded-lg">
            <v-card-title class="blue  white--text ">
                <span class="text-h5 ">Add Staff</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialog = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form @click.prevent="addStaff">
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Firstname" color="blue " class="rounded-lg" outlined dense required v-model="staff.fname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Middlename" color="blue " class="rounded-lg" outlined dense required v-model="staff.mname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Lastname" color="blue " class="rounded-lg" outlined dense required v-model="staff.lname"></v-text-field>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="email" label="Email" color="blue " class="rounded-lg" outlined dense required v-model="staff.email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Phone" color="blue " class="rounded-lg" outlined dense required v-model="staff.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="staff.section_id" :items="sections" :rules="unitRules"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>

                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="staff.office_id" :items="offices" :rules="unitRules"></v-select>
                        </v-col>

                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="addStaff">
                    Save
                </v-btn>
            </v-card-actions>

        </v-card>
    </v-dialog>
    <v-card class="mt-2 rounded-lg" elevation="24">
        <v-card-text>
            <v-row class="mt-3 mx-5">
                <v-col cols="12" sm="6" md="6" lg="6" class="mt-3">
                    <v-select v-model="itemsPerPage" :items="itemsPerPageOptions" label="Items per page" dense outlined class="custom-select"></v-select>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="3" md="3" lg="3" class="mt-3">
                    <v-text-field v-model="search" append-icon="mdi-magnify" outlined dense class="rounded-lg" color="blue " label="Search"></v-text-field>
                </v-col>
            </v-row>
            <v-data-table :headers="headers" :items="staffs" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer :search="search" class="elevation-0 mx-8" @page-count="pageCount = $event">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editStaff(item)" color="blue " title="Edit">
                        mdi-pencil
                    </v-icon>
                    <v-icon small @click="deleteDialog(item)" color="blue " title="Delete">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <v-row class="pagination-row mx-8">
                <v-col cols="6">
                    <p class="items-range">
                        Showing {{ startIndex }} - {{ endIndex }} out of {{ staffs.length }}
                    </p>
                </v-col>
                <v-col cols="6" class="text-right">
                    <v-pagination v-model="page" :length="pageCount" circle show-arrows="off" :total-visible="5" class="pagination-no-elevation" prev-icon="mdi-menu-left" next-icon="mdi-menu-right">
                    </v-pagination>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <v-dialog v-model="confirmDialogVisible" max-width="400px">
        <v-card class="rounded-xl" :elevation="24">
            <v-card-title class=" text-center">
            </v-card-title>
            <div class=" text-center">
                <v-icon size="80" color="red">mdi-delete-circle</v-icon>
            </div>
            <v-card-text class="text-h5 text--bold my-5 text-center " color="blue "> Are you sure you want to delete this <b class=""> {{ staffToDelete.name }}?</b> </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue " elevation="24" @click="confirmDialogVisible = false" class="rounded-lg btn white--text">Cancel</v-btn>
                <v-btn color="red" elevation="24" @click="deleteStaff" class="rounded-lg btn white--text">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialogStaff" persistent max-width="800px">
        <v-card>
            <v-card-title class="blue  white--text">
                <span class="text-h5">Edit Staff</span>
                <v-spacer></v-spacer>
                <v-icon color="white" @click="dialogStaff = false">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="my-5">
                <v-form>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Firstname" color="blue " class="rounded-lg" outlined dense required v-model="staffEdit.fname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Middlename" color="blue " class="rounded-lg" outlined dense required v-model="staffEdit.mname"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Lastname" color="blue " class="rounded-lg" outlined dense required v-model="staffEdit.lname"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="email" label="Email" color="blue " class="rounded-lg" outlined dense required v-model="staffEdit.email"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-text-field type="text" label="Phone" color="blue " class="rounded-lg" outlined dense required v-model="staffEdit.phone"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Section--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="staffEdit.section_id" :items="sections" :rules="unitRules"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="4" md="4" lg="4">
                            <v-select label="--Select Office--" item-text="name" class="rounded-lg" outlined dense item-value="id" color="blue lighten-1" v-model="staffEdit.office_id" :items="offices" :rules="unitRules"></v-select>
                        </v-col>
                    </v-row>

                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="blue  white--text btn rounded-lg" text elevation="24" type="submit" @click="updateStaff">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-container>
</template>

<script>
import axios from 'axios';
// import Loader from '@/components/loading/Loader.vue';
export default {
    name: 'staff',
    components: {
        // Loader
    },
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            successMessage: '', // Initialize as empty
            errorMessage: '', // Initialize as empty
            staffs: [],
            sections: [],
            offices: [],
            staffEdit: {},
            dialogStaff: false,
            confirmDialogVisible: false,
            staffToDelete: {},
            loading: true,
            page: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 20, 50],
            pageCount: 0,
            search: '',
            staff: {
                fname: '',
                mname: '',
                lname: '',
                email: '',
                phone: '',
                section_id: '',
                staff_id: '',
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

    computed: {
        startIndex() {
            return (this.page - 1) * this.itemsPerPage + 1;
        },

        endIndex() {
            const end = this.page * this.itemsPerPage;
            return end > this.staffs.length ? this.staffs.length : end;
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
        fetchData() {
            this.isLoading = true
            axios.get('/staff-list')
                .then(response => {
                    this.staffs = response.data.data
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

        addStaff() {
            axios
                .post('/staff-store', this.staff)
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

        //UpdateStaff
        editStaff(item) {
            this.staffEdit = item
            this.dialogStaff = true
        },
        async updateStaff() {

            this.isLoading = true
            await axios.post(
                    "/staff-update/" + this.staffEdit.id, {
                        name: this.staffEdit.name,
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
            this.dialogStaff = false

        },

        //DeleteStaff

        deleteStaff() {
            axios.delete(`staff-delete/${this.staffToDelete.id}`)
                .then(response => {
                    // Remove the item from the data arraythis.dialogStaff = true
                    const index = this.staffs.indexOf(this.staffToDelete);
                    if (index > -1) {
                        this.staffs.splice(index, 1);
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
            this.staffToDelete = item;
            this.confirmDialogVisible = true;

        },

    },
    mounted() {
        this.fetchData();

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
</style>
