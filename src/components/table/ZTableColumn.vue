<template>
  <div>
    <div class="label">
        <div>{{label}}</div>
        <div v-if="sortable" class="order">
            <span @click="ascending" :class="{orderColor: curOrder === 'ascending'}">⬆</span>
            <span @click="descending" :class="{orderColor: curOrder === 'descending'}">⬇</span>
        </div>
    </div>
    <div v-if="!$scopedSlots.default">
        <div v-for="(prop, index) in columnData" :key="`${prop}-${index}`" class="column">{{prop}}</div>
    </div>
    <slot :column="column"></slot>
  </div>
</template>

<script>
    export default {
        inject: ["dataSource", "defaultSort"],
        props: {
            label: {
                type: String,
                default: ""
            },
            prop: {
                type: String,
                default: ""
            },
            sortable: {
                type: Boolean   
            }
        },
        data() {
            return {
                columnData: [],
                curOrder: 'descending',
                column: {},
            };
        },
        created() {
            const { defaultSort, dataSource } = this || {};
            const { order } = defaultSort || {}
            if (defaultSort) {
                if (order === 'descending') {
                    this.descending()
                } else {
                    this.ascending()
                }
            } else {
                this.renderColumn(dataSource)
            }
            this.column = { [this.prop]: this.getColumn(dataSource)}
        },
        watch: {
            dataSource(newValue) {
                this.renderColumn(newValue)
                this.column = { [this.prop]: this.getColumn(newValue)}
            }
        },
        methods: {
            ascending() {
                const { dataSource, defaultSort } = this || {};
                const { prop } = defaultSort || {}
                let newData
                // 只处理日期和数字类型排序
                if (prop === 'date') {
                    newData = dataSource
                        .sort((pre, next) => (new Date(pre.date).getTime() - new Date(next.date).getTime()))
                } else {
                    newData = dataSource.sort((pre, next) => (pre[this.prop] - next[this.prop]))
                }
                this.$emit('changeTableData', newData)
                this.renderColumn(newData)
                this.curOrder = 'ascending'
            },
            descending() {
                const { dataSource, defaultSort } = this || {};
                const { prop } = defaultSort || {}
                let newData
                if (prop === 'date') {
                    newData = dataSource
                        .sort((pre, next) => (new Date(next.date).getTime() - new Date(pre.date).getTime()))
                } else {
                    newData = dataSource.sort((pre, next) => (next[this.prop] - pre[this.prop]))
                }
                this.$emit('changeTableData', newData)
                this.renderColumn(newData)
                this.curOrder = 'descending'
            },
            renderColumn(data) {
                this.columnData = (data || []).map(data => data[this.prop])
            },
            getColumn(data) {
                return (data || []).map(item => item[this.prop])
            }
        },
    };
</script>

<style lang="css" scoped>
    .label {
        display: flex;
        margin-right: 10px;
    }
    .order {
        margin-left: 20px;
    }
    .orderColor {
        color: red;
    }
    .column {
        margin-right: 20px;
    }
</style>