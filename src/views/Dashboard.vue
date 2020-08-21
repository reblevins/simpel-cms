<template>

<div class="dashboard">
    <h1>Dashboard</h1>
    <ul v-if="users.length > 0">
        <li v-for="user in users">{{ user.last_name }}</li>
    </ul>
</div>

</template>

<script>
import { Hub, Cache } from 'aws-amplify';
export default {
    name: 'Dashboard',
    data() {
        return {
            users: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            let response = await fetch('https://fcf0b2zyqj.execute-api.us-east-2.amazonaws.com/users', {
                credentials: 'omit',
                headers: {
                    'Authorization': 'Bearer ' + Cache.getItem('jwtToken')
                }
            })
            let json = await response.json()
            console.log(json);
            this.users = json.users
        }
    }
}
</script>

<style>

</style>
