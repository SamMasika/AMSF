<template>
<v-app id="login">
    <v-main>
        <v-container class="fill-height top-background" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="6" lg="3">
                    <v-card class="elevation-20 rounded-xl color-gradient " color="rgba(255, 250, 255, 0.9)">
                        <v-window>
                            <v-window-item :value="1">
                                <v-row>
                                    <v-col cols="12" md="12">
                                        <v-card-text class="mt-1">
                                            <div class="" align="center">
                                                <v-img alt="Vuetify Logo" contain src="@/assets/logo.png" transition="scale-transition" width="200" />
                                            </div>
                                            <div class=" mt-5">
                                                <h1 class="text-center display-1 blue-grey--text text--darken-1">NIDC Assets Management System</h1>
                                            </div>
                                            <div class="mt-5">
                                                <v-form @submit.prevent="submit" ref="form">
                                                    <v-text-field label="Email"  class="mt-5 rounded-lg" outlined dense prepend-icon="person" type="email" id="email" color="blue lighten-1" v-model="form.email" :rules="emailRules" />

                                                    <v-text-field outlined dense class="mt-5 rounded-lg" v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" label="Password" prepend-icon="lock" :type="show1 ? 'text' : 'password'" color="blue lighten-1" @click:append="show1 = !show1" :rules="passwordRules"></v-text-field>
                                                    <div class="text-center py-5 mx-7">
                                                        <v-btn type="submit" block color="blue-grey darken-1 elevation-0" dark class="rounded-lg mt-2" :loading="loading">
                                                            <v-icon v-if="!loading">mdi-arrow-right-bottom-bold</v-icon>
                                                            <v-progress-circular indeterminate color="white" v-else> </v-progress-circular>
                                                            {{ loading ? 'LOADING...' : 'SIGN IN' }}
                                                        </v-btn>
                                                    </div>
                                                </v-form>
                                             </div>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-window-item>
                        </v-window>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-main>

</v-app>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';

export default {

    data: () => ({
        show1: false,
        loading: false,
        password: 'Password',
        form: {
            email: '',
            password: '',
        },
        inputRules: [
            v => v.length >= 2 || 'Minimum length is 2 characters'
        ]
    }),
    props: {
        source: String
    },
    computed: {

        emailRules() {
            return [v => !!v || 'Email is required'];
        },
        passwordRules() {
            return [v => !!v || 'Password required'];
        },
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            username: 'auth/userName',

        })
    },
    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        async submit() {
            this.loading = true;
            if (this.$refs.form.validate()) {
                const errorMessage = await this.login(this.form); // Fetch the error message
                if (errorMessage) {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: errorMessage,
                    }).then(() => {
                        // Close Swal popup, then stop loading animation
                        this.loading = false;
                    });
                } else {
                    this.$router.replace({
                        name: 'dashboard'
                    });
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Login Successful',
                        text: 'You are now logged in!',
                    }).then(() => {
                        // Close Swal popup, then stop loading animation
                        this.loading = false;
                    });
                }
            } else {
                this.loading = false;
            }
        },

    },
    destroyed() {
        this.loading = false; // Make sure the loading animation is stopped on popup close
    },

    mounted() {

    }
};
</script>

<style scoped>
#login {
    background: rgba(240, 242, 245, 0.9);
}

.top-background {
    /* background-image: url('@/assets/asset.jpg'); */
    background-color:#455A64;
    background-size: cover;
    background-position: top;

}

.overlay {
    position: relative;
}

.overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url('@/assets/hardware.png'); */
    background-size: cover;
    background-position: top;
    opacity: 0.7;
    /* Adjust the opacity value as desired for the overlay effect */
}
</style>
