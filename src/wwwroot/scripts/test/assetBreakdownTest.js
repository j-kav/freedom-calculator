import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import AssetBreakdown from '../src/components/AssetBreakdown.vue'
import { expect } from 'chai'
import assetTypes from '../src/assetTypes'

describe('AssetBreakdown', () => {
    Vue.use(Vuex)

    const mockedStore = {
        state: {
            assets: [{ assetType: assetTypes.Cash, value: 4000 }, { assetType: assetTypes.DomesticStock, value: 80000 }, { assetType: assetTypes.Cash, value: 10000 }]
        },

        getters: {
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
        expect(vm.$refs.test.totalCash).to.equal(14000)
    })
})