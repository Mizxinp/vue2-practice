<template>
    <div class="table">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: {
                type: Array,
            },
            defaultSort: {
                type: Object,
            },
        },
        provide() {
            return {
                dataSource: this.dataSource,
                defaultSort: this.defaultSort
            }
        },
        data() {
            return {
                dataSource: this.tableData,
            }
        },
        mounted () {
            console.log('j', this)
            this.$on('changeTableData', (data) => {
                this.changeTableData(data)
            })
        },
        methods: {
            changeTableData(newData) {
                this.dataSource = newData
            }
        },
    }
</script>

<style lang="css" scoped>
    .table {
        display: flex;
    }
</style>