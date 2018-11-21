import PropTypes from 'prop-types';
import React from 'react';

import ConfigurationTreeRow from './../ConfigurationTreeRow/ConfigurationTreeRow';

require(`./ConfigurationTree.${process.env.NODE_ENV === 'storybook' ? 'scss' : 'css'}`);

function appendBreadcrumbs(nodes, breadcrumbs) {
  const node = (nodes || []).find(n => (n.nodes && n.nodes.length > 0));

  if (node) {
    if (node.type === 'Area') {
      breadcrumbs.push({ name: node.name, active: node.state === 'clicked' });
    }
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
        {
          breadcrumbs.map(({ name, active }, index) => (
            <button
              className={`ct-breadcrumbs__element${active ? ' ct-breadcrumbs__element--active' : ''}`}
              onClick={() => window.scrollTo({ left: 0, top: index === 0 ? 0 : (index * 200) + 110, behavior: 'smooth' })}
              key={index} // eslint-disable-line react/no-array-index-key
            >
              { name }
            </button>
          ))
         }
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
