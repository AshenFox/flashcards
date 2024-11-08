import middleware from "@supplemental/middleware";
import { ScrapingHeaders } from "@supplemental/scrape";
import axios from "axios";
import cheerio from "cheerio";
import express, { Request, Response } from "express";

const { auth } = middleware;
const router = express.Router();

type ResError = {
  errorBody: string;
};

// @route ------ GET api/scrape/cod
// @desc ------- Scrape cambridge online dictionary
// @access ----- Private

type CodGetQuery = qs.ParsedQs & {
  query: string;
};

type CodGetReq = Request<any, any, any, CodGetQuery>;

type CodBlock = {
  definition?: string;
  examples?: string[];
};

type CodSubSection = {
  blocks?: CodBlock[];
  guideword?: string;
};

type CodSection = {
  part_of_speech?: string;
  sub_sections?: CodSubSection[];
  transcr_uk?: string;
  transcr_us?: string;
};

type TCodGetResBody = CodSection[];

type TCodGetRes = Response<TCodGetResBody | ResError>;

router.get("/cod", auth, async (req: CodGetReq, res: TCodGetRes) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://dictionary.cambridge.org/dictionary/english/${query}`,
      {
        headers: ScrapingHeaders,
      },
    );

    console.log({ response });

    const { data }: { data: string } = response;
    const $ = cheerio.load(data);

    const result: TCodGetResBody = [];

    const page = $(".page");

    const errMsg = "Something went wrong while parsing cod response.";

    if (!page || !page.length) throw new Error(errMsg);

    let sections = page.find(".pr.entry-body__el");
    if (!sections.length) sections = page.find(".pr.idiom-block");
    if (!sections.length) throw new Error(errMsg);

    sections.each((i, el) => {
      const section = $(el);

      const sectionObj: CodSection = {};
      result.push(sectionObj);

      const headerEl = section.find(".posgram.dpos-g.hdib.lmr-5");

      sectionObj.part_of_speech = headerEl.find(".pos.dpos").text().trim();

      sectionObj.transcr_uk = headerEl
        .siblings(".uk.dpron-i")
        .find(".pron.dpron")
        .text()
        .trim();

      sectionObj.transcr_us = headerEl
        .siblings(".us.dpron-i")
        .find(".pron.dpron")
        .text()
        .trim();

      const subSectionsArr: CodSubSection[] = [];
      sectionObj.sub_sections = subSectionsArr;

      section.find(".pr.dsense").each((z, el) => {
        const subSection = $(el);
        const subSectionObj: CodSubSection = {};

        subSectionsArr.push(subSectionObj);

        subSectionObj.guideword = subSection
          .find(".guideword.dsense_gw")
          .text()
          .trim();

        const blocksBody = subSection.find(".sense-body.dsense_b");
        const blocks = blocksBody.find(".def-block.ddef_block ");

        const blocksArr: CodBlock[] = [];
        subSectionObj.blocks = blocksArr;

        blocks.each((y, el) => {
          const block = $(el);

          const blockObj: CodBlock = {};
          blocksArr.push(blockObj);

          blockObj.definition = block.find(".def.ddef_d.db").text().trim();

          const examplesBody = block.find(".def-body.ddef_b");
          const examples = examplesBody.children(".examp.dexamp");
          const examplesArr: string[] = [];

          blockObj.examples = examplesArr;

          examples.each((x, el) => {
            const example = $(el);

            examplesArr.push(example.find(".eg.deg").text().trim());
          });
        });
      });
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

// @route ------ GET api/scrape/urban
// @desc ------- Scrape urban dictionary
// @access ----- Private

type UrbanGetQuery = qs.ParsedQs & {
  query: string;
};

type UrbanGetReq = Request<any, any, any, UrbanGetQuery>;

type UrbanPanel = {
  definition?: string;
  example?: string;
};

type UrbanGetResBody = UrbanPanel[];

type UrbanGetRes = Response<UrbanGetResBody | ResError>;

router.get("/urban", auth, async (req: UrbanGetReq, res: UrbanGetRes) => {
  try {
    const { query } = req.query;

    const response = await axios.get(
      `https://www.urbandictionary.com/define.php?term=${query}`,
    );

    const { data }: { data: string } = response;
    const $ = cheerio.load(data);

    const result: UrbanGetResBody = [];

    const content = $("#ud-root");

    if (!content.length) throw new Error("");

    content.find(".definition").each((z, el) => {
      const panel = $(el);
      const panelObj: UrbanPanel = {};

      result.push(panelObj);

      // panelObj.term = panel.find('.def-header .word').text().trim();
      panelObj.definition = panel.find(".meaning").text().trim();

      let example = "";
      panel
        .find(".example")
        .contents()
        .each((i, el) => {
          let name = $(el).get(0).name;

          if (name === "br") {
            example = example + "<br>";
          } else {
            example = example + $(el).text();
          }
        });

      panelObj.example = example;
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorBody: "Server Error" });
  }
});

export default router;
