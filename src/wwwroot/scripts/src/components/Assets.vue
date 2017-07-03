<template>
    <div>
        <h2>Assets</h2>
        <div>
            <a v-on:click="selectCash">Cash</a>
            <a v-on:click="selectRealEstate">Real Estate</a>
            <a v-on:click="selectBonds">Bonds</a>
            <a v-on:click="selectStocks">Stocks</a>

            <div v-bind:class="{ activeAssetList: cashActive, inactiveAssetList: !cashActive }">
                <b>cash</b>
                <assetList v-bind:assetTypeArray="[assetTypes.Cash]"></assetList>
            </div>
            <div v-bind:class="{ activeAssetList: realEstateActive, inactiveAssetList: !realEstateActive }">
                <b>real estate</b>
                <assetList v-bind:assetTypeArray="[assetTypes.RealEstate]"></assetList>
            </div>
            <div v-bind:class="{ activeAssetList: bondsActive, inactiveAssetList: !bondsActive }">
                <b>bonds</b>
                <assetList v-bind:assetTypeArray="[assetTypes.DomesticBond, assetTypes.InternationalBond]"></assetList>
            </div>
            <div v-bind:class="{ activeAssetList: stocksActive, inactiveAssetList: !stocksActive }">
                <b>stocks</b>
                <assetList v-bind:assetTypeArray="[assetTypes.DomesticStock, assetTypes.InternationalStock]"></assetList>
            </div>
        </div>
    </div>
</template>

<script>
    import assetTypes from '../assetTypes'
    import AssetList from './AssetList.vue'

    export default {
        name: 'Assets',
        components: {
            'assetList': AssetList
        },
        data: function () {
            return {
                assetTypes: assetTypes,
                cashActive: true,
                realEstateActive: false,
                bondsActive: false,
                stocksActive: false
            }
        },
        methods: {
            selectCash: function () {
                this.cashActive = true
                this.realEstateActive = false
                this.bondsActive = false
                this.stocksActive = false
            },
            selectRealEstate: function () {
                this.cashActive = false
                this.realEstateActive = true
                this.bondsActive = false
                this.stocksActive = false
            },
            selectBonds: function () {
                this.cashActive = false
                this.realEstateActive = false
                this.bondsActive = true
                this.stocksActive = false
            },
            selectStocks: function () {
                this.cashActive = false
                this.realEstateActive = false
                this.bondsActive = false
                this.stocksActive = true
            }
        }
    }

</script>

<style scoped>
    .activeAssetList {
        display: block
    }
    
    .inactiveAssetList {
        display: none
    }
</style>