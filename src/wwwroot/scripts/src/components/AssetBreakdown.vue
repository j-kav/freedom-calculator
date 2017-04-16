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
                <td>{{ totalDomesticStockFormatted }}</td>
            </tr>
            <tr>
                <td>Total International</td>
                <td>{{ totalInternationalStockFormatted }}</td>
            </tr>
        </table>
        <p>Bonds Breakdown</p>
        <table>
            <tr>
                <td>Total Domestic</td>
                <td>{{ totalDomesticBondFormatted }}</td>
            </tr>
            <tr>
                <td>Total International</td>
                <td>{{ totalInternationalBondFormatted }}</td>
            </tr>
        </table>
        <router-link v-if="$store.state.isLoggedIn" to="/statistics">Back to Statistics</router-link>
    </div>
</template>

<script>
    import assetTypes from '../assetTypes'
    import utils from '../utils'

    export default {
        name: 'AssetBreakdown',
        computed: {
            totalCash() {
                let totalCash = 0
                const cashAssets = this.$store.getters.assetsByType([assetTypes.Cash])
                for (const cashAsset of cashAssets) {
                    totalCash += cashAsset.value
                }
                return utils.usdFormmater.format(totalCash)
            },
            totalRealEstate() {
                let totalRealEstate = 0
                const realEstateAssets = this.$store.getters.assetsByType([assetTypes.RealEstate])
                for (const realEstateAsset of realEstateAssets) {
                    totalRealEstate += realEstateAsset.equity
                }
                return utils.usdFormmater.format(totalRealEstate)
            },
            totalDomesticStock() {
                let totalStock = 0
                const stockAssets = this.$store.getters.assetsByType([assetTypes.DomesticStock])
                for (const stockAsset of stockAssets) {
                    totalStock += stockAsset.value
                }
                return totalStock
            },
            totalDomesticStockFormatted() {
                return utils.usdFormmater.format(this.totalDomesticStock)
            },
            totalInternationalStock() {
                let totalStock = 0
                const stockAssets = this.$store.getters.assetsByType([assetTypes.InternationalStock])
                for (const stockAsset of stockAssets) {
                    totalStock += stockAsset.value
                }
                return totalStock
            },
            totalInternationalStockFormatted() {
                return utils.usdFormmater.format(this.totalInternationalStock)
            },
            totalStock() {
                return utils.usdFormmater.format(this.totalDomesticStock + this.totalInternationalStock)
            },
            totalDomesticBond() {
                let totalBond = 0
                const bondAssets = this.$store.getters.assetsByType([assetTypes.DomesticBond])
                for (const bondAsset of bondAssets) {
                    totalBond += bondAsset.value
                }
                return totalBond
            },
            totalDomesticBondFormatted() {
                return utils.usdFormmater.format(this.totalDomesticBond)
            },
            totalInternationalBond() {
                let totalBond = 0
                const bondAssets = this.$store.getters.assetsByType([assetTypes.InternationalBond])
                for (const bondAsset of bondAssets) {
                    totalBond += bondAsset.value
                }
                return totalBond
            },
            totalInternationalBondFormatted() {
                return utils.usdFormmater.format(this.totalInternationalBond)
            },
            totalBond() {
                return utils.usdFormmater.format(this.totalDomesticBond + this.totalInternationalBond)
            }
        }
    }
</script>