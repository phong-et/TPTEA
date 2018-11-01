export default {
  currentGiftCardCode: '',
  isModalOpened: false,
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  name: '',
  role: '',
  giftcard: {},
  recs: [],
  title: 'Gift Card',
  icon: 'card_giftcard',
  selected: [],
  editingRec: {},
  backupRec: {},
  currentGenGiftCardCode: 'qrcode',
  cols: [
    {
      name: 'edit',
      align: 'left',
      field: 'edit',
      width: '34px',
    },
    {
      name: 'createdate',
      label: 'Create Date',
      align: 'left',
      field: 'createdate',
      sortable: true,
    },
    {
      name: 'username',
      label: 'User Name',
      align: 'left',
      field: 'username',
      sortable: true,
    },
  ],
  fields: [],
}
