import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors'

import { connect } from 'react-redux';

const Directory = ({ sections }) => (
    <div className="directory-menu">
        {sections.map(({id, ...otherSectionProps}) => {
            return <MenuItem key={id} {...otherSectionProps} />
        })}
    </div>
)


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory); 