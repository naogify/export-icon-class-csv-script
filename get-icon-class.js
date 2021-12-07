#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { createArrayCsvWriter } = require('csv-writer')
const axios = require('axios');

const getIconClass = async () => {

  const colorJson = path.join(__dirname, 'basic-color.json')

  if (fs.existsSync(colorJson)) {
    fs.unlinkSync(colorJson)
  }

  try {
    const res = await axios.get('https://raw.githubusercontent.com/geolonia/sprites.geolonia.com/master/public/basic-color.json');
    if (res.status === 200 && res.statusText === 'OK') {
      console.log(`Success to get basic-color.json`)
      return res.data
    }
  } catch (error) {
    console.error('Can not get basic-color.json')
    process.exit(1)
  }
}

const exportIconsClassAsCSV = async () => {
  const iconClassList = await getIconClass();

  const outCSV = path.join(__dirname, 'icon-class.csv')

  if (fs.existsSync(outCSV)) {
    fs.unlinkSync(outCSV)
  }

  const data = []

  for (var item in iconClassList) {
      data.push([
        `${item}`
      ])
  }

  const csvWriter = createArrayCsvWriter({
    header: ['icon-name'],
    path: outCSV,
  })

  csvWriter.writeRecords(data)
  console.log(`Success to export icon-class.csv`)
  process.exit()
}

exportIconsClassAsCSV()
