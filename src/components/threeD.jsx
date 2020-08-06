import React, { Component } from "react";
import * as THREE from "three";
// import * as OrbitControls from "three-orbit-controls";
import "./threeD.scss";
// import { GLTFLoader } from "three/examples/js/loaders/GLTFLoader";
import GLTFLoader from "three-gltf-loader";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
  GlitchEffect,
  PixelationEffect,
  SMAAEffect,
  NoiseEffect
} from "postprocessing";

import { Clock } from "three";

var loader = new GLTFLoader();
var run = false;

class ThreeD extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      x: 0,
      y: 0,
      models: { one: "duck", two: "hoop" }
    };
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div
        className={`threeObj ${this.props.visible}`}
        ref={el => {
          this.three = el;
        }}
      />
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.lookAt(new THREE.Vector3());

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setClearColor(0x000000, 0); // the default
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.three.appendChild(this.renderer.domElement);

    // this.directionalLight = new THREE.DirectionalLight(0xeddf96);
    // this.directionalLight.intensity = 0.2;
    // this.directionalLight.position.set(0, 20, 100).normalize();
    // this.ambientLight = new THREE.AmbientLight(0xefc900);
    // this.ambientLight.intensity = 1.1;
    // this.scene.add(this.directionalLight);
    // this.scene.add(this.ambientLight);

    ///////////////////////////// Attempt at 3 point
    this.keyLight = new THREE.PointLight(0xffffff);
    this.keyLight.position.set(-20, 20, 100).normalize();
    this.keyLight.intensity = 0.8;
    this.fillLight = new THREE.PointLight(0xffb141);
    this.fillLight.position.set(20, 20, 100);
    this.fillLight.intensity = 0.9;
    this.backLight = new THREE.PointLight(0xff9f41);
    this.backLight.position.set(-20, 0, -100).normalize();
    this.backLight.intensity = 1;
    this.scene.add(this.keyLight, this.fillLight, this.backLight);

    ///////////////////////////////////////

    this.hemisphereLight = new THREE.HemisphereLight(0xf16db4, 0x1626f2);
    // this.hemisphereLight = new THREE.HemisphereLight(0xf2168d, 0x4416f2);
    this.hemisphereLight.position.set(1, 1, 1);
    this.hemisphereLight.intensity = 0.8;
    this.scene.add(this.hemisphereLight);
    // controls = new THREE.OrbitControls(camera, renderer.domElement);

    // this.geometry = new THREE.BoxGeometry(1, 1, 1);
    // this.material = new THREE.MeshStandardMaterial({
    //   color: 0x00ff00,
    //   metalness: 0.15
    // });
    // this.cube = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.cube);
    loader.load(
      // "http://localhost:8888/models/hoop/hoop.gltf",
      "https://bernardus.co.za/iamadumbpoes/models/" +
        this.state.models[this.props.mySection] +
        "/" +
        this.state.models[this.props.mySection] +
        ".gltf",
      // "https://cdn.rawgit.com/siouxcitizen/3DModel/a1c2e475/yuusha.gltf",
      gltf => {
        // called when the resource is loaded
        // this.scene.add(gltf.scene);
        if (this.props.mySection === "one") {
          var object = gltf.scene;
          object.material = new THREE.MeshLambertMaterial({
            color: '#323232',
          })
          gltf.scene.scale.set(14, 14, 14);
          gltf.scene.position.x = 0;
          // gltf.scene.position.y = -0.08; //Position (y = up+, down-)
          gltf.scene.position.z = 0;
          gltf.scene.rotation.y = 0;
          // console.log(gltf.scene.rotation);
          this.scene.add(object);
          // console.log(gltf);
        } else if (this.props.mySection === "two") {
          var object = gltf.scene;
          gltf.scene.applyMatrix(new THREE.Matrix4().setPosition(0, 0, 0));
          gltf.scene.scale.set(1, 1, 1);
          gltf.scene.position.x = 0;
          // gltf.scene.position.y = -0.08; //Position (y = up+, down-)
          // gltf.scene.position.z = -20;
          // gltf.scene.rotation.y = 120;
          // gltf.scene.rotation.x = 0;
          // console.log(gltf.scene.rotation);
          this.scene.add(gltf.scene);
          // console.log(gltf);
        }
      },
      xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    this.camera.position.z = 5;
    this.composer = new EffectComposer(this.renderer);
    if (this.props.mySection === "one") {
      this.effectPass = new EffectPass(this.camera, new BloomEffect());
      // this.effectPass = new EffectPass(
      //   this.camera,
      //   new PixelationEffect(this.camera)
      // );
      this.effectPass.renderToScreen = true;

      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(this.effectPass);
    } else if (this.props.mySection === "two") {
      this.effectPass = new EffectPass(this.camera, new GlitchEffect());
      this.smoothPass = new EffectPass(this.camera, new SMAAEffect());
      // this.effectPass = new EffectPass(this.camera, new PixelationEffect(5.0));
      // this.noisePass = new NoiseEffect(this.camera, new NoiseEffect());
      // this.glitchPass = new EffectPass(
      //   this.camera,
      //   new PixelationEffect(this.camera)
      // );
      this.effectPass.renderToScreen = true;

      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.composer.addPass(this.effectPass);
      this.composer.addPass(this.smoothPass);
      // this.composer.addPass(this.glitchPass);
    }
    // this.renderPass = new RenderPass(this.scene, this.camera);

    // this.renderTargetParameters = {
    //   minFilter: THREE.LinearFilter,
    //   magFilter: THREE.LinearFilter,
    //   stencilBuffer: false
    // };

    // this.savePass = new SavePass(
    //   new THREE.WebGLRenderTarget(
    //     this.three.clientWidth,
    //     this.three.clientHeight,
    //     this.renderTargetParameters
    //   )
    // );

    // // blend pass
    // this.blendPass = new ShaderPass(BlendShader, "tDiffuse1");
    // blendPass.uniforms["tDiffuse2"].value = this.savePass.renderTarget.texture;
    // blendPass.uniforms["mixRatio"].value = 0.8;
    // this.blendPass = new ShaderPass(BlenderShader, "t");

    // this.outputPass = new ShaderPass(THREE.CopyShader);
    // this.outputPass.renderToScreen = true;

    // this.composer.addPass(this.renderPass);
    // // this.composer.addPass(blendPass);
    // this.composer.addPass(this.savePass);
    // this.composer.addPass(this.outputPass);
    // this.renderer.render(this.scene, this.camera);
    this.clock = new Clock();
    this.animate();
  }

  updateCam() {
    var value =
      1 -
      Math.abs(
        this.props.mouseX < this.props.mouseY
          ? this.props.mouseY
          : this.props.mouseX
      ) /
        2;

    if (this.props.open === "closed") {
      if (run === true) {
        if (this.scene.scale.x < 1) {
          var amount = 1 - this.scene.scale.x;
          amount = amount / 5;
          // console.log(amount);
          this.scene.scale.set(
            this.scene.scale.x + amount,
            this.scene.scale.y + amount,
            this.scene.scale.z + amount
          );
          if (run === true) {
            run = false;
          }
        }
      } else {
        this.scene.scale.set(1, 1, 1);
        this.scene.scale.set(value, value, value);
      }
    } else {
      if (this.scene.scale.x > 0.5) {
        var amount = this.scene.scale.x - 0.5;
        amount = amount / 5;
        // console.log(amount);
        this.scene.scale.set(
          this.scene.scale.x - amount,
          this.scene.scale.y - amount,
          this.scene.scale.z - amount
        );
        if (run === false) {
          run = true;
        }
      }
    }
    if (this.scene.rotation) {
      if (this.scene.rotation.y !== this.props.mouseX * -1) {
        var tempVar =
          this.scene.rotation.y +
          (this.props.mouseX * -1 - this.scene.rotation.y) * 0.01;
        if (tempVar > -0.5 && tempVar < 0.5) {
          this.scene.rotation.y +=
            (this.props.mouseX * -1 - this.scene.rotation.y) * 0.01;
          // console.log("Y: " + this.scene.rotation.y);
        }
      }
      if (this.scene.rotation.x > -0.5 && this.scene.rotation.x < 0.5) {
        var tempVar =
          this.scene.rotation.x +
          (this.props.mouseY * -1 - this.scene.rotation.y) * 0.01;
        if (tempVar > -0.5 && tempVar < 0.5) {
          this.scene.rotation.x +=
            (this.props.mouseY * -1 - this.scene.rotation.y) * 0.01;
          // console.log("X: " + this.scene.rotation.x);
        }
      }
    }
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.composer.render(this.clock.getDelta());
    this.updateCam();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resize operation handler, updating dimensions.
   * Setting state will invalidate the component
   * and call `componentWillUpdate()`.
   */
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  /**
   * Invalidation handler, updating layout
   */
  componentWillUpdate() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  onMouseMove = e => {
    e.preventDefault();
    this.setState({ x: e.screenX, y: e.screenY });
    console.log(this.state.x);
  };

  /**
   * Dispose
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    // this.controls.dispose();
    // delete this.controls;
  }
}

export default ThreeD;
