export default {
  recs: [],
  isLoading: false,
  title: 'Modifiers Infomation',
  icon: 'toc',
  isModalOpened: false,
  editingRec: {},
  backupRec: {},
  selected: [],
  cols: [
    {
      name: 'edit',
      align: 'left',
      field: 'edit',
      width: '34px',
    },
    {
      name: 'name',
      label: 'Name',
      align: 'left',
      field: 'name',
      sortable: true,
    },
    {
      name: 'price',
      label: 'Price',
      align: 'left',
      field: 'price',
      sortable: true,
    },
    {
      name: 'groupTitle',
      label: 'Group Title',
      align: 'left',
      field: 'groupTitle',
      sortable: true,
    },
    {
      name: 'groupType',
      label: 'Group Type',
      align: 'left',
      field: 'groupType',
      sortable: true,
    },
    {
      name: 'isDefault',
      label: 'Is Default',
      align: 'left',
      field: 'isDefault',
      sortable: true,
    },
  ],
  fields: [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      icon: 'person',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      icon: 'attach_money',
    },
    {
      name: 'groupTitle',
      label: 'Group Title',
      type: 'text',
      icon: 'menu',
    },
    {
      name: 'groupType',
      label: 'Group Type',
      type: 'text',
      icon: 'select_all',
      isCombobox: true,
      options: [
        {
          label: 'Checkbox',
          value: 'check',
        },
        {
          label: 'Radio',
          value: 'radio',
        },
      ],
    },
    {
      name: 'isDefault',
      label: 'Is Default',
      type: 'text',
      icon: 'check_circle_outline',
      isCombobox: true,
      options: [
        {
          label: 'True',
          value: true,
        },
        {
          label: 'False',
          value: false,
        },
      ],
    },
  ],
}
