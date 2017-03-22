<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th v-if="isStockOrBond">Symbol</th>
                    <th v-if="isStockOrBond">Number of Shares</th>
                    <th v-if="isStockOrBond">Share Price</th>
                    <th v-if="isRealEstate">Address</th>
                    <th v-if="isRealEstate">City</th>
                    <th v-if="isRealEstate">State</th>
                    <th v-if="isRealEstate">Zip</th>
                    <th>Value</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <asset v-for="asset in assets" v-bind:assetModel="asset"></asset>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <label>Name</label><input v-model="name"></input>
        </div>
        <div v-if="isStockOrBond">
            <div>
                <label>Symbol</label><input v-model="symbol"></input>
            </div>
            <div>
                <label>NumShares</label><input v-model="numShares"></input>
            </div>
        </div>
        <div v-if="isRealEstate">
            <div>
                <label>Address</label><input v-model="address"></input>
            </div>
            <div>
                <label>City</label><input v-model="city"></input>
            </div>
            <div>
                <label>State</label><input v-model="state"></input>
            </div>
            <div>
                <label>Zip</label><input v-model="zip"></input>
            </div>
        </div>
        <div v-if="isCash">
            <label>Value</label><input v-model="value"></input>
        </div>
        <button v-on:click.prevent=addAsset>Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
    import api from '../api'
    import assetTypes from '../assetTypes'
    import Asset from './Asset.vue'

    export default {
        name: 'AssetList',
        components: {
            'asset': Asset
        },
        data: function () {
            return {
                name: '',
                symbol: '',
                numShares: 0,
                sharePrice: 0,
                address: '',
                city: '',
                state: '',
                zip: '',
                value: 0,
                error: null,
                isCash: this.assetTypeArray.includes(assetTypes.Cash),
                isRealEstate: this.assetTypeArray.includes(assetTypes.RealEstate),
                isStockOrBond: !this.assetTypeArray.includes(assetTypes.Cash) && !this.assetTypeArray.includes(assetTypes.RealEstate)
            }
        },
        props: ['assetTypeArray'],
        computed: {
            assets() {
                return this.$store.getters.assetsByType(this.assetTypeArray)
            }
        },
        methods: {
            addAsset: function () {
                var newAsset = {
                    assetType: this.assetTypeArray[0],
                    name: this.name,
                    symbol: this.symbol,
                    numShares: this.numShares,
                    sharePrice: this.sharePrice,
                    address: this.address,
                    city: this.city,
                    state: this.state,
                    zip: this.zip,
                    value: this.value
                }
                api.addAsset(newAsset).then((addedAsset) => {
                    this.$store.commit('addAsset', addedAsset)
                }).catch((error) => {
                    this.error = error
                })
            }
        }
    }

</script>

<style scoped>
    label {
        display: inline-block;
        width: 100px;
    }
    
    input {
        width: 200px;
    }
</style>