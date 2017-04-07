<template>
    <tr>
        <td><input v-model="asset.name"></input></td>
        <td v-if="isStockOrBond">{{ asset.symbol }}</td>
        <td v-if="isStockOrBond">{{ asset.numShares }}</td>
        <td v-if="isStockOrBond">{{ asset.sharePrice }}</td>
        <td v-if="isRealEstate">{{ asset.address }}</td>
        <td v-if="isRealEstate">{{ asset.city }}</td>
        <td v-if="isRealEstate">{{ asset.state }}</td>
        <td v-if="isRealEstate">{{ asset.zip }}</td>
        <td v-if="isCash"><input v-model="asset.value"></input></td>
        <td v-else>{{ asset.value }}</td>
        <td v-if="isRealEstate">
            <select v-model="asset.liabilityId" v-on:change.prevent=updateEquity()>
                <option v-for="liability in $store.state.liabilities" v-bind:value="liability.liabilityId">
                     {{ liability.name }}
                 </option>
            </select>
        </td>
        <td v-if="isRealEstate">{{ asset.equity }}</td>
        <td><button v-on:click.prevent=updateAsset()>Update</button></td>
        <td><button v-on:click.prevent=removeAsset()>Delete</button></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
    import api from '../api'
    import assetTypes from '../assetTypes'

    export default {
        name: 'Asset',
        data: function () {
            return {
                error: false,
                message: null,
                asset: this.assetModel,
                isStockOrBond: this.assetModel.assetType === assetTypes.DomesticBond || this.assetModel.assetType === assetTypes.InternationalBond ||
                this.assetModel.assetType === assetTypes.DomesticStock || this.assetModel.assetType === assetTypes.InternationalStock,
                isRealEstate: this.assetModel.assetType === assetTypes.RealEstate,
                isCash: this.assetModel.assetType === assetTypes.Cash
            }
        },
        computed: {
            messageClass: function () {
                return {
                    'error': this.error,
                    'success': !this.error
                }
            }
        },
        props: ['assetModel'],
        methods: {
            updateEquity: function () {
                this.$store.commit('updateAsset', this.asset)
            },
            updateAsset: function () {
                api.updateAsset(this.asset.assetId, this.asset).then(() => {
                    this.$store.commit('updateAsset', this.asset)
                    this.error = false
                    this.message = 'updated'
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            },
            removeAsset: function () {
                api.removeAsset(this.asset.assetId).then(() => {
                    this.$store.commit('removeAsset', this.asset.assetId)
                    this.error = false
                }).catch((error) => {
                    this.error = true
                    this.message = error
                })
            }
        }
    }

</script>