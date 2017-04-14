<template>
    <div>
        <p>Asset Breakdown</p>
        <p>All Assets</p>
        <table>
            <tr>
                <td>Total Cash</td>
                <td>{{ totalCash }}</td>
            </tr>
        </table>
        <router-link v-if="$store.state.isLoggedIn" to="/statistics">Back to Statistics</router-link>
    </div>
</template>

<script>
    import assetTypes from '../assetTypes'

    export default {
        name: 'AssetBreakdown',
        computed: {
            totalCash() {
                let totalCash = 0
                const cashAssets = this.$store.getters.assetsByType([assetTypes.Cash])
                for (const cashAsset of cashAssets) {
                    totalCash += cashAsset.value
                }
                return totalCash
            }
        }
    }
</script>