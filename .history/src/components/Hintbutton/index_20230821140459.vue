<template>
    <a  :title="title" ma>
        <el-button v-bind="$attrs" v-on="$listeners">

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