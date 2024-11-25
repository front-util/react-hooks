import { useEffect } from 'react';
import {iteratorToList} from '@front-utils/utils';

interface Window {
    APP_FONT_LOADING?: boolean;
}

export interface IFont {
    name: string;
    url: Promise<{default: string;}>;
    descriptors?: {
        weight: string;
    }
}
export interface LoadFontParams {
    name: string;
    path: Promise<{ default: string; }>;
    fontDescriptors: IFont['descriptors'];
    systemFonts: FontFace[];
}

const loadSingleFont = async ({
    name, 
    path,
    fontDescriptors,
    systemFonts,
}: LoadFontParams) => {
    const descriptors = {
        style  : 'normal',
        display: 'swap',
        ...fontDescriptors,
    } as const;

    try {
        const alreadyLoaded = (systemFonts ?? []).find((font) => {
            const hasSameWeight = fontDescriptors?.weight ? fontDescriptors.weight === font.weight : true;

            return font.family === name && hasSameWeight && font.status === 'loaded';
        });

        if(alreadyLoaded) {
            return;
        }
        const url = (await path).default;
        const font = new FontFace(name, `url(${url})`, descriptors);
        const loadedFont = await font.load();

        document.fonts.add(loadedFont);
    } catch(error) {
        console.error(error);
    }
};

export const useFontLoader = (fonts: IFont[]) => {
    useEffect(() => {
        async function loadFonts() {
            if((window as Window).APP_FONT_LOADING) {
                return;
            }
            const systemFonts = iteratorToList(document.fonts.values());

            (window as Window).APP_FONT_LOADING = true;
            await Promise.all(fonts.map((font) => loadSingleFont({ 
                name           : font.name, 
                path           : font.url, 
                fontDescriptors: font.descriptors,
                systemFonts,
            })));
            (window as Window).APP_FONT_LOADING = false;
        }
        loadFonts();
    }, [fonts]);
};
