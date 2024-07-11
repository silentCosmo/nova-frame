// components/Icon.js
import React from 'react';

const Icon = ({ name, className, width = '1em', height = '1em' }) => {
    switch (name) {
        case 'scrollDown':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" className={className}>
                    <path fill="currentColor" d="M2.5 10H6V3h8v7h3.5L10 17.5z"></path>
                </svg>
            );
        case 'copy':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 15" className={className}>
                    <path fill="currentColor" fillRule="evenodd" d="M1 9.5A1.5 1.5 0 0 0 2.5 11H4v-1H2.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5V4H5.5A1.5 1.5 0 0 0 4 5.5v7A1.5 1.5 0 0 0 5.5 14h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H11V2.5A1.5 1.5 0 0 0 9.5 1h-7A1.5 1.5 0 0 0 1 2.5zm4-4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" clipRule="evenodd"></path>
                </svg>
            );
        case 'send':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 20 20" className={className}>
                    <path fill="currentColor" d="M18.64 2.634L.984 8.856c-.284.1-.347.345-.01.479l3.796 1.521l2.25.901l10.984-8.066c.148-.108.318.095.211.211l-7.871 8.513v.002l-.452.503l.599.322l4.982 2.682c.291.156.668.027.752-.334l2.906-12.525c.079-.343-.148-.552-.491-.431M7 17.162c0 .246.139.315.331.141c.251-.229 2.85-2.561 2.85-2.561L7 13.098z"></path>
                </svg>
            );
        case 'delete':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024" className={className}>
                    <path fill="currentColor" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32zm448-64v-64H416v64zM224 896h576V256H224zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32m192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32"></path>
                </svg>
            );
        case 'menu':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24" className={className}>
                    <path fill="currentColor" d="M2 18h7v2H2zm0-7h9v2H2zm0-7h20v2H2zm18.674 9.025l1.156-.391l1 1.732l-.916.805a4 4 0 0 1 0 1.658l.916.805l-1 1.732l-1.156-.391a4 4 0 0 1-1.435.83L19 21h-2l-.24-1.196a4 4 0 0 1-1.434-.83l-1.156.392l-1-1.732l.916-.805a4 4 0 0 1 0-1.658l-.916-.805l1-1.732l1.156.391c.41-.37.898-.655 1.435-.83L17 11h2l.24 1.196a4 4 0 0 1 1.434.83M18 18a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path>
                    </svg>
            );
        default:
            return null;
    }
};

export default Icon;
