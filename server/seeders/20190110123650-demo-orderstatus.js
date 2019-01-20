'use strict'
var GoogleSpreadsheet = require('google-spreadsheet')
var _d = require('lodash')
var creds = require('../TP-TEA-HK-4be78b7ad5f8.json')
var doc = new GoogleSpreadsheet('1l-z14dx93syqESH6yunAsXMRafCz-nNqV4_7vuoMORQ')

function getData() {
  return new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
      doc.getRows(1, function (err, rows) {
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
      'orderstatuses',
      _d.map(data, row => _d.pick(row, 'id', 'name', 'notes')),
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orderstatuses', null, {})
  },
}
