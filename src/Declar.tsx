import React, { FC } from 'react';
import MyEnvConfig from './EnvConfig/MyEnvConfig'

import Helper from './Model/Helper'

const Declar: FC = () => {
    return (
        <div className="row">
            <div className="mx-auto w-50">
                <div style={{fontSize: 15}}>
                    This React app is about Pokémon. It is adapted from ch.6
                    of <a target="_blank" rel="noreferrer" href="https://github.com/PacktPublishing/React-17-Design-Patterns-and-Best-Practices-Third-Edition">
                        this book
                    </a> and built from:
                    <ul>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://pokeapi.co/">
                                PokéAPI
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://github.com/vercel/swr">
                            SWR
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://github.com/styled-components/styled-components">
                                styled-components
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://github.com/wix/pro-gallery">
                                Pro Gallery
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://github.com/xiaolin/react-image-gallery">
                                React Image Gallery
                            </a>
                        </li>
                        <li>
                            <a target="_blank" rel="noreferrer" href="https://react-spring.io/">
                                react-spring
                            </a>
                        </li>
                    </ul>
                </div>
                <p>Developed by Chan Ching Yin.<span style={{ float: 'right' }}>
                    {`v${process.env.REACT_APP_VERSION}.${MyEnvConfig.EnvName}`}
                    </span>
                    </p>
                <br />
                <br />
            </div>
            <hr/>
        </div>
    );
}

export default Declar;