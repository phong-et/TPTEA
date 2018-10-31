export default {
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  name: '',
  role: '',
  giftcard: {},
  recs: [],
  title: 'Gift Card',
  icon: 'card_giftcard',
  selected: [],
  isModalOpened: false,
  editingRec: {},
  backupRec: {},
  cols: [
    {
      name: 'edit',
      align: 'left',
      field: 'edit',
      width: '34px',
    },
    {
      name: 'userName',
      label: 'User Name',
      align: 'left',
      field: 'userName',
      sortable: true,
    },
    {
      name: 'createdAt',
      label: 'Create Date',
      align: 'left',
      field: 'createdAt',
      sortable: true,
    },
  ],
  fields: [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'code',
      hidden: true,
    },
    {
      name: 'createdate',
      label: 'Create Date',
      type: 'text',
      icon: 'person',
    },
    {
      name: 'userName',
      label: 'User Name',
      type: 'text',
      icon: 'account_box',
    },
  ],
}
