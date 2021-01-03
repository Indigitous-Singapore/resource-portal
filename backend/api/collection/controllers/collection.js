'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
let populate = ['items']

const populateEntityItems = async (entity) => {
  const itemIds = entity.items.map(item => item.id)
  entity.items = await strapi.query('item').find({ id: itemIds })
}

const populateItems = async (entities) => {
  const newEntities = [...entities]
  for (const entity of newEntities) {
    await populateEntityItems(entity)
  }

  return newEntities
}

module.exports = {
  async find(ctx) {
    let entities;
    ctx.query['user.id'] = ctx.state.user.id

    if (ctx.query._q) {
      entities = await strapi.services.collection.search(ctx.query, populate);
    } else {
      entities = await strapi.services.collection.find(ctx.query, populate);
    }

    entities = await populateItems(entities)

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.collection }));
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.collection.findOne({
      id: ctx.params.id,
      'user.id': ctx.state.user.id
    }, populate);

    entity = await populateEntityItems(entity)

    return sanitizeEntity(entity, { model: strapi.models.collection });
  },
  count(ctx) {
    ctx.query['user.id'] = ctx.state.user.id
    if (ctx.query._q) {
      return strapi.services.collection.countSearch(ctx.query);
    }
    return strapi.services.collection.count(ctx.query);
  },
  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id
      entity = await strapi.services.collection.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id
      entity = await strapi.services.collection.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.collection });
  },
  async update(ctx) {
    //  Gets the collection
    const collection = await strapi.services.collection.findOne({
      id: ctx.params.id,
      'user.id': ctx.state.user.id
    })

    if(collection === undefined || collection === null) {
      throw error('Unauthorised access')
    }

    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.collection.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.collection.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.collection });
  },
  async delete(ctx) {
    //  Gets the collection
    const collection = await strapi.services.collection.findOne({
      id: ctx.params.id,
      'user.id': ctx.state.user.id
    })

    if(collection === undefined || collection === null) {
      throw error('Unauthorised access')
    }
    
    const { id } = ctx.params;

    const entity = await strapi.services.collection.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.collection });
  },
};
