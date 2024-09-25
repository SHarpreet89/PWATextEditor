import { getDb, putDb } from './database';
import { header } from './header';
import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript'; // Import JavaScript mode
import { oneDark } from '@codemirror/theme-one-dark';


export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // Create the editor view
    this.editor = new EditorView({
      doc: localData || header,
      extensions: [basicSetup, javascript()],
      parent: document.querySelector('#main'),
    });

    // When the editor content changes, save to localStorage
    this.editor.on('update', () => {
      localStorage.setItem('content', this.editor.state.doc.toString());
    });

    // Save the content when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });

    // Load initial data from IndexedDB
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      if (data) {
        this.editor.dispatch({
          changes: { from: 0, to: this.editor.state.doc.length, insert: data },
        });
      }
    });
  }
}
