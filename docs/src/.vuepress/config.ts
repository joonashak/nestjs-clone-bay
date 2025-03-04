import { viteBundler } from "@vuepress/bundler-vite";
import { copyCodePlugin } from "@vuepress/plugin-copy-code";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import sidebar from "./sidebar";

export default defineUserConfig({
  bundler: viteBundler(),
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
