<template>
    <div>
        <p>Asset Breakdown</p>
        <table>
            <tr>
                <td class="asset-breakdown-title">All Assets</td>
                <tr>
                    <td>Total Cash</td>
                    <td class="align-right">{{ totalCashFormatted }}</td>
                    <td class="align-right">{{ percentCash }}</td>
                </tr>
                <tr>
                    <td>Total Real Estate (Equity)</td>
                    <td class="align-right">{{ totalRealEstateFormatted }}</td>
                    <td class="align-right">{{ percentRealEstate }}</td>
                </tr>
                <tr>
                    <td>Total Stock</td>
                    <td class="align-right">{{ totalStockFormatted }}</td>
                    <td class="align-right">{{ percentStock }}</td>
                </tr>
                <tr>
                    <td>Total Bonds</td>
                    <td class="align-right">{{ totalBondsFormatted }}</td>
                    <td class="align-right">{{ percentBonds }}</td>
                </tr>
                <tr>
                    <td class="asset-breakdown-title">Stocks Breakdown</td>
                </tr>
                <tr>
                    <td>Total Domestic</td>
                    <td class="align-right">{{ totalDomesticStockFormatted }}</td>
                    <td class="align-right">%</td>
                </tr>
                <tr>
                    <td>Total International</td>
                    <td class="align-right">{{ totalInternationalStockFormatted }}</td>
                    <td class="align-right">%</td>
                </tr>
                <tr>
                    <td class="asset-breakdown-title">Bonds Breakdown</td>
                </tr>
                <tr>
                    <td>Total Domestic</td>
                    <td class="align-right">{{ totalDomesticBondFormatted }}</td>
                    <td class="align-right">%</td>
                </tr>
                <tr>
                    <td>Total International</td>
                    <td class="align-right">{{ totalInternationalBondFormatted }}</td>
                    <td class="align-right">%</td>
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
                return this.$store.getters.totalCash
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
                var percentCash = 0
                if (this.$store.getters.totalAssetEquity !== 0) {
                    percentCash = this.totalCash / this.$store.getters.totalAssetEquity
                }
                return (percentCash * 100).toFixed(2) + '%'
            },
            percentBonds() {
                var percentBonds = 0
                if (this.$store.getters.totalAssetEquity !== 0) {
                    percentBonds = this.totalBonds / this.$store.getters.totalAssetEquity
                }
                return (percentBonds * 100).toFixed(2) + '%'
            },
            percentStock() {
                var percentStock = 0
                if (this.$store.getters.totalAssetEquity !== 0) {
                    percentStock = this.totalStock / this.$store.getters.totalAssetEquity
                }
                return (percentStock * 100).toFixed(2) + '%'
            },
            percentRealEstate() {
                var percentRealEstate = 0
                if (this.$store.getters.totalAssetEquity !== 0) {
                    percentRealEstate = this.totalRealEstate / this.$store.getters.totalAssetEquity
                }
                return (percentRealEstate * 100).toFixed(2) + '%'
            }
        }
    }

</script>

<style scoped=true>
    td.asset-breakdown-title {
        column-span: 3;
        text-align: center;
        font-weight: bold;
    }
</style>