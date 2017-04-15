<template>
    <div>
        <p>Asset Breakdown</p>
        <p>All Assets</p>
        <table>
            <tr>
                <td>Total Cash</td>
                <td>{{ totalCash }}</td>
            </tr>
            <tr>
                <td>Total Real Estate (Equity)</td>
                <td>{{ totalRealEstate }}</td>
            </tr>
            <tr>
                <td>Total Stock</td>
                <td>{{ totalStock }}</td>
            </tr>
        </table>
        <p>Stocks Breakdown</p>
        <table>
            <tr>
                <td>Total Domestic</td>
                <td>{{ totalDomesticStock }}</td>
            </tr>
            <tr>
                <td>Total International</td>
                <td>{{ totalInternationalStock }}</td>
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
            },
            totalRealEstate() {
                let totalRealEstate = 0
                const realEstateAssets = this.$store.getters.assetsByType([assetTypes.RealEstate])
                for (const realEstateAsset of realEstateAssets) {
                    totalRealEstate += realEstateAsset.equity
                }
                return totalRealEstate
            },
            totalDomesticStock() {
                let totalStock = 0
                const stockAssets = this.$store.getters.assetsByType([assetTypes.DomesticStock])
                for (const stockAsset of stockAssets) {
                    totalStock += stockAsset.value
                }
                return totalStock
            },
            totalInternationalStock() {
                let totalStock = 0
                const stockAssets = this.$store.getters.assetsByType([assetTypes.InternationalStock])
                for (const stockAsset of stockAssets) {
                    totalStock += stockAsset.value
                }
                return totalStock
            },
            totalStock() {
                return this.totalDomesticStock + this.totalInternationalStock
            }
        }
    }
</script>