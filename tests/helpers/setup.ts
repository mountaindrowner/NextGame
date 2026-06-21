// Runs before every test module is imported (vitest setupFiles). In the
// happy-dom environment this installs the canvas/WebGL stub Phaser needs during
// its import-time device detection; in the plain node environment (the existing
// suites) it no-ops, so those tests are unaffected.
import { installCanvasStub } from './dom-canvas';

installCanvasStub();
