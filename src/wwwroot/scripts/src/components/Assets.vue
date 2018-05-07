<template>
    <div>
        <nav>
            <a @click="selectCash" :class="{activeLink: cashActive, inactiveLink: !cashActive }">Cash</a>
            <a @click="selectRealEstate" :class="{activeLink: realEstateActive, inactiveLink: !realEstateActive }">Real Estate</a>
            <a @click="selectBonds" :class="{activeLink: bondsActive, inactiveLink: !bondsActive }">Bonds</a>
            <a @click="selectStocks" :class="{activeLink: stocksActive, inactiveLink: !stocksActive }">Stocks</a>
        </nav>
        <div>
            <div :class="{ activeAssetList: cashActive, inactiveAssetList: !cashActive }">
                <assetList :assetTypeArray="[assetTypes.Cash]"></assetList>
            </div>
            <div :class="{ activeAssetList: realEstateActive, inactiveAssetList: !realEstateActive }">
                <assetList :assetTypeArray="[assetTypes.RealEstate]"></assetList>
            </div>
            <div :class="{ activeAssetList: bondsActive, inactiveAssetList: !bondsActive }">
                <assetList :assetTypeArray="[assetTypes.DomesticBond, assetTypes.InternationalBond]"></assetList>
            </div>
            <div :class="{ activeAssetList: stocksActive, inactiveAssetList: !stocksActive }">
                <assetList :assetTypeArray="[assetTypes.DomesticStock, assetTypes.InternationalStock]"></assetList>
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