import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const Particle = () => {

    const [load, setload] = useState(false);
    const [resize, setResize] = useState(window.innerWidth);


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        })
        .then(() => {
            setload(true);
        })
    }, []);

    addEventListener("resize", (event) => {
        setResize(window.innerWidth);
    });


    return (
        <div className="particles">
            {load && <Particles
            options={{
                interactivity : {
                    events : {
                        onHover : {
                            enable : true,
                            mode : "repulse",
                        },
                    }
                },
                particles : {
                    links : {
                        enable : true,
                        distance : 100,
                        opacity : 0.5,
                        color : "#ffffff"
                    },
                    opacity : {
                        value : 1.5,
                    },
                    size : {
                        value : {min : 1, max : 2}
                    },
                    number : {
                        value : (resize / 10),
                    },
                    move : {
                        enable : true,
                        speed : 4
                    },
    
                }
            }}
        />}
        </div>
    )
};

export default Particle