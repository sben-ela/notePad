import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

const Particle = () => {
    const [ init, setInit ] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
        <div className="particles">
            <Particles
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
                        value : 200,
                    },
                    move : {
                        enable : true,
                        speed : 4
                    },
    
                }
            }}
        />
        </div>
    )
};

export default Particle