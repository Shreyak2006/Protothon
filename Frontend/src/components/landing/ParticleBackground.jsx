import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleMesh() {
    const meshRef = useRef(null);
    const count = 1500;

    const { positions, velocities, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const cols = new Float32Array(count * 3);
        const palette = [
            [0.23, 0.51, 0.96],
            [0.55, 0.36, 0.96],
            [0.02, 0.71, 0.82],
        ];
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
            vel[i * 3] = (Math.random() - 0.5) * 0.002;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
            const c = palette[Math.floor(Math.random() * palette.length)];
            cols[i * 3] = c[0];
            cols[i * 3 + 1] = c[1];
            cols[i * 3 + 2] = c[2];
        }
        return { positions: pos, velocities: vel, colors: cols };
    }, []);

    const positionAttr = useMemo(
        () => new THREE.BufferAttribute(positions, 3),
        [positions]
    );
    const colorAttr = useMemo(
        () => new THREE.BufferAttribute(colors, 3),
        [colors]
    );

    useFrame((state) => {
        if (!meshRef.current) return;
        const geo = meshRef.current.geometry;
        const posArr = geo.getAttribute("position").array;

        for (let i = 0; i < count; i++) {
            posArr[i * 3] += velocities[i * 3];
            posArr[i * 3 + 1] += velocities[i * 3 + 1];
            posArr[i * 3 + 2] += velocities[i * 3 + 2];
            if (Math.abs(posArr[i * 3]) > 10) velocities[i * 3] *= -1;
            if (Math.abs(posArr[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
            if (Math.abs(posArr[i * 3 + 2]) > 5) velocities[i * 3 + 2] *= -1;
        }
        geo.getAttribute("position").needsUpdate = true;

        meshRef.current.rotation.x =
            Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <primitive object={positionAttr} attach="attributes-position" />
                <primitive object={colorAttr} attach="attributes-color" />
            </bufferGeometry>
            <pointsMaterial
                size={0.04}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: "high-performance",
                }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.3} />
                <ParticleMesh />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)] opacity-40" />
        </div>
    );
}
