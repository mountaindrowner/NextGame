/**
 * Phaser touches a real <canvas> 2D/WebGL context during its import-time device
 * detection (CanvasFeatures / Features). happy-dom ships a canvas element but no
 * drawing context, so getContext() returns null and Phaser throws. This stub
 * installs a permissive, no-op 2D context (and a null-ish WebGL probe) BEFORE
 * Phaser loads, so scene modules import cleanly under the happy-dom environment.
 *
 * It does not render anything — it exists only to let the headless
 * scene-lifecycle tests construct real scenes in node.
 */
export function installCanvasStub(): void {
  const g = globalThis as unknown as {
    HTMLCanvasElement?: { prototype: Record<string, unknown> };
    CanvasRenderingContext2D?: unknown;
    window?: Record<string, unknown>;
  };
  const proto = g.HTMLCanvasElement?.prototype;
  if (!proto) return;

  // Phaser's Features detection gates the CANVAS renderer on the mere existence
  // of window.CanvasRenderingContext2D, which happy-dom doesn't ship. Define a
  // marker so Features.canvas === true and the renderer boots.
  if (!g.CanvasRenderingContext2D) {
    const Ctor = function CanvasRenderingContext2D(): void {
      /* marker only */
    };
    g.CanvasRenderingContext2D = Ctor;
    if (g.window) g.window['CanvasRenderingContext2D'] = Ctor;
  }

  const ctx2d = (): Record<string, unknown> => {
    const noop = (): void => undefined;
    return {
      canvas: { width: 1, height: 1 },
      fillRect: noop,
      clearRect: noop,
      getImageData: (_x: number, _y: number, w: number, h: number) => ({
        data: new Uint8ClampedArray(Math.max(1, w) * Math.max(1, h) * 4),
        width: w,
        height: h,
      }),
      putImageData: noop,
      createImageData: () => ({ data: new Uint8ClampedArray(4) }),
      setTransform: noop,
      drawImage: noop,
      save: noop,
      fillText: noop,
      restore: noop,
      beginPath: noop,
      moveTo: noop,
      lineTo: noop,
      closePath: noop,
      stroke: noop,
      translate: noop,
      scale: noop,
      rotate: noop,
      arc: noop,
      fill: noop,
      measureText: () => ({ width: 0 }),
      transform: noop,
      rect: noop,
      clip: noop,
      createLinearGradient: () => ({ addColorStop: noop }),
      createPattern: () => ({}),
      globalCompositeOperation: 'source-over',
      globalAlpha: 1,
      fillStyle: '#000',
      strokeStyle: '#000',
    };
  };

  proto['getContext'] = function getContext(kind: string): unknown {
    if (kind === '2d') return ctx2d();
    return null; // force Phaser into a canvas (non-WebGL) detection path
  };
  if (!proto['toDataURL']) proto['toDataURL'] = (): string => 'data:image/png;base64,';

  // Phaser's loader pulls textures with `new Image(); img.src = url`. Under
  // happy-dom that hits the network (ECONNREFUSED spam for unseeded assets that
  // the scenes are written to do without). Replace Image with a stub that fails
  // the load locally, so Phaser takes its rectangle-placeholder fallback path
  // quietly. Tests that need a real texture seed it into the cache directly.
  const win = (globalThis as unknown as { window?: Record<string, unknown> }).window;
  class StubImage {
    onload: (() => void) | null = null;
    onerror: ((e?: unknown) => void) | null = null;
    width = 0;
    height = 0;
    private _src = '';
    crossOrigin: string | null = null;
    addEventListener(type: string, cb: () => void): void {
      if (type === 'load') this.onload = cb;
      if (type === 'error') this.onerror = cb;
    }
    removeEventListener(): void {
      /* no-op */
    }
    set src(v: string) {
      this._src = v;
      // Phaser's own boot textures (__DEFAULT/__MISSING/__WHITE) arrive as
      // embedded data: URIs — those must "load" or the TextureManager has no
      // frames. Network (http) assets fail quietly into the fallback path.
      if (v.startsWith('data:')) {
        this.width = 1;
        this.height = 1;
        setTimeout(() => this.onload?.(), 0);
      } else {
        setTimeout(() => this.onerror?.(new Error('stubbed image load')), 0);
      }
    }
    get src(): string {
      return this._src;
    }
  }
  (globalThis as unknown as { Image: unknown }).Image = StubImage;
  if (win) win['Image'] = StubImage;

  // Phaser fetches image/atlas/audio bytes with XHR (responseType 'blob'); under
  // happy-dom that opens a real socket to the (absent) dev server. Stub XHR to
  // fail fast with no network so the loader drops to its fallbacks. Seeded JSON
  // never reaches here — preload skips a load when the cache already has the key.
  class StubXHR {
    onload: ((xhr: unknown) => void) | null = null;
    onerror: ((xhr: unknown) => void) | null = null;
    onprogress: (() => void) | null = null;
    ontimeout: (() => void) | null = null;
    readyState = 0;
    status = 0;
    response: unknown = null;
    responseType = '';
    timeout = 0;
    open(): void {
      /* no-op */
    }
    setRequestHeader(): void {
      /* no-op */
    }
    addEventListener(): void {
      /* no-op */
    }
    removeEventListener(): void {
      /* no-op */
    }
    getAllResponseHeaders(): string {
      return '';
    }
    abort(): void {
      /* no-op */
    }
    send(): void {
      setTimeout(() => {
        this.readyState = 4;
        this.status = 0;
        this.onerror?.(this);
      }, 0);
    }
  }
  (globalThis as unknown as { XMLHttpRequest: unknown }).XMLHttpRequest = StubXHR;
  if (win) win['XMLHttpRequest'] = StubXHR;
}
