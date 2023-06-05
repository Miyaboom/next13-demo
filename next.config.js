const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        additionalData: `@use "_constant.scss" as *;`,
    },
}

module.exports = nextConfig
