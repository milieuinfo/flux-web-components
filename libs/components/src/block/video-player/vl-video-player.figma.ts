// url=https://www.figma.com/design/XgxaEcbNFkGbWW5FkCnEQo/FLUX-Web-Componenten?node-id=882-2
// source=libs/components/src/block/video-player/vl-video-player.component.ts
// component=VlVideoPlayerComponent
import figma from 'figma';

// Het Figma-component heeft geen properties; de enige tekstlaag ("-6:03") is de resterende
// speelduur van de speler zelf en geen attribuut. De attributen `title`, `source`, `subtitles`,
// `poster` en `type` bestaan enkel in code; `title` en `source` blijven leeg als invulplaats.
export default {
    example: figma.code`<vl-video-player title="" source=""></vl-video-player>`,
    id: 'vl-video-player',
    metadata: { nestable: true },
};
