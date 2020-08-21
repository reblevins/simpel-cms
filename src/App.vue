<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/dashboard">Dashboard</router-link> |
            <div v-if="signedIn">
                <amplify-sign-out></amplify-sign-out>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
import { Hub, Cache } from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
export default {
    data() {
        return {
            signedIn: false,
            token: null
        }
    },
    created() {
        Hub.listen('auth', (data) => {
            const { payload } = data;
            this.onAuthEvent(payload);
        })
        this.token = Cache.getItem('jwtToken');
        Auth.currentSession().then(obj => {
            console.log(obj);
            this.signedIn = obj !== null
        }).catch(err => {
            this.signedIn = false
            console.log(err);
        })
    },
    methods: {
        onAuthEvent(payload) {
            switch(payload.event) {
                case "signOut":
                    this.signedIn = false
                    this.token = null
                    if (this.$route.name != 'Home') this.$router.push({ name: 'Home' })
                    break;
                case "signIn":
                    console.log(payload);
                    Cache.setItem('jwtToken', payload.data.signInUserSession.accessToken.jwtToken)
                    this.token = payload.data.signInUserSession.accessToken.jwtToken
                    this.signedIn = true
                    console.log(this.signedIn);
                    this.$router.push(this.$route.query.redirect)
                    break;
            }
        }
    }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
