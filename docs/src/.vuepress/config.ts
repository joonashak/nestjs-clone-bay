import { defaultTheme, defineUserConfig } from "vuepress";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import sidebar from "./sidebar";

export default defineUserConfig({
  lang: "en-US",
  title: "nestjs-clone-bay docs",
  description: "Documentation for @joonashak/nestjs-clone-bay library.",
  base: "/nestjs-clone-bay/",
  theme: defaultTheme({
    repo: "joonashak/nestjs-clone-bay",
    docsDir: "docs/src",
    contributors: false,
    sidebar,
  }),
  plugins: [copyCodePlugin()],
});
