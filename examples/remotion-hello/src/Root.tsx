// The list of videos this project can render. One <Composition> = one video.
import { Composition } from "remotion";
import { GlowIntro } from "./GlowIntro";

export const RemotionRoot: React.FC = () => (
  <Composition
    id="GlowIntro"            // name used on the command line
    component={GlowIntro}     // the React component that draws each frame
    durationInFrames={150}    // 150 frames / 30 fps = 5 seconds
    fps={30}                  // tokens: video.fps
    width={1080}              // tokens: video.reel (vertical 9:16)
    height={1920}
  />
);
