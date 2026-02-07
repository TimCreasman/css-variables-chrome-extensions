#!/usr/bin/env node
import * as esbuild from 'esbuild';
import { execa } from 'execa';

async function build() {

    let isDev = false;
    if (process.argv.includes('-d')) {
        isDev = true;
    }

    const config = {
        entryPoints: [
            './src/popup/popup.ts',
            './src/content/index.ts',
        ],
        outdir: './dist',
        bundle: true,
        minify: true,
        format: 'esm',
        define: {
            'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
        }
    }

    if (isDev) {
        config.minify = false;
    }

    await esbuild.build(config);
    await execa`cp -a assets/. dist/`;
}

build().catch((err) => {
    console.log(err);
    process.exit(1);
});

