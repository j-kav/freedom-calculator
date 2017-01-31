<template>
    <div>
        <p>{{ assetType }}</p>
        <table>
            <tr v-for="asset in assets">
                <td>{{ asset.name }}</td>
                <td>{{ asset.symbol }}</td>
                <td>{{ asset.numShares }}</td>
                <td>{{ asset.sharePrice }}</td>
                <td>{{ asset.value }}</td>
            </tr>
        </table>
        <div>Add new</div>
        <div>
            <div>
                <label>Name</label><input v-model="name"></input>
            </div>
            <div>
                <label>Symbol</label><input v-model="symbol"></input>
            </div>
            <div>
                <label>NumShares</label><input v-model="numShares"></input>
            </div>
            <div>
                <label>SharePrice</label><input v-model="sharePrice"></input>
            </div>
            <div>
                <label>Value</label><input v-model="value"></input>
            </div>
            <button v-on:click.prevent=addNewAsset>Submit</button>
            <div v-if="error" class="error">{{ error }}</div>
        </div>
    </div>
</template>
<script>
    // import assetTypes from '../assetTypes'
    // TODO list only the assets of the type passed to prop
    import api from '../api'

    export default {
        name: 'AssetList',
        data: function () {
            return {
                name: '',
                symbol: '',
                numShares: '',
                sharePrice: '',
                value: '',
                error: null
            }
        },
        props: ['assetType'],
        computed: {
            assets() {
                return this.$store.state.assets
            }
        },
        methods: {
            addNewAsset: function () {
                var newAsset = {
                    assetType: this.assetType,
                    name: this.name,
                    symbol: this.symbol,
                    numShares: this.numShares,
                    sharePrice: this.sharePrice,
                    value: this.value
                }
                api.addAsset(newAsset).then((id) => {
                    newAsset.id = id
                    this.$store.commit('addAsset', newAsset)
                }).catch((error) => {
                    this.error = error
                })
            }
        }
    }
</script>