<template>
    <a  :title="title">
        <el-button v-bind="$attrs" v-on="">

        </el-button>
    </a>
</template>

<script>
export default {
name:'HintButton',
props:['title']
}
</script>

<style>

</style>