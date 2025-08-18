// import React, { useEffect, useRef, useCallback } from "react";
// import * as THREE from "three";

// export default function KotaExactWebGL({
//   enabled = true,
//   className = "",
//   style = {},
// }) {
//   const containerRef = useRef(null);
//   const sceneRef = useRef(null);
//   const rendererRef = useRef(null);
//   const animationRef = useRef(null);
//   const mouseRef = useRef({ x: 0.5, y: 0.5 });

//   const handleMouseMove = useCallback((e) => {
//     if (!containerRef.current || !sceneRef.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width;
//     const y = 1.0 - (e.clientY - rect.top) / rect.height;

//     mouseRef.current = { x, y };
//     sceneRef.current.uniforms.uMouse.value.set(x, y);
//   }, []);

//   const handleResize = useCallback(() => {
//     if (!containerRef.current || !rendererRef.current || !sceneRef.current)
//       return;

//     const container = containerRef.current;
//     const renderer = rendererRef.current;
//     const { uniforms } = sceneRef.current;

//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     renderer.setSize(width, height, false);
//     uniforms.uResolution.value.set(width, height);
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current || !enabled) return;

//     const container = containerRef.current;

//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       powerPreference: "high-performance",
//     });

//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setClearColor(0x000000, 0);
//     renderer.domElement.style.display = "block";
//     renderer.domElement.style.width = "100%";
//     renderer.domElement.style.height = "100%";
//     renderer.domElement.setAttribute("data-engine", "three.js r128");

//     container.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
//     const geometry = new THREE.PlaneGeometry(2, 2);

//     // Exact KOTA shader recreation - liquid blobs with proper gradients
//     const vertexShader = `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = vec4(position, 0.7);
//       }
//     `;

//     const fragmentShader = `
//       precision highp float;
//       uniform float uTime;
//       uniform vec2 uResolution;
//       uniform vec2 uMouse;
//       varying vec2 vUv;

//       // Metaball/blob function for KOTA's liquid shapes
//       float metaball(vec2 pos, vec2 center, float radius) {
//         float dist = length(pos - center);
//         return radius / (dist * dist + 0.01);
//       }

//       // Smooth minimum for blob merging
//       float smin(float a, float b, float k) {
//         float h = max(k - abs(a - b), 0.0) / k;
//         return min(a, b) - h * h * k * (1.0 / 4.0);
//       }

//       // Rotating function
//       vec2 rotate(vec2 v, float a) {
//         float s = sin(a);
//         float c = cos(a);
//         mat2 m = mat2(c, -s, s, c);
//         return m * v;
//       }

//       void main() {
//         vec2 uv = vUv;
//         vec2 pos = (uv - 0.5) * 2.0;
//         pos.x *= uResolution.x / uResolution.y;

//         float time = uTime * 0.6;

//         // KOTA's exact color palette - bright, saturated gradients
//         vec3 pink = vec3(1.0, 0.9, 1.6);        // Hot pink
//         vec3 blue = vec3(0.2, 0.5, 1.0);        // Bright blue
//         vec3 purple = vec3(0.6, 0.2, 1.0);      // Purple
//         vec3 cyan = vec3(0.2, 0.9, 0.8);        // Cyan
//         vec3 orange = vec3(1.0, 0.6, 0.2);      // Orange
//         vec3 yellow = vec3(1.0, 0.2, 0.3);      // Yellow

//         // Create multiple animated metaballs (KOTA's blob shapes)
//         vec2 blob1Pos = vec2(
//           sin(time * 0.7) * 0.8 + cos(time * 0.3) * 0.4,
//           cos(time * 0.5) * 0.6 + sin(time * 0.8) * 0.3
//         );

//         vec2 blob2Pos = vec2(
//           cos(time * 0.9 + 2.0) * 0.7 + sin(time * 0.4 + 1.0) * 0.5,
//           sin(time * 0.6 + 3.0) * 0.8 + cos(time * 0.7 + 2.0) * 0.2
//         );

