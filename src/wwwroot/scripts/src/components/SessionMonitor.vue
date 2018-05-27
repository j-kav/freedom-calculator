<template>
    <div>
        <modal v-if="showSessionTimingout" @close="extendSession()">
            <h3 slot="header">Session Timing Out</h3>
            <div slot="body">Your session is going to timeout. Click OK to extend.</div>
        </modal>
        <modal v-if="showSessionExpired" @close="endSession()">
            <h3 slot="header">Session Timed Out</h3>
            <div slot="body">Your session timed out. Click OK to login again.</div>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue'

export default {
    name: 'App',
    components: {
        modal: Modal
    },
    data() {
        return {
            showSessionTimingout: false,
            showSessionExpired: false
        }
    },
    computed: {
        lastActivityDateChanged() {
            return this.$store.state.authData.lastActivityDate
        }
    },
    watch: {
        lastActivityDateChanged(newDate, oldDate) {
            if (window.fcSessionTimingOutId) {
                clearTimeout(window.fcSessionTimingOutId)
            }
            if (window.fcSessionTimeoutId) {
                clearTimeout(window.fcSessionTimeoutId)
            }
            window.fcSessionTimingOutId = setTimeout(() => {
                this.showSessionTimingout = true
                window.fcSessionTimeoutId = setTimeout(() => {
                    this.showSessionTimingout = false
                    this.showSessionExpired = true
                }, 5 * 60 * 1000) // 5 min
            }, 15 * 60 * 1000) // 15 min
        }
    },
    methods: {
        extendSession() {
            this.showSessionTimingout = false
            this.$store.state.authData.lastActivityDate = new Date().getTime()
        },
        endSession() {
            this.showSessionExpired = false
            this.$store.commit('logout')
            this.$router.push('/login')
        }
    }
}
</script>