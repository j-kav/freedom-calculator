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
    </div>
</template>
<script>
    // import assetTypes from '../assetTypes'
    // TODO list only the assets of the type passed to prop

    export default {
        name: 'AssetList',
        props: ['assetType'],
        computed: {
            assets () {
                return this.$store.state.assets
            }
        }
    }
</script>