import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import Button from './Button';
import feedback from '../../assets/feedback2.png';
import widget from '../../assets/widget2.png';

const features = [
  {
    id: 'feature-feedback',
    header: 'Feedbacks',
    name: 'Manage Feedback ',
    description:
      'Manage and review all user feedback in one place. This page allows you to track, organize, and respond to feedback to improve user experience.',
    video: feedback,
    cta: 'Get Started',
    href: '/login',
    reverse: false,
  },
  {
    id: 'feature-widget',
    header: 'Widget',
    name: 'Customise your widget',
    description:
      'You can easily customize your feedback widget by adjusting its theme and speed settings. Tailor it to suit your preferences for a more personalized experience.',
    video: widget,
    cta: 'Get Started',
    href: '/login',
    reverse: true,
  },
];

const FeatureBox = () => {
  return (
    <div className={'rounded-xl backdrop-blur-sm backdrop-filter'}>
      {features.map((feature) => (
        <section id={feature.id} key={feature.id}>
          <div className="mx-auto px-6 py-6 sm:py-20">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-5">
              <div
                className={cn('m-auto lg:col-span-2', {
                  'lg:order-last': feature.reverse,
                })}
              >
                <h2 className="text-base font-semibold leading-7 text-zinc-400">
                  {feature.header}
                </h2>
                <p className="text-whitish mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                  {feature.name}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                  {feature.description}
                </p>
                <Link to={feature.href}>
                  <Button
                    type={'button'}
                    variant={'outlineB'}
                    text={feature.cta}
                    className={'mt-10 h-10 w-fit rounded-full'}
                  />
                </Link>
              </div>
              <img
                src={feature.video}
                alt="hero-section"
                className="m-auto rounded-xl border object-cover shadow-2xl md:w-[1300px] lg:col-span-3"
                style={{
                  maskImage: `linear-gradient(to top, transparent, black 30%)`,
                }}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default FeatureBox;
