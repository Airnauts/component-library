import PropTypes from 'prop-types';
import React from 'react';
import Scrollchor from 'react-scrollchor';

import ConfigurationTreeRow from './../ConfigurationTreeRow/ConfigurationTreeRow';

require(`./ConfigurationTree.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

function appendBreadcrumbs(nodes, breadcrumbs) {
  const node = (nodes || []).find(n => (n.nodes && n.nodes.length > 0));

  if (node) {
    breadcrumbs.push(node.name);
    appendBreadcrumbs(node.nodes, breadcrumbs);
  }
}

const ConfigurationTree = (props) => {
  const {
    nodes,
    onNodeClick,
  } = props;

  const breadcrumbs = [];
  appendBreadcrumbs(nodes, breadcrumbs);

  // ConfigurationTreeRow component renders next rows recursively
  return (
    <React.Fragment>
      <div className="ct-breadcrumbs__container">
        { breadcrumbs.map(name => <Scrollchor to={`#ct-anchor-${name}`} key={name} className="ct-breadcrumbs__element">{ name }</Scrollchor>) }
      </div>
      <ConfigurationTreeRow nodes={nodes} onNodeClick={onNodeClick} firstRow id={`#ct-anchor-${breadcrumbs[0]}`} />
    </React.Fragment>
  );
};

ConfigurationTree.propTypes = {
  nodes: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onNodeClick: PropTypes.func.isRequired,
};

export default ConfigurationTree;
