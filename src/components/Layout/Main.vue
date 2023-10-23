<template>
<!-- App.vue -->

<v-app>

    <v-app-bar app color="blue-grey" elevation="0">
        <v-app-bar-nav-icon @click="drawer=!drawer" color="white"></v-app-bar-nav-icon>
        <!-- <h2 class="mx-8">Assets Management System</h2> -->
        <v-spacer></v-spacer>
        <!-- <v-avatar color="primary" size="20">8</v-avatar> -->

        <v-menu offset-y rounded-xl>
            <template v-slot:activator="{ on, attrs }">
                <v-chip medium v-bind="attrs" v-on="on" elevation="6" class="" >
                   <v-icon>mdi-account</v-icon>
                    {{ user.username }}
                    <v-icon >
                        mdi-menu-down
                    </v-icon>
                </v-chip>
            </template>
            <v-list rounded color="rgba(255, 255, 255, 1)">
                <v-list-item @click="showProfileDialog = true">
                    <v-icon color="blue lighten-1">
                        mdi-account
                    </v-icon>Profile
                    <v-list-text v-if="authenticated">
                    </v-list-text>
                </v-list-item>
                <router-link to="/change-password" style="text-decoration: none; color: inherit;">
                    <v-list-item>
                        <v-icon color="blue lighten-1">
                            mdi-lock-minus
                        </v-icon>Change Password
                        <v-list-text v-if="authenticated">
                        </v-list-text>
                    </v-list-item>
                </router-link>
                <v-list-item @click.prevent="logout">
                    <v-icon color="blue lighten-1">
                        mdi-arrow-right-bold-box-outline
                    </v-icon> Logout
                    <v-list-text v-if="authenticated">
                    </v-list-text>
                </v-list-item>
            </v-list>
        </v-menu>
        <v-dialog v-model="showProfileDialog" max-width="600px" align-end>
            <v-card :loading="loading" color="rgba(255, 255, 255, 0.9)">
                <template slot="progress">
                    <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
                </template>
                <v-card-title style="text-align: center;">Profile</v-card-title>
                <v-card-text align="center">
                    <div class="">
                        <v-icon size="100">mdi-account-circle</v-icon>
                    </div>
                    <div class="my-4 text-subtitle-1">
                        <!-- {{ username.name }}, {{username.email}} -->
                    </div>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
            </v-card>
        </v-dialog>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer"  responsive   >
        <!-- Sidebar content -->
        <v-list-item class="text-center my-5" color="blue lighten-1">
            <!-- Sidebar logo and title -->
            <v-list-item-content>
                <div class="" align="center">
                    <!-- <v-icon size="100" >mdi-account-circle</v-icon> -->
                    <v-img alt="Vuetify Logo" contain src="@/assets/logo.png" transition="scale-transition" width="130" />
                </div>
            </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <Sidebar />
    </v-navigation-drawer>

    <v-container fluid>
        <router-view></router-view>
    </v-container>
    <v-footer app>
        <v-container>
            <v-row class="text-center">
                <v-col cols="12">
                    {{ new Date().getFullYear() }} @ <strong>NIDC</strong>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</v-app>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
import Sidebar from '@/components/Layout/Sidebar.vue'

export default {
    name: 'App',
    components: {
        Sidebar,
    },

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            username: 'auth/userName',
            lastname: 'auth/lastName',
            firstname: 'auth/firstname',

        })
    },

    data: () => ({
        showProfileDialog: false,

        drawer: true,
        loaded: false,
        loading: false,
        isLoading: false,
    }),
    methods: {
        ...mapActions({
            logoutAction: 'auth/logout'
        }),
        logout() {

            this.logoutAction()
                .then(() => {
                    this.$router.replace({
                        name: 'login'
                    })
                })
        }
    },

};
</script>

<style>
body {
    font-family: 'Roboto Slab', sans-serif;
}

#app {
    background: rgb(224, 230, 233);
}

.background-container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    /* padding: 0; */
}

.background-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url("@/assets/stock.png"); */
    background-size: cover;
    background-position: center;
    z-index: -1;
    animation: moveBackground 30s linear infinite;
}

@keyframes moveBackground {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-100%);
    }
}

.footer {
    margin-top: auto;
}

.btn {
    text-transform: none !important;
    font-family: "Roboto", sans-serif;
    font-size: 60px;
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
</style>
