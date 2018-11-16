import PropTypes from 'prop-types';
import React from 'react';
import ConfigurationTreeRow from './../ConfigurationTreeRow/ConfigurationTreeRow';

const ConfigurationTree = (props) => {
  const {
    nodes,
    onNodeClick,
  } = props;

  // ConfigurationTreeRow component renders next rows recursively
  return (<ConfigurationTreeRow nodes={nodes} onNodeClick={onNodeClick} firstRow />);
};

ConfigurationTree.propTypes = {
  nodes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onNodeClick: PropTypes.func.isRequired,
};

export default ConfigurationTree;
