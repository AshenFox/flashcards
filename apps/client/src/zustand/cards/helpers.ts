import type { CodDictResult, UrbanDictResult } from "@api/methods/scrape/scrapeGetDictionary";
import type { ImgurlBase, ImgurlObjs } from "./types";

/** true = show (loading or loaded), false = hide (load failed) */
export const url_fields = { ok: true };

export const imgUrlArrToObj = (arr: ImgurlBase[]): ImgurlObjs =>
  Object.fromEntries(arr.map((url, i) => [i, { ...url, ...url_fields }]));

export function formatDictionaryResult(
  result: CodDictResult | UrbanDictResult,
): string {
  const { type, data } = result;
  const divider = "<br><div>-------</div><br>";
  const br = "<br>";
  let formattedResult = divider;

  const wrap_in = (str?: string, el?: "div"): string => {
    if (!str) return "";
    return el ? `<${el}>${str}</${el}>` : `( ${str} )`;
  };

  if (type === "cod") {
    data.forEach((sect) => {
      const { part_of_speech, transcr_us, sub_sections } = sect;
      sub_sections.forEach((sub_sect) => {
        const { guideword, blocks } = sub_sect;
        blocks.forEach((block) => {
          let examplesHtml = "";
          block.examples.forEach((example) => {
            examplesHtml += wrap_in(example, "div");
          });
          const definitionHtml = wrap_in(
            guideword.concat(wrap_in(block.definition)),
            "div",
          );
          const additionalInfoHtml = wrap_in(
            wrap_in(transcr_us).concat(
              wrap_in(part_of_speech),
              wrap_in(),
            ),
            "div",
          );
          formattedResult = formattedResult.concat(
            examplesHtml,
            br,
            definitionHtml,
            additionalInfoHtml,
            divider,
          );
        });
      });
    });
  } else if (type === "urban") {
    data.forEach((panel) => {
      formattedResult = formattedResult.concat(
        wrap_in(panel.example, "div"),
        br,
        wrap_in(wrap_in(panel.definition), "div"),
        divider,
      );
    });
  }

  return formattedResult;
}
