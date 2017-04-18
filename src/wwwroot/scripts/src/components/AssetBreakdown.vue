<template>
    <div>
        <p>Asset Breakdown</p>
        <p>All Assets</p>
        <table>
            <tr>
                <td>Total Cash</td>
                <td>{{ totalCashFormatted }}</td>
                <td>{{ percentCash }}</td>
            </tr>
            <tr>
                <td>Total Real Estate (Equity)</td>
                <td>{{ totalRealEstateFormatted }}</td>
                <td>{{ percentRealEstate }}</td>
            </tr>
            <tr>
                <td>Total Stock</td>
                <td>{{ totalStockFormatted }}</td>
                <td>{{ percentStock }}</td>
            </tr>
            <tr>
                <td>Total Bonds</td>
                <td>{{ totalBondsFormatted }}</td>
                <td>{{ percentBonds }}</td>
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
                return totalCash
            },
            totalCashFormatted() {
                return utils.usdFormmater.format(this.totalCash)
            },
            totalRealEstate() {
                let totalRealEstate = 0
                const realEstateAssets = this.$store.getters.assetsByType([assetTypes.RealEstate])
                for (const realEstateAsset of realEstateAssets) {
                    totalRealEstate += realEstateAsset.equity
                }
                return totalRealEstate
            },
            totalRealEstateFormatted() {
                return utils.usdFormmater.format(this.totalRealEstate)
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
                return this.totalDomesticStock + this.totalInternationalStock
            },
            totalStockFormatted() {
                return utils.usdFormmater.format(this.totalStock)
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
            totalBonds() {
                return this.totalDomesticBond + this.totalInternationalBond
            },
            totalBondsFormatted() {
                return utils.usdFormmater.format(this.totalBonds)
            },
            percentCash() {
                const percentCash = this.totalCash / this.$store.getters.totalAssetEquity
                return (percentCash * 100).toFixed(2) + '%'
            },
            percentBonds() {
                const percentBonds = this.totalBonds / this.$store.getters.totalAssetEquity
                return (percentBonds * 100).toFixed(2) + '%'
            },
            percentStock() {
                const percentStock = this.totalStock / this.$store.getters.totalAssetEquity
                return (percentStock * 100).toFixed(2) + '%'
            },
            percentRealEstate() {
                const percentRealEstate = this.totalRealEstate / this.$store.getters.totalAssetEquity
                return (percentRealEstate * 100).toFixed(2) + '%'
            }
        }
    }

</script>