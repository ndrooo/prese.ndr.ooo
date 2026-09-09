import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (config) {
  config.addPlugin(EleventyVitePlugin);
  config.addPlugin(eleventyImageTransformPlugin);

  config.addTemplateFormats(["css", "ts", "js"]);
  config.addPassthroughCopy("./static/");
}
