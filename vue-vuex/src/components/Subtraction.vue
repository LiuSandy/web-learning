<template>
  <div>
    <h3>当前 count 值：{{ count }}</h3>
    <button>-1</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  },
  data () {
    return {}
  }
}
</script>
