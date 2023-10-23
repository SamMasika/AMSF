<template>
<div>
    <v-container fluid class="dashboard my-1">
        <Loader :loading="isLoading"></Loader>
        <v-row>
            <div class="mx-9">
                <h2 class="text-h6 ">{{ getGreeting() }} , <strong class="blue--text">{{ firstname }} {{ lastName }}</strong></h2>
            </div>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl " elevation="24" @mouseover="hover = true" @mouseleave="hover = false">
                    <v-card-text>
                        <div align="center" justify="center" class="my-2">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <v-avatar class="rounded-xl  blue accent-3 mx-5" size="50">
                                    <v-icon class="white--text">mdi-laptop</v-icon>
                                </v-avatar>
                                <span>
                                    <h2>{{laptop}}</h2>
                                    <h3 class=" blue--text">Laptops</h3>
                                </span>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-card class="rounded-xl " elevation="24" @mouseover="hover = true" @mouseleave="hover = false">
                    <v-card-text>
                        <div align="center" justify="center" class="my-2">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <v-avatar class="rounded-xl  blue accent-2 mx-5" size="50">
                                    <v-icon class="white--text">mdi-desktop-classic</v-icon>
                                </v-avatar>
                                <span>
                                    <h2>{{desktop}}</h2>
                                    <h3 class="blue--text">Desktops</h3>
                                </span>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">

                <v-card class="rounded-xl " elevation="24" @mouseover="hover = true" @mouseleave="hover = false">
                    <v-card-text>
                        <div align="center" justify="center" class="my-2">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <v-avatar class="rounded-xl  blue  mx-5" size="50">
                                    <v-icon class="white--text">mdi-cellphone</v-icon>
                                </v-avatar>
                                <span>
                                    <h2>{{mobilephone}}</h2>
                                    <h3 class="blue--text">Mobile Phones</h3>
                                </span>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col cols="12" sm="6" md="3">

                <v-card class="rounded-xl " elevation="24" @mouseover="hover = true" @mouseleave="hover = false">
                    <v-card-text>
                        <div align="center" justify="center" class="my-2">
                            <div style="display: flex; align-items: center; justify-content: center;">
                                <v-avatar class="rounded-xl  blue accent-2 mx-5" size="50">
                                    <v-icon class="white--text">mdi-phone-classic</v-icon>
                                </v-avatar>
                                <span>
                                    <h2>{{landline}}</h2>
                                    <h3 class="blue--text">Landline</h3>
                                </span>
                            </div>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>

        </v-row>

    </v-container>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import axios from 'axios';

export default {
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            userName: 'auth/userName',
            lastName: 'auth/lastName',
            firstname: 'auth/firstname'
        }),
    },

    components: {

    },
    data() {
        return {
            isLoading: false,
            assets: [],
            laptop: 0,
            desktop: 0,
            mobilephone: 0,
            landline: 0,
            hover: false,
            selectedDateRange: 'today',
        }
    },

    methods: {

        fetchData() {
            axios.get('/electronics')
                .then(response => {
                    this.laptop = response.data.laptop;
                    this.desktop = response.data.desktop;
                    this.mobilephone = response.data.mobilephone;
                    this.landline = response.data.landline;
                    console.log(this.laptop)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        handleDateRangeChange() {
            this.fetchData(this.selectedDateRange);
        },

        getGreeting() {
            const currentTime = new Date();
            const currentHour = currentTime.getHours();

            // Determine the greeting based on the current hour
            if (currentHour >= 5 && currentHour < 12) {
                return "Good morning";
            } else if (currentHour >= 12 && currentHour < 16) {
                return "Good afternoon";
            } else {
                return "Good evening";
            }
        },
    },

    mounted() {
        this.fetchData();

    },

}
</script>

<style scoped>
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.card {
    transition: box-shadow 0.3s ease-in-out;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    /* Add this line */
    margin: 0 auto;
    /* Add this line */
}

.card-hover {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.4);
}
</style>
