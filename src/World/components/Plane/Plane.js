import { Object3D, PerspectiveCamera, Scene, DirectionalLight, HemisphereLight, Color } from 'three';
import { animate } from 'popmotion';
import { createMeshes } from './meshes.js';
import { createAxesHelper, createGridHelper } from '../helpers';
import { createControls } from '../../systems/controls';

class Plane {
  container;
  camera;
  scene;
  image;
  light;
  renderer;
  controls;
  meshes;
  type;

  constructor(el, renderer, variation) {
    this.type = variation;
    this.container = el;
    this.renderer = renderer;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(45, 2, 0.1, 100);
    this.meshes = createMeshes(el, variation);
    let zoom = 2;

    if (variation === 'slide') {
      zoom = 3.7;
    }

    const directional = new DirectionalLight('white', 4);

    directional.position.set(0, 0, -5);
    this.camera.position.set(0, 0, zoom);

    this.controls = createControls(this.camera, this.container);
    this.meshes.plane.position.set(0, 0, 0.2);
    this.camera.lookAt(this.meshes.plane);
    this.scene.add(directional, this.meshes.plane);

    if (this.type === 'plane') {
      this.container.parentElement.addEventListener('mouseenter', this.onTouchDown.bind(this));
      this.container.parentElement.addEventListener('mouseleave', this.onTouchUp.bind(this));
    } else {
      window.addEventListener('mousedown', this.onTouchDown.bind(this));
      window.addEventListener('mousemove', this.onTouchMove.bind(this));
      window.addEventListener('mouseup', this.onTouchUp.bind(this));
    }
  }

  getBounds() {
    return this.container.getBoundingClientRect();
  }

  tick(delta, time) {
    this.meshes.plane.material.uniforms.uTime.value = time;
    const rect = this.getBounds();
    this.camera.aspect = rect.width / rect.height;
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Events.
   */
  resize () {}

  onTouchDown (event) {
    this.isDown = true

    if (this.isDown) {
      animate({
        from: 0,
        to: 1.0,
        onUpdate: latest => this.meshes.plane.material.uniforms.uProgress.value = latest
      })
    }

    //this.scroll.position = this.scroll.current
    //this.start = event.touches ? event.touches[0].clientX : event.clientX
  }

  onTouchMove (event) {
    if (!this.isDown) return

    const x = event.touches ? event.touches[0].clientX : event.clientX
    const distance = (this.start - x) * 0.01

    // this.scroll.target = this.scroll.position + distance
  }

  onTouchUp (event) {
    this.isDown = false

    animate({
      from: 1.0,
      to: 0.0,
      onUpdate: latest => this.meshes.plane.material.uniforms.uProgress.value = latest
    })

    // this.onCheck()
  }
}

export { Plane };