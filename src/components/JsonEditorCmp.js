import React from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";
import styles from '../styles.module.css';

const JsonEditorCmp = ({ jsonEditorContent, setJsonEditorContent, ...props}) => {
    const onChange = (newValue) => {
        setJsonEditorContent && setJsonEditorContent(newValue);
    }

    return (
        <AceEditor
            width="100%"
            height="100%"
            mode="json"
            theme="github"
            onChange={onChange}
            value={jsonEditorContent}
            name="flow-tree-json-editor"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
            }}
        />
    );
}

export default JsonEditorCmp;