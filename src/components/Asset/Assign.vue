<template>
<v-container fluid class="message mt-5">
    <v-card elevation="0" class="rounded-lg">
        <v-card-title class=" ">
            <span class="text-h6 text-bold">Assign Asset|<router-link to="/asset-list" style="text-decoration:none;" class="blue--text">
                    <v-icon color="blue">mdi-arrow-left-bold-circle</v-icon>Asset List
                </router-link> </span>
            <v-spacer></v-spacer>

        </v-card-title>
    </v-card>
    <v-card elevation="0" class="rounded-lg mt-2">
        <v-card-text>
            <v-form>
                <v-row class="mt-5">
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" outlined dense class="rounded-lg " label="Name" v-model="assign.name"></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4" md="4">
                        <v-select label="--Select Condition--" class="rounded-lg" outlined dense v-model="assign.status" :items="statusOptions">

                        </v-select>
                    </v-col>
                    <v-col cols="12" sm="4" md="4">
                        <v-text-field type="text" outlined dense class="rounded-lg " label="Staff" :value="request.user.name"></v-text-field>
                    </v-col>
                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" class="rounded-lg white--text btn" elevation="0" type="submit" @click="assignAsset">
                        Assign
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</v-container>
</template>

    
    
<script>
import axios from 'axios';
import moment from 'moment'
import {
    statusOptions,
} from '@/json/enums'
export default {
    name: 'Assign',
    props: ['id'],
    data() {

        return {
            statusOptions,
            assign: {
                status: '',
                user_id: '',
                name: ''
            },
            asset: null,
            staff: [],
            request: null,
            assetAssign: null
        }
    },

    mounted() {
        this.fetchItem()
        this.assign.name = this.asset.name;
    },
    methods: {
        fetchItem() {
            axios.get(`/assign-view/${this.id}`)
                .then(response => {
                    this.asset = response.data.data
                    this.staff = response.data.staff
                    this.request = response.data.request
                    //Assign
                    this.assign.name = this.asset.name
                    this.assign.status = this.asset.status
                    this.assign.user_id = this.request.user.id

                    console.log(this.asset)

                })
                .catch(error => {
                    console.log(error);
                });
        },
        formatDate(purchase_date) {
            return moment(purchase_date).format('DD/MMM/YYYY')
        },
        async assignAsset() {
            try {
                await axios.post(`asset-assign/${this.id}`, this.assign);

                setTimeout(() => {
                    this.$router.push('/asset-list');
                }, 0);

            } catch (e) {
                console.log(e);
            }
        }

    }

}
</script>
    
    
<style>
    
    </style>
