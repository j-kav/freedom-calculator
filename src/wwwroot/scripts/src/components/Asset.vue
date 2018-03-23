<template>
    <tr>
        <td><input v-model="asset.name" v-on:change.prevent=updateAsset()></td>
        <td v-if="isStockOrBond">{{ asset.symbol }}</td>
        <td v-if="isStockOrBond"><input v-model="asset.numShares" v-on:change.prevent=updateAsset()></td>
        <td v-if="isStockOrBond" class="align-right">{{ utils.usdFormatter.format(asset.sharePrice) }}</td>
        <td v-if="isRealEstate">{{ asset.address }}</td>
        <td v-if="isRealEstate">{{ asset.city }}</td>
        <td v-if="isRealEstate">{{ asset.state }}</td>
        <td v-if="isRealEstate">{{ asset.zip }}</td>
        <td v-if="isCash"><input v-model="asset.value" v-on:change.prevent=updateAsset()></td>
        <td v-else class="align-right">{{ utils.usdFormatter.format(asset.value) }}</td>
        <td v-if="isRealEstate">
            <select v-model="asset.liabilityId" v-on:change.prevent=updateEquity()>
                <option v-for="liability in $store.state.liabilities" :key="liability.liabilityId" v-bind:value="liability.liabilityId">
                    {{ liability.name }}
                </option>
            </select>
        </td>
        <td v-if="isRealEstate" class="align-right">{{ utils.usdFormatter.format(asset.equity) }}</td>
        <td><input type="image" class="deleteButton" v-on:click.prevent=removeAsset() src="images/delete.png" /></td>
        <td v-if="message" v-bind:class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'
import assetTypes from '../assetTypes'
import utils from '../utils'

export default {
    name: 'Asset',
    data() {
        return {
            error: false,
            message: null,
            asset: this.assetModel,
            isStockOrBond:
                this.assetModel.assetType === assetTypes.DomesticBond ||
                this.assetModel.assetType === assetTypes.InternationalBond ||
                this.assetModel.assetType === assetTypes.DomesticStock ||
                this.assetModel.assetType === assetTypes.InternationalStock,
            isRealEstate: this.assetModel.assetType === assetTypes.RealEstate,
            isCash: this.assetModel.assetType === assetTypes.Cash,
            utils: utils
        }
    },
    computed: {
        messageClass() {
            return {
                error: this.error,
                success: !this.error
            }
        }
    },
    props: ['assetModel'],
    methods: {
        updateEquity() {
            this.$store.commit('updateAsset', this.asset)
        },
        async updateAsset() {
            try {
                this.$emit('loading', true)
                const updatedAsset = await api.updateAsset(this.asset.assetId, this.asset)
                this.asset = updatedAsset
                this.$store.commit('updateAsset', this.asset)
                this.error = false
                this.message = 'updated'
                this.$emit('loading', false)
            } catch (error) {
                this.error = true
                this.message = error
                this.$emit('loading', false)
            }
        },
        async removeAsset() {
            if (window.confirm('Are you sure?')) {
                try {
                    await api.removeAsset(this.asset.assetId)
                    this.$store.commit('removeAsset', this.asset.assetId)
                    this.error = false
                } catch (error) {
                    this.error = true
                    this.message = error
                }
            }
        }
    }
}
</script>