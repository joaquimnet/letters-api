const consola = require('consola');
const express = require('express');
const slug = require('slugify');
const crypto = require('crypto');

const Letter = require('../models/letter.model');
const { default: slugify } = require('slugify');

module.exports = {
  name: 'Letter',

  routes: {
    'POST /letter': 'createLetter',
    'GET /letter/:slug': 'getLetterBySlug',
  },

  actions: {
    getLetterBySlug: {
      params: {
        slug: 'string',
      },
      async handler({ req, res, params }) {
        const { slug } = params;

        const letter = await Letter.findOne({ slug });

        if (!letter) {
          return res.status(404).send({ error: 'not_found' });
        }

        const read = letter.toObject();
        letter.message = '[this message has faded]';
        letter.readOn = new Date();
        await letter.save();

        return res.send(read);
      },
    },
    createLetter: {
      middleware: [express.json()],
      params: {
        to: { type: 'string', min: 1, max: 140 },
        from: { type: 'string', min: 1, max: 140 },
        title: { type: 'string', min: 1, max: 140 },
        message: { type: 'string', min: 1, max: 18071999 },
      },
      async handler({ req, res, params }) {
        params.slug = slugify(params.title) + '-' + crypto.randomBytes(5).toString('hex');
        const letter = new Letter(params);
        try {
          await letter.save();
        } catch (err) {
          consola.error(err);
          return res.status(500).send({ error: 'unexpected_error' });
        }
        res.status(201).send({ slug: letter.slug });
      },
    },
  },
};
