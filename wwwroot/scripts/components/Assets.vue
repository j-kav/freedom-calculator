<template>
    <div>
        <p>Assets</p>
        <div v-if="loading">
            Loading...
        </div>
        <div v-else>
            <div v-if="error">
                {{ error }}
            </div>
            <div v-else>
                <a v-on:click="selectCash">Cash</a>
                <a v-on:click="selectRealEstate">Real Estate</a>
                <a v-on:click="selectBonds">Bonds</a>
                <a v-on:click="selectStocks">Stocks</a>

                <div v-bind:class="{ activeAssetList: cashActive, inactiveAssetList: !cashActive }">
                    <b>cash</b>
                    <assetList v-bind:assetType='0'></assetList>
                </div>
                <div v-bind:class="{ activeAssetList: realEstateActive, inactiveAssetList: !realEstateActive }">
                    <b>real estate</b>
                    <assetList v-bind:assetType='1'></assetList>
                </div>
                <div v-bind:class="{ activeAssetList: bondsActive, inactiveAssetList: !bondsActive }">
                    <b>bonds</b>
                    <assetList v-bind:assetType='2'></assetList>
                </div>
                <div v-bind:class="{ activeAssetList: stocksActive, inactiveAssetList: !stocksActive }">
                    <b>stocks</b>
                    <assetList v-bind:assetType='3'></assetList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../api'
    import AssetList from './AssetList.vue'

    export default {
        name: 'Assets',
        components: {
            'assetList': AssetList
        },
        data: function () {
            return {
                loading: !this.$store.state.assets,
                error: null,
                cashActive: true,
                realEstateActive: false,
                bondsActive: false,
                stocksActive: false
            }
        },
        created() {
            if (!this.$store.state.assets) {
                this.getAssets()
            }
        },
        methods: {
            getAssets: function () {
                var self = this
                api.getAssets().then((data) => {
                    self.loading = false
                    self.$store.commit('setAssets', data)
                }).catch((error) => {
                    self.loading = false
                    self.error = error
                })
            },
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