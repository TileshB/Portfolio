// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import ReactDom from "react-dom";
// import styled from 'styled-components'
// import GLTFLoader from 'three-gltf-loader'
// import * as THREE from "three";

// // import EffectComposer, {
// //     RenderPass,
// //     // ShaderPass,
// //   } from '@johh/three-effectcomposer'
// //   import GlitchPass from '../passes/GlitchPass'

// import {
//     EffectComposer,
//     EffectPass,
//     RenderPass,
//     GlitchEffect,
//   } from "postprocessing";

// const Container = styled.div`
//   canvas {
//     width: 100% !important;
//     height: auto !important;
//     position: absolute;
//     bottom: 0;
//   }
// `;

// class ThreeD2 extends Component {
//     static propTypes = {
//         localOnly: PropTypes.bool,
//         src: PropTypes.string.isRequired,
//         lightPos: PropTypes.shape({
//           x: PropTypes.number.isRequired,
//           y: PropTypes.number.isRequired,
//           z: PropTypes.number.isRequired,
//         }),
//         cameraPos: PropTypes.shape({
//           x: PropTypes.number.isRequired,
//           y: PropTypes.number.isRequired,
//           z: PropTypes.number.isRequired,
//         }),
//         cameraPosResponsive: PropTypes.object,
//         rotationOffset: PropTypes.shape({
//           x: PropTypes.number.isRequired,
//           y: PropTypes.number.isRequired,
//         }),
//         rotationSpeed: PropTypes.shape({
//           x: PropTypes.number.isRequired,
//           y: PropTypes.number.isRequired,
//         }),
//         meshIndex: PropTypes.number,
//         partyModeEnabled: PropTypes.bool,
//         onPartyModeEngaged: PropTypes.func,
//         renderSize: PropTypes.shape({
//           width: PropTypes.number.isRequired,
//           height: PropTypes.number.isRequired,
//         }),
//         applyGlitch: PropTypes.bool,
//       }

//       static defaultProps = {
//         cameraPos: {
//           x: -5,
//           y: 2.3,
//           z: 10,
//         },
//         lightPos: {
//           x: 0,
//           y: 0,
//           z: 30,
//         },
//         rotationOffset: {
//           x: 0,
//           y: -0.3,
//         },
//         rotationSpeed: {
//           x: 0.3,
//           y: 0.5,
//         },
//         meshIndex: 2,
//         partyModeEnabled: false,
//         onPartyModeEngaged: () => {},
//         cameraPosResponsive: {},
//         applyGlitch: true,
//       }
//   state = {};

//   constructor(props) {
//     super(props);
//     this.animate = this.animate.bind(this)
//     this.onMouseMove = this.onMouseMove.bind(this)
//     this.onWidowResize = this.onWidowResize.bind(this)
//     this.disablePartyMode = this.disablePartyMode.bind(this)
//     this.onDeviceOrientation = this.onDeviceOrientation.bind(this)

//     this.xRotation = 0
//     this.yRotation = 0
//     this.prevMeshXRotation = 0
//     this.prevMeshYRotation = 0

//     this.partyCount = 0
//     this.isUp = false
//     this.partyModeUp = false
//   }

//   get mouseListener() {
//     if (this.props.localOnly) {
//       return this.root
//     } else {
//       return window
//     }
//   }

//   componentDidMount() {
//     // === THREE.JS CODE START ===
//     /* needed for FXAA shader */
//     window.THREE = THREE

//     const { src, lightPos, meshIndex, renderSize } = this.props

//     let width = this.root.clientWidth
//     let height = this.root.clientHeight
//     if (renderSize) {
//       width = renderSize.width
//       height = renderSize.height
//     }

//     const clock = new THREE.Clock()
//     this.clock = clock

//     this.scene = new THREE.Scene()
//     this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)

//     const light = new THREE.PointLight('#f0f0f0', 1, 100)
//     light.position.set(lightPos.x, lightPos.y, lightPos.z)
//     this.scene.add(light)

//     const ambientLight = new THREE.AmbientLight(0x404040)
//     this.scene.add(ambientLight)

