import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';
import { AddIcon } from 'evergreen-ui';
import InstructionsCmp from '../InstructionsCmp';
import FileDropZone from '../FileDropZone';

const FlowTreePlaceholderRenderer = ({ isOver, canDrop, onDrop }) => {
  return (
    <div
      className={classNames(
        'rst__placeholder',
        {
          ['rst__placeholderLandingPad']: canDrop,
          ['rst__placeholderCancelPad']: canDrop && !isOver,
          [styles.rst__placeholderLandingPad]: canDrop,
          [styles.rst__placeholderCancelPad]: canDrop && !isOver,
        },
        styles.sortabletree__placeholder,
      )}
    >
      <FileDropZone
        parentCanDrop={canDrop}
        parentIsOver={isOver}
        onDrop={onDrop}
      >
        <InstructionsCmp
            icon={AddIcon}
        >
            Add Nodes or Import JSON File
        </InstructionsCmp>
      </FileDropZone>
    </div>
  );
}

export default FlowTreePlaceholderRenderer;