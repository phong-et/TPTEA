export default {
  token: localStorage.getItem('auth-token') || '',
  isLoading: false,
  name: '',
  role: '',
  order: {},
  recs: [],
  title: 'Processing Orders Infomation',
  icon: 'shopping_cart',
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
      name: 'customerId',
      label: 'Customer Id',
      align: 'left',
      field: 'customerId',
      hidden: true,
      sortable: true,
    },
    {
      name: 'CustomerName',
      label: 'Customer Name',
      align: 'left',
      field: {Customer: 'name'},
      sortable: true,
    },
    {
      name: 'StoreName',
      label: 'Store Nam',
      align: 'left',
      field: 'storeName',
      sortable: true,
    },
    {
      name: 'IsStorePickup',
      label: 'Delivery',
      align: 'left',
      field: 'isStorePickup',
      sortable: true,
    },
    {
      name: 'DeliveryAddress',
      label: 'Delivery Address',
      align: 'left',
      field: 'deliveryAddress',
      sortable: true,
    },
    {
      name: 'DeliveryContact',
      label: 'Delivery Contact',
      align: 'left',
      field: 'deliveryContact',
      sortable: true,
    },
    {
      name: 'receivingTime',
      label: 'Receiving Time',
      align: 'left',
      field: 'receivingTime',
      sortable: true,
    },
    {
      name: 'TotalAmount',
      label: 'Total Amount',
      align: 'left',
      field: 'totalAmount',
      sortable: true,
    },
    {
      name: 'OrderStatusId',
      label: 'Status',
      align: 'left',
      field: 'orderStatusId',
      sortable: true,
    },
  ],
  fields: [
    {
      name: 'id',
      hidden: true,
    },
    {
      name: 'customerId',
      label: 'Customer Id',
      type: 'text',
      hidden: true,
    },
    {
      name: 'sustomerName',
      label: 'Customer Name',
      type: 'text',
      readonly: true,
      icon: 'person',
    },
    {
      name: 'storeName',
      label: 'Store Name',
      type: 'text',
      readonly: true,
      icon: 'store',
    },
    {
      name: 'isStorePickup',
      label: 'Delivery',
      type: 'checkbox',
      readonly: true,
      icon: 'local_shipping',
    },
    {
      name: 'deliveryAddress',
      label: 'Delivery Address',
      type: 'text',
      readonly: true,
      icon: 'library_books',
    },
    {
      name: 'deliveryContact',
      label: 'Delivery Contact',
      type: 'text',
      readonly: true,
      icon: 'contact_phone',
    },
  ],
}
