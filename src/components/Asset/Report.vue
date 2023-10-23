<template>
<v-container fluid>
    <h2 class="my-5 mx-8">Reports</h2>
    <v-card class="mx-auto" elevation="0">
        <v-row>
            <v-col cols md="4" sm="4" lg="4">
                <h4 class="text-center">
                    <v-icon size="30" color="green">mdi-domain</v-icon> Electronics
                </h4>
                <v-list rounded>
                    <v-list-item-group class="mx-8">
                        <router-link to="/pl-report" style="text-decoration: none; color: inherit;">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center blue--text"> Computers   <h3 class="green--text">{{computer }}</h3 ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <router-link to="/pl-report" style="text-decoration: none; color: inherit;">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center blue--text"> Phones   <h3 class="green--text">{{phone  }}</h3 ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <router-link to="/pl-report" style="text-decoration: none; color: inherit;">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center blue--text"> Television   <h3 class="green--text">{{tv  }}</h3 ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                        <router-link to="/pl-report" style="text-decoration: none; color: inherit;">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="text-center blue--text"> Disks   <h3 class="green--text">{{disk  }}</h3 ></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </router-link>
                     
                    </v-list-item-group>
                </v-list>
                
            </v-col>
            
            <v-col cols md="4" sm="4" lg="4">
                <!-- <h3 class="text-center">
                    <v-icon size="30">mdi-cart</v-icon>Sales
                </h3>
                <v-list rounded>
                    <v-list-item-group class="mx-8">
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="/sales-report" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Total Sales</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="/product-report" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Sales By Product </v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Sales By Customer</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Sales By Sales Person</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list> -->
            </v-col>
            <v-col cols md="4" sm="4" lg="4">
                <h3 class="text-center">
                    <v-icon size="30">mdi-basket</v-icon>Furniture
                </h3>
                <v-list rounded>
                    <v-list-item-group class="mx-8">
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Purchases By Supplier</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Purchases By Product </v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Expense Details</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Expenses By Category</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Expenses By Customer</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-content>
                                <router-link to="" style="text-decoration: none; color: inherit;">
                                    <v-list-item-title class="text-center blue--text">Billable Expenses Details</v-list-item-title>
                                </router-link>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>

        </v-row>
    </v-card>
</v-container>
</template>

    
    
<script>
import axios from 'axios';
export default {
    data(){
        return{
            computer:0,
            phone:0,
            tv:0,
            disk:0,
        }
    },
    

    methods:{
        fetchData() {
            axios.get('/electronics')
                .then(response => {
                    this.laptop = response.data.laptop;
                    this.desktop = response.data.desktop;
                    this.mobilephone = response.data.mobilephone;
                    this.landline = response.data.landline;
                    console.log(this.laptop)
                })
                axios.get('/asset-list')
                .then(response => {
                    this.computer = response.data.computer;
                    this.phone = response.data.phone;
                    this.tv = response.data.tv;
                    this.disk = response.data.disk;
                    console.log(this.laptop)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },

    mounted() {
        this.fetchData();

    },
}
</script>
