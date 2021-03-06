<template>
    <tr>
        <td><input v-model="asset.name" @change.prevent="updateAsset"></td>
        <td v-if="isStockOrBond">{{ asset.symbol || "N/A" }}</td>
        <td v-if="isStockOrBond">
            <input v-if="!(assetModel.assetType===assetTypes.ConstantDomesticStock)" v-model="asset.numShares" @change.prevent="updateAsset">
            <input v-if="(assetModel.assetType===assetTypes.ConstantDomesticStock)" v-model="asset.value" @change.prevent="updateAsset">
        </td>
        <td v-if="isStockOrBond" class="align-right">
            <span v-if="!(assetModel.assetType===assetTypes.ConstantDomesticStock)">{{ utils.usdFormatter.format(asset.sharePrice) }}</span>
            <span v-if="(assetModel.assetType===assetTypes.ConstantDomesticStock)">{{ utils.usdFormatter.format(1) }}</span>
        </td>
        <td v-if="isRealEstate">{{ asset.address }}</td>
        <td v-if="isRealEstate">{{ asset.city }}</td>
        <td v-if="isRealEstate">{{ asset.state }}</td>
        <td v-if="isRealEstate">{{ asset.zip }}</td>
        <td v-if="isCash"><input v-model="asset.value" @change.prevent="updateAsset"></td>
        <td v-else class="align-right">{{ utils.usdFormatter.format(asset.value) }}</td>
        <td v-if="isRealEstate">
            <select v-model="asset.liabilityId" @change.prevent="updateEquity">
                <option v-for="liability in $store.state.liabilities" :key="liability.liabilityId" :value="liability.liabilityId">
                    {{ liability.name }}
                </option>
            </select>
        </td>
        <td v-if="isRealEstate" class="align-right">{{ utils.usdFormatter.format(asset.equity) }}</td>
        <td><input type="image" class="deleteButton" src="images/delete.png" @click.prevent="removeAsset"></td>
        <td v-if="message" :class="messageClass">{{ message }}</td>
    </tr>
</template>

<script>
import api from '../api'
import assetTypes from '../assetTypes'
import utils from '../utils'

export default {
    name: 'Asset',
    props: {
        assetModel: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error: false,
            message: null,
            asset: this.assetModel,
            isStockOrBond:
                this.assetModel.assetType === assetTypes.DomesticBond ||
                this.assetModel.assetType === assetTypes.InternationalBond ||
                this.assetModel.assetType === assetTypes.DomesticStock ||
                this.assetModel.assetType === assetTypes.InternationalStock ||
                this.assetModel.assetType === assetTypes.ConstantDomesticStock,
            isRealEstate: this.assetModel.assetType === assetTypes.RealEstate,
            isCash: this.assetModel.assetType === assetTypes.Cash,
            utils: utils,
            assetTypes: assetTypes
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