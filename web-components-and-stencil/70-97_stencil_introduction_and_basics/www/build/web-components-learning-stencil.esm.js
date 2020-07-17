import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-05997c13.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["se-side-drawer",[[1,"se-side-drawer",{"title":[513],"opened":[516],"showContactInfo":[32],"open":[64]}]]],["se-tooltip",[[1,"se-tooltip",{"tip":[1],"hidden":[32]}]]]], options);
});