//     const rockLight1 = new THREE.SpotLight(0xf441df, 0, 1000, Math.PI / 40, 0.5)
//     rockLight1.position.set(50, 50, 30)

//     const rockLight2 = new THREE.SpotLight(0x419df4, 0, 1000, Math.PI / 40, 0.5)
//     rockLight2.position.set(-50, 50, 30)

//     const rockLight3 = new THREE.SpotLight(0xff352b, 0, 1000, Math.PI / 40, 0.5)
//     rockLight3.position.set(0, -50, 0)

//     this.rockLight1 = rockLight1
//     this.rockLight2 = rockLight2
//     this.rockLight3 = rockLight3

//     this.scene.add(rockLight1)
//     this.scene.add(rockLight2)
//     this.scene.add(rockLight3)

//     // this.scene.fog = new THREE.Fog('#333333', 8, 12)

//     const loader = new GLTFLoader()
//     loader.load(
//       src,
//       gltf => {
//         this.mesh = gltf.scene.children[meshIndex]

//         this.mesh.material = new THREE.MeshLambertMaterial({
//           color: '#323232',
//         })

//         this.scene.add(this.mesh)
//       },
//       undefined,
//       error => {
//         console.error(error)
//       }
//     )

//     this.setCameraPos()

//     this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
//     this.renderer.setClearColor(0x000000, 0)
//     this.renderer.setSize(width, height)

//     this.composer = new EffectComposer(this.renderer)

//     const renderPass = new RenderPass(this.scene, this.camera)
//     this.composer.addPass(renderPass)

//     // this.glitchPass = new GlitchEffect({
//     //   applyGlitch: this.props.applyGlitch,
//     //   showNoise: false,
//     //   frequencyDivider: 10,
//     // })
//     this.effectPass = new EffectPass(this.camera, new GlitchEffect());
//     this.effectPass.renderToScreen = true
//     this.composer.addPass(this.effectPass)

//     // const resolution = new THREE.Vector2(height, width)
//     // const fxaaShader = new ShaderPass(FXAAShader({ resolution }))
//     // fxaaShader.renderToScreen = true
//     // this.composer.addPass(fxaaShader)

//     this.root.appendChild(this.renderer.domElement)

//     this.mouseListener.addEventListener('mousemove', this.onMouseMove)
//     window.addEventListener('resize', this.onWidowResize, false)
//     window.addEventListener(
//       'deviceorientation',
//       this.onDeviceOrientation,
//       false
//     )

//     this.start()
//     // === THREE.JS EXAMPLE CODE END ===
//   }

//   setCameraPos() {
//     const { cameraPos, cameraPosResponsive } = this.props
//     const width = this.root.clientWidth
//     let currCameraPos = cameraPos
//     for (const breakPoint in cameraPosResponsive) {
//       if (width >= parseFloat(breakPoint)) {
//         currCameraPos = cameraPosResponsive[breakPoint]
//       }
//     }
//     this.camera.position.x = currCameraPos.x
//     this.camera.position.y = currCameraPos.y
//     this.camera.position.z = currCameraPos.z
//   }

//   enablePartyMode() {
//     this.rockLight1.intensity = 6
//     this.rockLight2.intensity = 3
//     this.rockLight3.intensity = 7
//   }

//   disablePartyMode() {
//     this.rockLight1.intensity = 0
//     this.rockLight2.intensity = 0
//     this.rockLight3.intensity = 0
//   }

//   componentDidUpdate(prevProps) {
//     if (!prevProps.partyModeEnabled && this.props.partyModeEnabled) {
//       this.enablePartyMode()
//       this.mouseListener.removeEventListener('mousemove', this.onMouseMove)
//       window.removeEventListener('deviceorientation', this.onDeviceOrientation)
//     } else {
//       this.disablePartyMode()
//     }
//   }

//   componentWillUnmount() {
//     this.stop()
//     this.root.removeChild(this.renderer.domElement)
//     this.mouseListener.removeEventListener('mousemove', this.onMouseMove)
//     window.removeEventListener('resize', this.onWidowResize)
//     window.removeEventListener('deviceorientation', this.onDeviceOrientation)
//   }

