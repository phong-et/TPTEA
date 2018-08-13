'use strict'
var GoogleSpreadsheet = require('google-spreadsheet')
var _d = require('lodash')
var creds = '../etm-vn-b3e3daaaadbf.json'
var doc = new GoogleSpreadsheet('1GMxPRlBSyukoiGSETq7xU4p0UsOv6zUNr0HyMO0MxoQ')

function getData() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function(err) {
      doc.getRows(1, function(err, rows) {
        if (err) reject(err)
        else resolve(rows)
      })
    })
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    var data = await getData().catch(err => console.log(err))
    return queryInterface.bulkInsert(
      'orderdetails',
      _d.map(data, row => _d.pick(row, 'id', 'orderId', 'menuId', 'quantity', 'price')),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderdetails', null, {})
  },
}
