<template>
<v-list rounded class="custom-list">
    <v-list-item-group color="blue lighten-1" >
        <template v-if="authenticated">

            <v-list-item v-for="(item, i) in items" :key="i" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(item, i) in sections" :key="i" router :to="item.route" >
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(item, i) in offices" :key="i" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(item, i) in staff" :key="i" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-group prepend-icon="mdi-basket" no-action color="blue lighten-1" append-icon="mdi-chevron-right" >
                <template v-slot:activator>
                    <v-list-item-title>Assets </v-list-item-title>
                </template>

                <v-list-item v-for="([title, icon,path], i) in product" :key="i" link router :to="path" color="blue lighten-1">
                    <v-list-item-icon>
                        <v-icon>{{icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{title}}</v-list-item-title>
                </v-list-item>
            </v-list-group>
            <v-list-group prepend-icon="mdi-file" no-action color="blue lighten-1" append-icon="mdi-chevron-right" >
                <template v-slot:activator>
                    <v-list-item-title>Report </v-list-item-title>
                </template>

                <v-list-item v-for="([title, icon,path], i) in report" :key="i" link router :to="path" color="blue lighten-1">
                    <v-list-item-icon>
                        <v-icon>{{icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{title}}</v-list-item-title>
                </v-list-item>
            </v-list-group>
            <v-list-item v-for="(item, i) in report" :key="i" router :to="item.route">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.text}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          
        </template>
    </v-list-item-group>

</v-list>
</template>

    
    
<script>
import axios from 'axios';
import {
    mapGetters
} from 'vuex'
export default {
    name: 'Sidebar',
    data: () => ({
        dialog: false,
        change_password: {
            old_password: '',
            new_password: '',
            confirm_password: '',
        },
        confirmPasswordRules: [
            (v) => !!v || 'Confirm password is required',
            (v) => v === this.change_password.new_password || 'Passwords do not match',
        ],
        passwordErrorMessages: [],
       
        product: [
            ['Add Asset', 'mdi-plus', '/asset-store'],
            ['Assets list And Allocation', 'mdi-basket', '/asset-list'],
        ],
        report: [
            [' By Staff', 'mdi-plus', '/by-staff'],
            [' By Office', 'mdi-basket', '/by-office'],
            [' By Section', 'mdi-basket', '/by-section'],
        ],
        selectedItem: 1,
        items: [{
            text: 'Dashboard',
            icon: 'mdi-view-dashboard',
            route: '/dashboard'
        }],
        sections: [{
            text: 'Sections',
            icon: 'mdi-room-service-outline',
            route: '/section-list'
        }],
        offices: [{
            text: 'Offices',
            icon: 'mdi-room-service',
            route: '/office-list'
        }],
        staff: [{
            text: 'Staff',
            icon: 'mdi-account-group',
            route: '/staff-list'
        }],
       

    }),
    watch: {
        'change_password.confirm_password'(newValue) {
            this.passwordErrorMessages = [];
            if (newValue !== this.change_password.new_password) {
                this.passwordErrorMessages.push('Passwords do not match');
            }
        },
    },
    methods: {
        changePassword() {
            axios.post('/update-password', this.change_password)
                .then(response => {
                    this.$swal.fire({
                        icon: 'success',
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 2000
                    });
                })
                .catch(error => {
                    this.$swal.fire({
                        icon: 'error',
                        title: error.data.message,
                        text: error.message
                    });
                });
            this.dialog = false
        },
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    }
}
</script>
    
    
<style>
/* .custom-list .v-list-item,
    .custom-list .v-list-group { */
/* margin-top: 1px; */
/* You can adjust this value as needed */
/* margin-bottom: 1px; */
/* You can adjust this value as needed */
/* } */
</style>
