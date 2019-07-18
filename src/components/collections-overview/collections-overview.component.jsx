import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import './collections-overview.styles.scss';
import CollectionPreview from '../collection-preview/collection-preview.component'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

const CollectionsOverview = ({ collections }) => {
    console.log('=====');
    console.log(collections)
    return (
    <div className="collections-overview">
        {
            collections.map(({id, ...otherCollectionProps}) => {
                return <CollectionPreview key={id} {...otherCollectionProps} />
            })
        }
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);