//   renderScene() {
//     const dimensions = this.root.getBoundingClientRect()
//     const yOffset = dimensions.y + dimensions.height
//     if (yOffset > 0 && this.root.offsetParent !== null) {
//       this.composer.render()
//     }
//   }

//   animate() {
//     const { rotationOffset, rotationSpeed } = this.props
//     if (this.mesh) {
//       if (this.deviceRotationX && !this.props.partyModeEnabled) {
//         this.mesh.rotation.y =
//           (this.deviceRotationY * 3.3 - 1.6) * rotationSpeed.y +
//           rotationOffset.y
//         this.mesh.rotation.x =
//           (this.deviceRotationX * 3.6 - 1.6) * rotationSpeed.x +
//           rotationOffset.x
//       } else {
//         this.mesh.rotation.y =
//           this.yRotation * rotationSpeed.y + rotationOffset.y
//         this.mesh.rotation.x =
//           this.xRotation * rotationSpeed.x + rotationOffset.x
//       }

//       if (
//         this.prevMeshXRotation !== this.mesh.rotation.x ||
//         this.prevMeshYRotation !== this.mesh.rotation.y
//       ) {
//         this.partyCount += 0.04
//       }

//       this.prevMeshXRotation = this.mesh.rotation.x
//       this.prevMeshYRotation = this.mesh.rotation.y

//       if (this.partyCount > 5) {
//         if (!this.props.partyModeEnabled) {
//           this.partyCount = 0
//           this.props.onPartyModeEngaged()
//         }
//       }
//     }

//     this.partyCount -= 0.0001 * this.clock.getDelta()
//     if (this.partyCount < 0) {
//       this.partyCount = 0
//     }

//     if (this.props.partyModeEnabled) {
//       const intensityChange = 0.7
//       if (this.rockLight1) {
//         if (this.goingUp) {
//           this.rockLight1.intensity += intensityChange
//           this.rockLight2.intensity += intensityChange
//           this.rockLight3.intensity += intensityChange
//         } else {
//           this.rockLight1.intensity -= intensityChange
//           this.rockLight2.intensity -= intensityChange
//           this.rockLight3.intensity -= intensityChange
//         }
//       }

//       if (this.rockLight1.intensity > 7) {
//         this.goingUp = false
//       } else if (this.rockLight1.intensity < 2) {
//         this.goingUp = true
//       }

//       if (this.xRotation < 0) {
//         this.partyModeUp = false
//       } else if (this.xRotation > 0.9) {
//         this.partyModeUp = true
//       }

//       if (this.partyModeUp) {
//         this.xRotation -= 0.02
//       } else {
//         this.xRotation += 0.02
//       }
//     }
//     this.renderScene()
//     this.frameId = window.requestAnimationFrame(this.animate)
//   }

//   start() {
//     if (!this.frameId) {
//       this.frameId = window.requestAnimationFrame(this.animate)
//     }
//   }

//   stop() {
//     window.cancelAnimationFrame(this.frameId)
//     this.frameId = null
//   }

//   onMouseMove(e) {
//     this.yRotation = e.clientX / this.root.clientWidth
//     this.xRotation = e.clientY / this.root.clientHeight
//   }

//   onDeviceOrientation(e) {
//     this.deviceRotationZ = e.alpha / 360
//     this.deviceRotationX = (e.beta + 180) / 360
//     this.deviceRotationY = (e.gamma + 90) / 180
//   }

//   onWidowResize() {
//     if (!this.props.renderSize) {
//       const width = this.root.clientWidth
//       const height = this.root.clientHeight

//       this.setCameraPos()

//       this.camera.aspect = width / height
//       this.camera.updateProjectionMatrix()
//       this.renderer.setSize(width, height)
//     }
//   }

//   render() {
//     return (
//       <Container
//         style={{
//           width: "100%",
//           height: "100%",
//           position: "absolute",
//           top: 0,
//           zIndex: 0
//         }}
//         ref={ref => (this.root = ref)}
//       />
//     );
//   }
// }

// export default ThreeD2;
