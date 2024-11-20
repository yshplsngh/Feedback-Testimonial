import BlurFade from '../ui/components/BlurFade';
import Accordian from '../ui/Accordian';
import Footer from '../ui/components/Footer';
import FeatureSections from '../ui/FeatureSections';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';
import AnimatedGradientText from '../ui/components/AnimatedGradientText';
import FeatureBox from '../ui/components/FeatureBox';

const Home = () => {
  const time = 0.25;
  return (
    <>
      <main className="z-10 m-auto flex min-h-[80vh] flex-col items-center justify-between bg-transparent">
        <div className="my-20 flex flex-col items-center">
          <AnimatedGradientText>
            🚀 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-400" />{' '}
            <span
              className={cn(
                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
              )}
            >
              Introducing Testimonial
            </span>
            <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedGradientText>
          <div className="my-20 mt-10 max-w-[80vw] bg-gradient-to-br from-white to-white/30 bg-clip-text text-center text-3xl font-bold text-transparent shadow-lg md:text-7xl">
            Collect, Manage, and Display
            <br />
            Authentic Testimonials.
          </div>
        </div>

        <FeatureBox />

        <BlurFade
          delay={time}
          inView
          className="flex items-center justify-center md:hidden"
        >
          <FeatureSections />
        </BlurFade>
        <BlurFade
          delay={time}
          inView
          className="hidden items-center justify-center md:flex"
        >
          <FeatureSections />
        </BlurFade>
        {/*FAQ*/}
        <BlurFade delay={time} inView className="mb-5 w-full md:mb-10">
          <Accordian />
        </BlurFade>

        <Footer />
      </main>
    </>
  );
};

export default Home;
