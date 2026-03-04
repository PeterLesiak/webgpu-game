import { Scene } from '~/Scene';

const canvas = document.createElement('canvas');
document.body.append(canvas);

const scene = new Scene(canvas);

let timestamp = performance.now();

requestAnimationFrame(update);

function update(now: number) {
  requestAnimationFrame(update);

  const deltaTime = (now - timestamp) / 1000;
  timestamp = now;

  scene.update(deltaTime);
  scene.render();
}
