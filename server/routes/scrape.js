const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');
const { auth } = require('../supplemental/middleware');

// @route ------ GET api/scrape/cod
// @desc ------- Scrape cambridge online dictionary
// @access ----- Private

router.get('/cod', auth, async (req, res) => {
  try {
    const { query } = req.query;

    const respose = await axios.get(
      `https://dictionary.cambridge.org/dictionary/english/${query}`
    );

    const { data } = respose;
    const $ = cheerio.load(data);

    const result = [];

    const page = $('.page');

    if (!page.length) throw new Error('');

    let sections = page.find('.pr.entry-body__el');
    if (!sections.length) sections = page.find('.pr.idiom-block');
    if (!sections.length) throw new Error('');

    sections.each((i, el) => {
      const section = $(el);

      const sectionObj = {};
      result.push(sectionObj);

      const headerEl = section.find('.posgram.dpos-g.hdib.lmr-5');

      sectionObj.part_of_speech = headerEl.find('.pos.dpos').text().trim();

      sectionObj.transcr_uk = headerEl
        .siblings('.uk.dpron-i')
        .find('.pron.dpron')
        .text()
        .trim();

      sectionObj.transcr_us = headerEl
        .siblings('.us.dpron-i')
        .find('.pron.dpron')
        .text()
        .trim();

      const subSectionsArr = [];
      sectionObj.sub_sections = subSectionsArr;

      section.find('.pr.dsense').each((z, el) => {
        const subSection = $(el);
        const subSectionObj = {};

        subSectionsArr.push(subSectionObj);

        subSectionObj.guideword = subSection
          .find('.guideword.dsense_gw')
          .text()
          .trim();

        const blocksBody = subSection.find('.sense-body.dsense_b');
        const blocks = blocksBody.find('.def-block.ddef_block ');

        const blocksArr = [];
        subSectionObj.blocks = blocksArr;

        blocks.each((y, el) => {
          const block = $(el);

          const blockObj = {};
          blocksArr.push(blockObj);

          blockObj.definition = block.find('.def.ddef_d.db').text().trim();

          const examplesBody = block.find('.def-body.ddef_b');
          const examples = examplesBody.children('.examp.dexamp');
          const examplesArr = [];

          blockObj.examples = examplesArr;

          examples.each((x, el) => {
            const example = $(el);

            examplesArr.push(example.find('.eg.deg').text().trim());
          });
        });
      });
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

// @route ------ GET api/scrape/urban
// @desc ------- Scrape urban dictionary
// @access ----- Private

router.get('/urban', auth, async (req, res) => {
  try {
    const { query } = req.query;

    const respose = await axios.get(
      `https://www.urbandictionary.com/define.php?term=${query}`
    );

    const data = respose.data;
    const $ = cheerio.load(data);

    const result = [];

    const content = $('#content');

    if (!content.length) throw new Error('');

    content
      .find('.def-panel')
      .filter((i) => i !== 1)
      .each((z, el) => {
        const panel = $(el);
        const panelObj = {};

        result.push(panelObj);

        panelObj.term = panel.find('.def-header .word').text().trim();
        panelObj.definition = panel.find('.meaning').text().trim();
        // panelObj.example = panel.find('.example').text().trim();
        let example = '';
        panel
          .find('.example')
          .contents()
          .each((i, el) => {
            let name = $(el).get(0).name;

            if (name === 'br') {
              example = example + '<br>';
            } else {
              example = example + $(el).text();
            }
          });

        panelObj.example = example;
      });

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errorBody: 'Server Error' });
  }
});

module.exports = router;
