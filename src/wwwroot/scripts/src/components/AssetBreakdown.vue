<template>
    <div>
        <table>
            <tr>
                <td class="asset-breakdown-title">All Assets</td>
            </tr>
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
                <td class="asset-breakdown-title">Stocks vs Bonds Breakdown</td>
            </tr>
            <tr>
                <td>Stocks</td>
                <td class="align-right">{{ totalStockFormatted }}</td>
                <td class="align-right">{{ percentStockVsBonds }}</td>
            </tr>
            <tr>
                <td>Bonds</td>
                <td class="align-right">{{ totalBondsFormatted }}</td>
                <td class="align-right">{{ percentBondsVsStock }}</td>
            </tr>
            <tr>
                <td class="asset-breakdown-title">Stocks Breakdown</td>
            </tr>
            <tr>
                <td>Total Domestic</td>
                <td class="align-right">{{ totalDomesticStockFormatted }}</td>
                <td class="align-right">{{ percentDomesticStock }}</td>
            </tr>
            <tr>
                <td>Total International</td>
                <td class="align-right">{{ totalInternationalStockFormatted }}</td>
                <td class="align-right">{{ percentInternationalStock }}</td>
            </tr>
            <tr>
                <td class="asset-breakdown-title">Bonds Breakdown</td>
            </tr>
            <tr>
                <td>Total Domestic</td>
                <td class="align-right">{{ totalDomesticBondFormatted }}</td>
                <td class="align-right">{{ percentDomesticBonds }}</td>
            </tr>
            <tr>
                <td>Total International</td>
                <td class="align-right">{{ totalInternationalBondFormatted }}</td>
                <td class="align-right">{{ percentInternationalBonds }}</td>
            </tr>
        </table>
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
            return utils.usdFormatter.format(this.totalCash)
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
            return utils.usdFormatter.format(this.totalRealEstate)
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
            return utils.usdFormatter.format(this.totalDomesticStock)
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
            return utils.usdFormatter.format(this.totalInternationalStock)
        },
        totalStock() {
            return this.totalDomesticStock + this.totalInternationalStock
        },
        totalStockFormatted() {
            return utils.usdFormatter.format(this.totalStock)
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
            return utils.usdFormatter.format(this.totalDomesticBond)
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
            return utils.usdFormatter.format(this.totalInternationalBond)
        },
        totalBonds() {
            return this.totalDomesticBond + this.totalInternationalBond
        },
        totalBondsFormatted() {
            return utils.usdFormatter.format(this.totalBonds)
        },
        totalStockAndBonds() {
            return this.totalStock + this.totalBonds
        },
        percentCash() {
            let percentCash = 0
            if (this.$store.getters.totalAssetEquity !== 0) {
                percentCash = this.totalCash / this.$store.getters.totalAssetEquity
            }
            return (percentCash * 100).toFixed(2) + '%'
        },
        percentBonds() {
            let percentBonds = 0
            if (this.$store.getters.totalAssetEquity !== 0) {
                percentBonds = this.totalBonds / this.$store.getters.totalAssetEquity
            }
            return (percentBonds * 100).toFixed(2) + '%'
        },
        percentBondsVsStock() {
            let percentBonds = 0
            if (this.totalStockAndBonds !== 0) {
                percentBonds = this.totalBonds / this.totalStockAndBonds
            }
            return (percentBonds * 100).toFixed(2) + '%'
        },
        percentStock() {
            let percentStock = 0
            if (this.$store.getters.totalAssetEquity !== 0) {
                percentStock = this.totalStock / this.$store.getters.totalAssetEquity
            }
            return (percentStock * 100).toFixed(2) + '%'
        },
        percentStockVsBonds() {
            let percentStock = 0
            if (this.totalStockAndBonds !== 0) {
                percentStock = this.totalStock / this.totalStockAndBonds
            }
            return (percentStock * 100).toFixed(2) + '%'
        },
        percentRealEstate() {
            let percentRealEstate = 0
            if (this.$store.getters.totalAssetEquity !== 0) {
                percentRealEstate = this.totalRealEstate / this.$store.getters.totalAssetEquity
            }
            return (percentRealEstate * 100).toFixed(2) + '%'
        },
        percentDomesticStock() {
            let percentStock = 0
            if (this.totalStock !== 0) {
                percentStock = this.totalDomesticStock / this.totalStock
            }
            return (percentStock * 100).toFixed(2) + '%'
        },
        percentInternationalStock() {
            let percentStock = 0
            if (this.totalStock !== 0) {
                percentStock = this.totalInternationalStock / this.totalStock
            }
            return (percentStock * 100).toFixed(2) + '%'
        },
        percentDomesticBonds() {
            let percentBonds = 0
            if (this.totalBonds !== 0) {
                percentBonds = this.totalDomesticBond / this.totalBonds
            }
            return (percentBonds * 100).toFixed(2) + '%'
        },
        percentInternationalBonds() {
            let percentBonds = 0
            if (this.totalBonds !== 0) {
                percentBonds = this.totalInternationalBond / this.totalBonds
            }
            return (percentBonds * 100).toFixed(2) + '%'
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