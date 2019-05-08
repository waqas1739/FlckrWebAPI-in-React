import React, {Component} from 'react'
import axios from 'axios'

export default class Gallery extends Component {

    //Initialising
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedImage: ''
        }
    }

   // API is hardcoded so just to fetch it and display the results
    componentDidMount() {
        var _this = this;
        this.serverRequest =
            axios
                .get('https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=ca3783111609d69139840916b7a01ad2&format=json&nojsoncallback=1&per_page=5')
                .then(function(result) {
                    _this.setState({
                        items: result.data.photos.photo,
                        selectedImage: _this.imageURL(result.data.photos.photo[0])
                    })
                })
    }

    // Getting the URL for images
    imageURL(item) {
        return 'http://farm' + item.farm + '.staticflickr.com/' + item.server + '/' + item.id + '_' + item.secret + '.jpg'
    }

    selectImage(selectedImage) {
        this.setState({
            selectedImage
        })
    }

  // Including the standard render function
    render() {
        const {items, images, selectedImage} = this.state;
        return (
            <div className="gallery">
                <h1 className="gallery__title">Flickr API Component</h1>
                <div className="gallery-thumbnails">
                    {this.state.items.length ?
                        this.state.items.map((item, index) =>
                            <div key={index} onClick={this.selectImage.bind(this,this.imageURL(item))}>
                                <img className="gallery-thumbnails__img" src={this.imageURL(item)}/>
                            </div>)
                        : <div>Loading...</div>
                    }
                </div>
                <div className="gallery-main">
                    <div>
                        <img className="gallery-main__img" src={selectedImage} />
                    </div>
                </div>
            </div>
        )
    }
}