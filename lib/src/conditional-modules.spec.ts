import { conditionalModules } from "./conditional-modules";
import { MockingModule } from "./mocking/mocking.module";

describe("Conditional module loader", () => {
  it("Loads mocking module when it is enabled", () => {
    process.env.UNSAFE_MOCKING_ENABLED = "true";
    expect(conditionalModules()).toContain(MockingModule);
  });

  it("Does not load mocking module if it is not enabled", () => {
    process.env.UNSAFE_MOCKING_ENABLED = undefined;
    expect(conditionalModules()).not.toContain(MockingModule);
  });
});
