<template>
  <div>
    <div class="q-mb-sm">
      <q-btn size="sm" color="primary" @click="selectGoodService" label="Select 'Good service'" />
      <q-btn v-if="selected" size="sm" color="red" @click="unselectNode" :label="selected" />
    </div>
    <q-tree :nodes="props" default-expand-all :selected.sync="selected" node-key="label" />
  </div>
</template>

<script>
export default {
  data: () => ({
    selected: null,
    props: [
      {
        label: 'Satisfied customers',
        avatar: 'statics/boy-avatar.png',
        children: [
          {
            label: 'Good food',
            icon: 'restaurant_menu',
            children: [{label: 'Quality ingredients'}, {label: 'Good recipe'}],
          },
          {
            label: 'Good service',
            icon: 'room_service',
            children: [{label: 'Prompt attention'}, {label: 'Professional waiter'}],
          },
          {
            label: 'Pleasant surroundings',
            icon: 'photo',
            children: [
              {
                label: 'Happy atmosphere',
                img: 'statics/parallax1.jpg',
              },
              {
                label: 'Good table presentation',
                img: 'statics/parallax2.jpg',
              },
              {
                label: 'Pleasing decor',
                img: 'statics/mountains.jpg',
              },
            ],
          },
        ],
      },
    ],
  }),
  methods: {
    selectGoodService() {
      if (this.selected !== 'Good service') {
        this.selected = 'Good service'
      }
    },
    unselectNode() {
      this.selected = null
    },
  },
  computed: {
    currentSelectedKey() {
      return ''
    },
  },
}
</script>
