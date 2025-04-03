Component({
  externalClasses: ['title-class', 'icon-class', 'number-class'],
  options: {
    multipleSlots: true,
  },
  properties: {
    catalogShowList: {
      type: Array,
      value: [],
    },
    catalog: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    },
    desc: {
      type: String,
      value: 'more+',
    },
    isTop: {
      type: Boolean,
      value: true,
    },
    classPrefix: {
      type: String,
      value: 'wr',
    },
  },
  methods: {
    onClickItem(e) {
	  const index = e.currentTarget.dataset.index;
      this.triggerEvent('onClickItem', this.properties.catalogShowList[index].originImage);
    },

    onClickTop() {
      this.triggerEvent('onClickTop', this.properties.catalog);
    },
  },
});
