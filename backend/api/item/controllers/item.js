'use strict';

const { sanitizeEntity } = require('strapi-utils');

const AWS = require('aws-sdk')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async downloadMedia(ctx) {
    const {
      endpoint,
      accessKeyId,
      secretAccessKey,
      params
    } = strapi.plugins.upload.config.providerOptions
    const s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      endpoint: new AWS.Endpoint(endpoint),
      accessKeyId,
      secretAccessKey
    })
    
    //  Get the item
    const url = s3.getSignedUrl('getObject', {
      Bucket: params.Bucket,
      Key: ctx.params.media,
      Expires: 60 * 5
    });

    return {
      url,
    }
  },
};
