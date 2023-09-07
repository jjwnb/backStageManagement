<template>
    <a  :title="title">
        <el-button v-bind="$attrs" >

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