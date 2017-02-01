<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th v-if="isStockOrBond">Symbol</th>
                    <th v-if="isStockOrBond">Number of Shares</th>
                    <th v-if="isStockOrBond">Share Price</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="asset in assets">
                    <td>{{ asset.name }}</td>
                    <td v-if="isStockOrBond">{{ asset.symbol }}</td>
                    <td v-if="isStockOrBond">{{ asset.numShares }}</td>
                    <td v-if="isStockOrBond">{{ asset.sharePrice }}</td>
                    <td>{{ asset.value }}</td>
                    <td><button v-on:click.prevent=removeAsset(asset.assetId)>Delete</button></td>
                    <td v-if="rowError" class="error">{{ rowError }}</td>
                </tr>
            </tbody>
        </table>
        <div>Add new</div>
        <div>
            <div>
                <label>Name</label><input v-model="name"></input>
            </div>
            <div v-if="isStockOrBond">
                <label>Symbol</label><input v-model="symbol"></input>
            </div>
            <div v-if="isStockOrBond">
                <label>NumShares</label><input v-model="numShares"></input>
            </div>
            <div v-if="isStockOrBond">
                <label>SharePrice</label><input v-model="sharePrice"></input>
            </div>
            <div>
                <label>Value</label><input v-model="value"></input>
            </div>
            <button v-on:click.prevent=addAsset>Submit</button>
            <div v-if="error" class="error">{{ error }}</div>
        </div>
    </div>
</template>
<script>
    import api from '../api'
    import assetTypes from '../assetTypes'

    export default {
        name: 'AssetList',
        data: function () {
            return {
                name: '',
                symbol: '',
                numShares: 0,
                sharePrice: 0,
                value: 0,
                error: null,
                rowError: null,
                isStockOrBond: this.assetTypeArray.includes(assetTypes.DomesticBond) ||
                this.assetTypeArray.includes(assetTypes.InternationalBond) ||
                this.assetTypeArray.includes(assetTypes.DomesticStock) ||
                this.assetTypeArray.includes(assetTypes.InternationalStock)
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
                    value: this.value
                }
                api.addAsset(newAsset).then((id) => {
                    newAsset.assetId = id
                    this.$store.commit('addAsset', newAsset)
                }).catch((error) => {
                    this.error = error
                })
            },
            removeAsset: function (id) {
                api.removeAsset(id).then(() => {
                    this.$store.commit('removeAsset', id)
                }).catch((error) => {
                    this.rowError = error
                })
            }
        }
    }
</script>

<style scoped>
    label {
        width: 200px;
    }
    input {
        width: 200px;
    }
</style>