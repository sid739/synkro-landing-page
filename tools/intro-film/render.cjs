// node render.cjs <width> <height> <out.mp4|out.webm>  (serve this folder on :8765 first)
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const [w, h, out] = [Number(process.argv[2]), Number(process.argv[3]), process.argv[4]];
const FPS = 30;
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 400, height: 300 } });
  p.on('pageerror', e => console.error('page', e.message));
  await p.goto('http://localhost:8765/render.html');
  await p.evaluate(([w, h]) => window.setup(w, h), [w, h]);
  const LEN = await p.evaluate(() => window.LEN);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-',
    '-an', ...(out.endsWith('.webm')
      ? ['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', process.env.CRF || '36', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p']
      : ['-c:v', 'libx264', '-preset', 'slow', '-crf', process.env.CRF || '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart']), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let n = 0; n < FPS * LEN; n++) {
    const url = await p.evaluate(([t, n]) => window.frame(t, n), [n / FPS, n]);
    const buf = Buffer.from(url.split(',')[1], 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await b.close();
})();
