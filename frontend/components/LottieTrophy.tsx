import React, { useEffect, useRef } from 'react';
// Correctly import lottie-web as a default import
import lottie from 'lottie-web';

// Animation data for the trophy
const animationData = {"v":"5.7.4","fr":30,"ip":0,"op":60,"w":1024,"h":1024,"nm":"Trophy","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Trophy Outlines","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[512,512,0],"ix":2},"a":{"a":0,"k":[512,512,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ddd":0,"ind":0,"ty":"gr","nm":"Trophy Group","it":[{"ddd":0,"ind":0,"ty":"sh","nm":"Base","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[341.333,832],[682.667,832]],"c":false},"ix":2},"hd":false},{"ddd":0,"ind":1,"ty":"sh","nm":"Stand","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[512,832],[512,576]],"c":false},"ix":2},"hd":false},{"ddd":0,"ind":2,"ty":"sh","nm":"Cup","ks":{"a":0,"k":{"i":[[0,117.824],[0,-117.824],[-117.824,0],[117.824,0]],"o":[[0,-117.824],[0,117.824],[117.824,0],[-117.824,0]],"v":[[512,362.667],[512,576],[725.333,576],[320,576]],"c":true},"ix":2},"hd":false},{"ddd":0,"ind":3,"ty":"sh","nm":"Left Handle","ks":{"a":0,"k":{"i":[[0,0],[-47.13,0],[0,47.13],[47.13,0],[0,0]],"o":[[0,0],[47.13,0],[0,-47.13],[-47.13,0],[0,0]],"v":[[320,576],[320,490.667],[234.667,490.667],[234.667,405.333],[320,405.333]],"c":true},"ix":2},"hd":false},{"ddd":0,"ind":4,"ty":"sh","nm":"Right Handle","ks":{"a":0,"k":{"i":[[0,0],[47.13,0],[0,-47.13],[-47.13,0],[0,0]],"o":[[0,0],[-47.13,0],[0,47.13],[47.13,0],[0,0]],"v":[[725.333,576],[725.333,490.667],[810.667,490.667],[810.667,405.333],[725.333,405.333]],"c":true},"ix":2},"hd":false},{"ddd":0,"ind":5,"ty":"sh","nm":"Top","ks":{"a":0,"k":{"i":[[0,0],[0,0]],"o":[[0,0],[0,0]],"v":[[320,362.667],[725.333,362.667]],"c":false},"ix":2},"hd":false},{"ddd":0,"ty":"st","nm":"Stroke","o":{"a":0,"k":100,"ix":3},"w":{"a":0,"k":42.667,"ix":4},"lc":2,"lj":2,"ml":4,"bm":0,"c":{"a":0,"k":[1,0.843,0,1],"ix":5}},{"ddd":0,"ty":"tr","nm":"Transform","o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[0,0,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6},"sk":{"a":0,"k":0,"ix":8},"sa":{"a":0,"k":0,"ix":9}}],"ip":0,"op":60,"st":0,"bm":0}],"markers":[]};

const LottieTrophy = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let anim: any = null;
        if (containerRef.current) {
            anim = lottie.loadAnimation({
                container: containerRef.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData,
            });
        }
        return () => {
            anim?.destroy();
        };
    }, []);

    // Using inline styles to set the size and margin to match the static icon it replaces.
    return <div ref={containerRef} style={{ width: 28, height: 28, marginRight: '0.5rem' }} />;
};

export default LottieTrophy;