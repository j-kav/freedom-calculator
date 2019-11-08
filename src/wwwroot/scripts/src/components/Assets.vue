<template>
    <div>
        <nav>
            <a :class="{activeLink: cashActive, inactiveLink: !cashActive }" @click="selectCash">Cash</a>
            <a :class="{activeLink: realEstateActive, inactiveLink: !realEstateActive }" @click="selectRealEstate">Real Estate</a>
            <a :class="{activeLink: bondsActive, inactiveLink: !bondsActive }" @click="selectBonds">Bonds</a>
            <a :class="{activeLink: stocksActive, inactiveLink: !stocksActive }" @click="selectStocks">Stocks</a>
        </nav>
        <div>
            <div :class="{ activeAssetList: cashActive, inactiveAssetList: !cashActive }">
                <assetList :asset-type-array="[assetTypes.Cash]"/>
            </div>
            <div :class="{ activeAssetList: realEstateActive, inactiveAssetList: !realEstateActive }">
                <assetList :asset-type-array="[assetTypes.RealEstate]"/>
            </div>
            <div :class="{ activeAssetList: bondsActive, inactiveAssetList: !bondsActive }">
                <assetList :asset-type-array="[assetTypes.DomesticBond, assetTypes.InternationalBond]"/>
            </div>
            <div :class="{ activeAssetList: stocksActive, inactiveAssetList: !stocksActive }">
                <assetList :asset-type-array="[assetTypes.DomesticStock, assetTypes.InternationalStock, assetTypes.ConstantDomesticStock]"/>
            </div>
        </div>
    </div>
</template>

<script>
import assetTypes from '../assetTypes'
import AssetList from './AssetList.vue'

export default {
    name: 'Assets',
    components: {
        assetList: AssetList
    },
    data() {
        return {
            assetTypes: assetTypes,
            cashActive: true,
            realEstateActive: false,
            bondsActive: false,
            stocksActive: false
        }
    },
    methods: {
        selectCash() {
            this.cashActive = true
            this.realEstateActive = false
            this.bondsActive = false
            this.stocksActive = false
        },
        selectRealEstate() {
            this.cashActive = false
            this.realEstateActive = true
            this.bondsActive = false
            this.stocksActive = false
        },
        selectBonds() {
            this.cashActive = false
            this.realEstateActive = false
            this.bondsActive = true
            this.stocksActive = false
        },
        selectStocks() {
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
    display: block;
}

.inactiveAssetList {
    display: none;
}

.activeLink {
    font-weight: bold;
    text-decoration: underline;
}

.inactiveLink {
    font-weight: normal;
    text-decoration: unset;
}

nav {
    margin-bottom: 10px;
}
nav a {
    margin: 0 5px;
}
</style>