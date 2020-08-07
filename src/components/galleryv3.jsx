import React, { useState, useCallback, Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import "./galleryv3.scss";

const size = [
  [1, 1],
  [16, 9],
  [1, 1],
  [16, 9],
  [16, 9],
  [1, 1],
  [1, 1],
  [1, 1],
  [8, 5],
  [1, 1],
  [1, 1],
  [379, 384],
  [1, 1],
  [1, 1],
  [270, 209],
  [1920, 1487],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [8, 5],
  [1, 1]
];

class Masonary extends Component {
  state = {
    images: [],
    gallery2: [],
    rendered: false,
    currentImage: 0,
    viewerIsOpen: false
  };

  constructor(props) {
    super(props);

    this.updateRendered = this.updateRendered.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  importAll(r) {
    return r.keys().map(r);
  }

  componentDidMount() {
    this.setState({
      images: this.importAll(
        require.context("../resources/gallery/", false, /\.(png|jpe?g|svg)$/)
      )
    });
  }

  updateRendered() {
    if (!this.state.rendered) {
      this.setState({
        rendered: true
      });
    }
  }

  openLightbox(event, { photo, index }){
    // this.state.setCurrentImage(index);
    // this.state.setViewerIsOpen(true);
    // //console.log("THE INDEX IS", index)
    this.setState({
      currentImage: index,
      viewerIsOpen: true
    });
}

  closeLightbox() {
    this.setState({
      currentImage: 0,
      viewerIsOpen: false
    });
  }

  getDimensions(_src) {
    // //console.log(_src);
    React.createElement("img", {
      src: _src,
      ref: image => {
        // //console.log(image);
        return image.offsetWidth, image.offsetHeight;
      }
    });
  }

  componentWillMount(){
      document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
      // //console.log("target", e.target.className)
      if(e.target.classList.contains("gallery-container") || e.target.classList.contains("half") || e.target.classList.contains("textHolder")){
          this.props.closeGallery();
      }
  }

  componentDidUpdate() {
    // //console.log(this.state.images);
    let temp = [];
    let x = 0;
    if (!this.state.rendered) {
      var counter = 0;
      for (x in this.state.images) {
        // //console.log(x);loca
        var source = require(`../resources/gallery` +
          String(
            this.state.images[x].replace("static/media/", "").split(".")[0]
          ) +
          "." +
          String(
            this.state.images[x].replace("static/media/", "").split(".")[2]
          ));
        var height,
          width = this.getDimensions(source);
        // //console.log("HEIGHT: ", height, " WIDTH: ", width);
        var img = {
          src: source,
          width: size[counter][0],
          height: size[counter][1]
        };
        // //console.log(img);
        temp.push(img);
        counter += 1;
      }
      this.setState({
        gallery2: temp
      });
      this.updateRendered();
    }
  }

  render() {
    return (
      <div
        className={`gallery-container ${this.props.section} ${this.props.open}`}
      >
        {/* <div className="close-gallery" onClick={this.props.closeGallery}>
          <span>X</span>
        </div> */}
        <div className={`gallery-holder ${this.props.open}`} onMouseEnter={this.props.triggerHover} onMouseLeave={this.props.offHover} >
          <Gallery photos={this.state.gallery2} onClick={this.openLightbox} />
          <ModalGateway>
            {this.state.viewerIsOpen ? (
              <Modal onClose={this.closeLightbox} allowFullscreen={false}>
                <Carousel
                  currentIndex={this.state.currentImage}
                  views={this.state.gallery2}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </div>
      </div>
    );
  }
}

export default Masonary;