//         vec2 blob3Pos = vec2(
//           sin(time * 0.4 + 4.0) * 0.9 + cos(time * 0.9 + 3.0) * 0.3,
//           cos(time * 0.8 + 1.0) * 0.5 + sin(time * 0.3 + 4.0) * 0.7
//         );

//         vec2 blob4Pos = vec2(
//           cos(time * 0.6 + 5.0) * 0.6 + sin(time * 0.5 + 2.0) * 0.8,
//           sin(time * 1.1 + 2.0) * 0.4 + cos(time * 0.2 + 5.0) * 0.9
//         );

//         // Mouse influence on blob positions
//         vec2 mouseInfluence = (uMouse - 0.5) * 0.5;
//         blob1Pos += mouseInfluence * 0.3;
//         blob2Pos += mouseInfluence * -0.2;
//         blob3Pos += mouseInfluence * 0.4;
//         blob4Pos += mouseInfluence * -0.1;

//         // Calculate metaball values
//         float m1 = metaball(pos, blob1Pos, 0.4);
//         float m2 = metaball(pos, blob2Pos, 0.5);
//         float m3 = metaball(pos, blob3Pos, 0.3);
//         float m4 = metaball(pos, blob4Pos, 0.6);

//         // Combine metaballs with smooth blending
//         float combined = m1 + m2 + m3 + m4;

//         // Create color zones based on blob influence
//         float zone1 = smoothstep(0.3, 1.5, m1 + m3);
//         float zone2 = smoothstep(0.2, 1.2, m2 + m4);
//         float zone3 = smoothstep(0.4, 1.0, m1 + m2);
//         float zone4 = smoothstep(0.3, 0.8, m3 + m4);

//         // Dynamic color mixing like KOTA
//         vec3 color = mix(pink, blue, zone1);
//         color = mix(color, purple, zone2 * 0.7);
//         color = mix(color, cyan, zone3 * 0.6);
//         color = mix(color, orange, zone4 * 0.5);

//         // Add yellow highlights in intersection areas
//         float intersection = smoothstep(1.0, 2.5, combined);
//         color = mix(color, yellow, intersection * 0.4);

//         // Add some animated color shifts
//         float colorShift = sin(time + pos.x * 2.0 + pos.y * 1.5) * 0.1 + 0.1;
//         color += vec3(colorShift * 0.2, colorShift * -0.1, colorShift * 0.3);

//         // Brightness and contrast like KOTA
//         color *= 1.2;
//         color = pow(color, vec3(0.9));

//         // Create the blob mask with soft edges
//         float mask = smoothstep(0.3, 1.8, combined);

//         // Add subtle glow around edges
//         float glow = smoothstep(0.1, 0.5, combined) - smoothstep(0.5, 1.5, combined);
//         color += vec3(glow * 0.3);

//         // Final alpha with KOTA's transparency style
//         float alpha = mask * 0.85;

//         // Fade out at edges for seamless blending
//         float edgeFade = 1.0 - smoothstep(0.7, 1.2, length(pos));
//         alpha *= edgeFade;

//         gl_FragColor = vec4(color, alpha);
//       }
//     `;

//     const uniforms = {
//       uTime: { value: 0.0 },
//       uResolution: {
//         value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//       },
//       uMouse: { value: new THREE.Vector2(0.5, 0.5) },
//     };

//     const material = new THREE.ShaderMaterial({
//       vertexShader,
//       fragmentShader,
//       uniforms,
//       transparent: true,
//       blending: THREE.NormalBlending,
//     });

//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     sceneRef.current = { scene, camera, mesh, material, geometry, uniforms };

//     handleResize();

//     // Animation loop
//     const clock = new THREE.Clock();
//     const animate = () => {
//       uniforms.uTime.value = clock.getElapsedTime();
//       renderer.render(scene, camera);
//       animationRef.current = requestAnimationFrame(animate);
//     };
//     animate();

//     // Event listeners
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("mousemove", handleMouseMove, { passive: true });

//     return () => {
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }

//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);

//       if (sceneRef.current) {
//         const { geometry, material } = sceneRef.current;
//         geometry.dispose();
//         material.dispose();
//       }

