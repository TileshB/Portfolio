import React, { Component } from "react";
import "./gallery-v2.scss";

class GalleryV2 extends Component {
  state = { images: [], containerWidth: 0, rendered: false, gallery: [], holdGallery: [] };
  constructor(props) {
    super(props);

    this.updateRendered = this.updateRendered.bind(this);
  }

  importAll(r) {
    return r.keys().map(r);
  }

  componentDidMount() {
    this.setState({
      images: this.importAll(
        require.context(
          "../resources/gallery/VI_Assets/",
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    });
    // this.calcWidth();
  }


  handleScroll = e =>{
    let tempGallery = this.state.gallery;
    let tempGone = this.state.holdGallery;
    tempGone.push(tempGallery.pop());
    if(tempGallery.length < 3){
        tempGallery.unshift(tempGone.shift())
    }
    this.setState({
        gallery: tempGallery,
        holdGallery: tempGone
    })
  }

  updateRendered() {
    if (!this.state.rendered) {
      this.setState({
        rendered: true
      });
    }
  }

  componentDidUpdate() {
    let galleryContainer = [];
    let holdContainer = []
      let currId = "";
      let currWidth = "";
      let topAdd = Math.floor(Math.random() * (10 - -10)) + -10;
      let leftAdd = Math.floor(Math.random() * (10 - -10)) + -10;
      let topAmount = 50 + topAdd + "%";
      let leftAmount = 50 + leftAdd + "%";
      let totalWidth = 0;
      let x = 0;
      if (!this.state.rendered) {
        for (x in this.state.images) {
          currId = "gelleryItem" + x;
          currWidth = 50 + "vw";
          let topAdd = Math.floor(Math.random() * (10 - -10)) + -10;
          let leftAdd = Math.floor(Math.random() * (10 - -10)) + -10;
          let topAmount = 50 + topAdd + "%";
          let leftAmount = 50 + leftAdd + "%";
          // currWidth = Math.floor(Math.random() * (max - min)) + min;
          // topAmount = Math.random() * 70 + "vh";
          galleryContainer = galleryContainer.concat(
            <img
              className="galleryImg"
              id={currId}
              style={{ left: leftAmount, top: topAmount }}
              src={require(`../resources/gallery/VI_Assets` +
                String(
                  this.state.images[x]
                    .replace("static/media/", "")
                    .split(".")[0]
                ) +
                "." +
                String(
                  this.state.images[x]
                    .replace("static/media/", "")
                    .split(".")[2]
                ))}
              alt=""
            />
          );
        }
        let lastBit = galleryContainer.slice(Math.max(galleryContainer.length - 3,1))
        galleryContainer.pop()
        this.setState({gallery: lastBit, holdGallery: galleryContainer})
        this.updateRendered()
    }
  }

  render() {
    return (
      <div onWheel={this.handleScroll} onTouchMove={this.handleScroll}
        className={`gallery-holder ${this.props.section} ${this.props.open} `}
      >
        {this.state.gallery.map(function(o) {
          return o;
        })}
      </div>
    );
  }
}

export default GalleryV2;
