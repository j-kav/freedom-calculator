import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import AssetBreakdown from '../src/components/AssetBreakdown.vue'
import { expect } from 'chai'
import assetTypes from '../src/assetTypes'

describe('AssetBreakdown', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            assets: [
                { assetType: assetTypes.Cash, value: 4000 },
                { assetType: assetTypes.DomesticStock, value: 80000 },
                { assetType: assetTypes.Cash, value: 10000 },
                { assetType: assetTypes.RealEstate, value: 450000, equity: 125000 },
                { assetType: assetTypes.InternationalStock, value: 40000 },
                { assetType: assetTypes.InternationalBond, value: 1000 },
                { assetType: assetTypes.DomesticBond, value: 2000 }
            ]
        },

        getters: {
            totalAssetEquity: (state) => {
                let total = 0
                for (const asset of state.assets) {
                    if (asset.assetType === assetTypes.RealEstate) {
                        total += parseFloat(asset.equity)
                    } else {
                        total += parseFloat(asset.value)
                    }
                }
                return total
            },
            totalCash: (state) => {
                let totalCash = 0
                const cashAssets = state.assets.filter(asset => asset.assetType === assetTypes.Cash)
                for (const cashAsset of cashAssets) {
                    totalCash += cashAsset.value
                }
                return totalCash
            },
            assetsByType: (state) => (assetTypeArray) => {
                return state.assets.filter(asset => assetTypeArray.includes(asset.assetType))
            }
        }
    }

    it('should compute total cash on load', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': AssetBreakdown
            }
        }).$mount()
        expect(vm.$refs.test.totalCashFormatted).to.equal('$14,000.00')
    })

    it('should compute total real estate on load', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': AssetBreakdown
            }
        }).$mount()
        expect(vm.$refs.test.totalRealEstateFormatted).to.equal('$125,000.00')
    })

    it('should compute total stock on load', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': AssetBreakdown
            }
        }).$mount()
        expect(vm.$refs.test.totalStockFormatted).to.equal('$120,000.00')
    })

    it('should calculate percentages on load', function () {
        const vm = new Vue({
            template: '<div><test ref="test"></test></div>',
            store: new Vuex.Store(mockedStore),
            components: {
                'test': AssetBreakdown
            }
        }).$mount()
        expect(vm.$refs.test.percentCash).to.equal('5.34%')
        expect(vm.$refs.test.percentBonds).to.equal('1.15%')
        expect(vm.$refs.test.percentStock).to.equal('45.80%')
        expect(vm.$refs.test.percentRealEstate).to.equal('47.71%')
    })
})