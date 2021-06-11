import React from 'react'
import {Carousel} from 'react-responsive-carousel';

export default class GalleryImages extends React.Component {
    render() {
        if (this.props.images != null) {
            const listItems = this.props.images.map((image) =>
                <div key={image.id}>
                    <img alt={image.name} src={image.url}/>
                    <p>{image.name}</p>
                </div>
            );

            return (
                <Carousel autoPlay>
                    {listItems}
                </Carousel>
            )
        }

        return (
            <div>
                <h3>No Images</h3>
            </div>
        )
    }
}
