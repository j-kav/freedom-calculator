<template>
    <div>
        <div class="horizontal-scroll">
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
                        <th v-if="isRealEstate">Linked-Liability</th>
                        <th v-if="isRealEstate">Equity</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <asset v-for="asset in assets" :key="asset.assetId" v-bind:assetModel="asset" v-on:loading="childLoading"></asset>
                </tbody>
            </table>
        </div>
        <div v-if="loading">
            <modal>
                <h3 slot="header">Loading</h3>
                <loading slot="body"></loading>
                <div slot="footer">
                    <span>Please Wait..</span>
                </div>
            </modal>
        </div>
        <h3>Add new</h3>
        <div>
            <label>Name</label>
            <input v-model="name">
        </div>
        <div v-if="isStockOrBond">
            <div>
                <label>Symbol</label>
                <input v-model="symbol">
                <span class="symbol-message">Enter a stock or ETF. Mutual funds are not supported.</span>
            </div>
            <div>
                <label>Number of Shares</label>
                <input v-model="numShares">
            </div>
            <div v-if="isStock">
                <label>Type</label>
                <select v-model="assetType">
                    <option value="4">
                        Domestic Stock
                    </option>
                    <option value="5">
                        International Stock
                    </option>
                </select>
            </div>
            <div v-else>
                <label>Type</label>
                <select v-model="assetType">
                    <option value="2">
                        Domestic Bond
                    </option>
                    <option value="3">
                        International Bond
                    </option>
                </select>
            </div>
        </div>
        <div v-if="isRealEstate">
            <div>
                <label>Address</label>
                <input v-model="address">
            </div>
            <div>
                <label>City</label>
                <input v-model="city">
            </div>
            <div>
                <label>State</label>
                <input v-model="state">
            </div>
            <div>
                <label>Zip</label>
                <input v-model="zip">
            </div>
            <div>
                <label>Linked-Liability</label>
                <select v-model="liabilityId">
                    <option v-for="liability in $store.state.liabilities" :key="liability.liabilityId" v-bind:value="liability.liabilityId">
                        {{ liability.name }}
                    </option>
                </select>
            </div>
        </div>
        <div v-if="isCash">
            <label>Value</label>
            <input v-model="value">
        </div>
        <button v-on:click.prevent=addAsset>Submit</button>
        <div v-if="error" class="error">{{ error }}</div>
    </div>
</template>
<script>
import api from '../api'
import assetTypes from '../assetTypes'
import Asset from './Asset.vue'
import Modal from './Modal.vue'
import Loading from './Loading.vue'

export default {
    name: 'AssetList',
    components: {
        asset: Asset,
        modal: Modal,
        loading: Loading
    },
    data() {
        return {
            name: '',
            symbol: '',
            numShares: 0,
            sharePrice: 0,
            assetType: this.assetTypeArray[0],
            assetTypes: assetTypes,
            address: '',
            city: '',
            state: '',
            zip: '',
            value: 0,
            error: null,
            isCash: this.assetTypeArray.includes(assetTypes.Cash),
            isRealEstate: this.assetTypeArray.includes(assetTypes.RealEstate),
            isStockOrBond:
                !this.assetTypeArray.includes(assetTypes.Cash) &&
                !this.assetTypeArray.includes(assetTypes.RealEstate),
            isStock: this.assetTypeArray.includes(assetTypes.DomesticStock),
            liabilityId: null,
            loading: false
        }
    },
    props: ['assetTypeArray'],
    computed: {
        assets() {
            return this.$store.getters.assetsByType(this.assetTypeArray)
        }
    },
    methods: {
        async addAsset() {
            const newAsset = {
                assetType: this.assetType,
                name: this.name,
                symbol: this.symbol,
                numShares: this.numShares,
                sharePrice: this.sharePrice,
                address: this.address,
                city: this.city,
                state: this.state,
                zip: this.zip,
                value: this.value,
                liabilityId: this.liabilityId
            }
            this.loading = true
            try {
                const addedAsset = await api.addAsset(newAsset)
                this.$store.commit('addAsset', addedAsset)
                this.loading = false
            } catch (error) {
                this.error = error
                this.loading = false
            }
        },
        childLoading(isChildLoading) {
            this.loading = isChildLoading
        }
    }
}
</script>

<style scoped>
input {
    width: 200px;
}
.symbol-message {
    font-style: italic;
}
</style>