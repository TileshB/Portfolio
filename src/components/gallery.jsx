import React, { Component } from "react";
import "./gallery.scss";

class Gallery extends Component {
  state = { images: [], containerWidth: 0, rendered: false };

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

  shouldComponentUpdate() {
    if (this.state.rendered) {
      return false;
    } else {
      return true;
    }
  }

  calcWidth() {
    var num = this.state.images.length;
    console.log("THIS NUMBER OF IMAGES ARE ", this.state.images);
    this.setState({ containerWidth: window.innerWidth * num });
  }

  render() {
    let galleryContainer = [];
    let currId = "";
    let currWidth = "";
    let max = 800;
    let min = 450;
    let topAmount = 50 + "vh";
    let leftAmount = 0;
    let totalWidth = 0;
    let x = 0;
    for (x in this.state.images) {
      currId = "gelleryItem" + x;
      currWidth = Math.floor(Math.random() * (max - min)) + min;
      // topAmount = Math.random() * 70 + "vh";
      galleryContainer = galleryContainer.concat(
        <img
          className="galleryImg"
          id={currId}
          style={{ width: currWidth, left: leftAmount, top: topAmount }}
          src={require(`../resources/gallery/VI_Assets` +
            String(
              this.state.images[x].replace("static/media/", "").split(".")[0]
            ) +
            "." +
            String(
              this.state.images[x].replace("static/media/", "").split(".")[2]
            ))}
          alt=""
        />
      );
      totalWidth += currWidth;
      leftAmount += currWidth + 100;
    }

    totalWidth += 100 * x;
    this.setState({ rendered: true });
    // console.log(galleryContainer);
    return (
      <div className="galleryContainer" style={{ width: "100%" }}>
        {galleryContainer.map(function(o) {
          return o;
        })}
      </div>
    );
  }
}

export default Gallery;