//       if (rendererRef.current) {
//         rendererRef.current.dispose();
//         if (container.contains(rendererRef.current.domElement)) {
//           container.removeChild(rendererRef.current.domElement);
//         }
//       }
//     };
//   }, [enabled, handleResize, handleMouseMove]);

//   if (!enabled) {
//     return null;
//   }

//   const containerStyle = {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%", // Exact KOTA height
//     pointerEvents: "none",
//     zIndex: 0,
//     overflow: "hidden",
//     ...style,
//   };

//   return (
//     <div
//       ref={containerRef}
//       className={`kota-exact-webgl ${className}`}
//       style={containerStyle}
//       aria-hidden="true"
//     />
//   );
// }

import React, { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export default function KotaExactWebGL({
  enabled = true,
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || !sceneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = 1.0 - (e.clientY - rect.top) / rect.height;
    mouseRef.current = { x, y };
    sceneRef.current.uniforms.uMouse.value.set(x, y);
  }, []);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !sceneRef.current)
      return;
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const { uniforms } = sceneRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height, false);
    uniforms.uResolution.value.set(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !enabled) return;

    const container = containerRef.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vUv;

float metaball(vec2 pos, vec2 center, float radius) {
  float dist = length(pos - center);
  return radius / (dist * dist + 0.01);
}

void main() {
  vec2 uv = vUv;
  vec2 pos = (uv - 0.5) * 2.0;
  pos.x *= uResolution.x / uResolution.y;

  float time = uTime * 0.5;

  vec3 orange = vec3(1.0, 0.5, 0.0);
  vec3 blue   = vec3(0.1, 0.3, 0.9);

  // Separate blobs for each color
  vec2 orangeBlob1 = vec2(sin(time * 0.6) * 0.5, -1.2 + mod(time * 0.2, 2.4));
  vec2 orangeBlob2 = vec2(cos(time * 0.5) * 0.6, -1.4 + mod(time * 0.18, 2.8));

  vec2 blueBlob1   = vec2(sin(time * 0.7 + 1.0) * 0.6, 1.2 - mod(time * 0.2, 2.4));
  vec2 blueBlob2   = vec2(cos(time * 0.4 + 2.0) * 0.5, 1.4 - mod(time * 0.18, 2.8));

  pos.x += 0.15 * sin(pos.y * 4.0 + time);
  pos.y += 0.15 * cos(pos.x * 4.0 - time);

  // Calculate metaball strength per color
  float o1 = metaball(pos, orangeBlob1, 0.45);
  float o2 = metaball(pos, orangeBlob2, 0.55);
  float b1 = metaball(pos, blueBlob1, 0.45);
  float b2 = metaball(pos, blueBlob2, 0.55);

  float orangeField = o1 + o2;
  float blueField   = b1 + b2;

  // Separate colors — no mix
  vec3 color = vec3(0.0);
  if (orangeField > 0.3) {
    color = orange;
  }
  if (blueField > 0.3) {
    // Overlap — we keep the brighter color instead of blending
    if (blueField > orangeField) {
      color = blue;
    }
  }

  // Glow for edges
  float glowO = smoothstep(0.2, 0.6, orangeField) - smoothstep(0.6, 1.2, orangeField);
  float glowB = smoothstep(0.2, 0.6, blueField) - smoothstep(0.6, 1.2, blueField);
  color += glowO * 0.3;
  color += glowB * 0.3;

  float alpha = max(
    smoothstep(0.25, 1.2, orangeField),
    smoothstep(0.25, 1.2, blueField)
  ) * 0.9;

  gl_FragColor = vec4(color, alpha);
}
 `;

    const uniforms = {
      uTime: { value: 0.0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = { scene, camera, mesh, material, geometry, uniforms };
    handleResize();

    const clock = new THREE.Clock();
    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (sceneRef.current) {
        const { geometry, material } = sceneRef.current;
        geometry.dispose();
        material.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [enabled, handleResize, handleMouseMove]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      className={`kota-exact-webgl ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
