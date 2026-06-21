import { Editor } from './editor';
import { Panel } from './panel';

const canvas = document.getElementById('stage-canvas') as HTMLCanvasElement;
const toolbar = document.getElementById('toolbar')!;
const sidebar = document.getElementById('sidebar')!;
const status = document.getElementById('status')!;

let panel: Panel | undefined;
const editor = new Editor({
  canvas,
  onSelect: (sel) => panel?.showProps(sel),
  onStatus: (t) => panel?.setStatus(t),
  onMapLoaded: () => { panel?.refreshMeta(); panel?.syncMapSelect(); panel?.showProps(null); },
});
panel = new Panel(editor, toolbar, sidebar, status);

editor.setMap('the-field').catch((e) => panel?.setStatus(`Load failed: ${String(e)}`));

// warn before leaving with unsaved edits
window.addEventListener('beforeunload', (e) => { if (editor.dirty) { e.preventDefault(); e.returnValue = ''; } });
