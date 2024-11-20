import {
  Palette,
  CloudLightning,
  BarChart,
  Users,
  Bot,
  MonitorSmartphone,
} from 'lucide-react';

interface Feature {
  id: number;
  name: string;
  description: string;
  icon: JSX.Element;
}

const iconSize = 16;

const FeaturesData: Feature[] = [
  {
    id: 1,
    name: 'Instant Feedback Collection',
    description:
      'Seamlessly gather user feedback in real-time to capture their opinions and suggestions immediately.',
    icon: <CloudLightning size={iconSize} />,
  },
  {
    id: 2,
    name: 'Custom Feedback Widgets',
    description:
      'Design feedback widgets that blend perfectly with your website’s aesthetics and user experience.',
    icon: <Palette size={iconSize} />,
  },
  {
    id: 3,
    name: 'Comprehensive Feedback Analytics',
    description:
      'Analyze feedback trends and patterns with detailed reports to make informed decisions.',
    icon: <BarChart size={iconSize} />,
  },
  {
    id: 4,
    name: 'Multi-platform Integration',
    description:
      'Integrate feedback collection across various platforms, including web, email, and mobile apps.',
    icon: <MonitorSmartphone size={iconSize} />,
  },
  {
    id: 5,
    name: 'Feedback Categorization',
    description:
      'Organize feedback into categories for better management and actionable insights.',
    icon: <Users size={iconSize} />,
  },
  {
    id: 6,
    name: 'Automated Feedback Follow-ups',
    description:
      'Set up automated responses to acknowledge and follow up on user feedback promptly.',
    icon: <Bot size={iconSize} />,
  },
];

const FeaturesGrid = () => {
  return (
    <div>
      <div className="mt-2 flex w-full grid-cols-2 flex-col gap-12 px-3 pt-10 md:grid md:grid-cols-2 lg:grid-cols-3">
        {FeaturesData.map((feature) => {
          return (
            <div key={feature.id} className="width-fit text-left">
              <div className="flex items-center gap-2">
                {' '}
                <div className="mb-2 w-fit rounded-lg bg-slate-700 p-1 text-center text-white">
                  {feature.icon}
                </div>
                <div className="text-md mb-1 text-lg font-normal text-gray-900 dark:text-gray-100">
                  {feature.name}
                </div>
              </div>
              <div className="font-regular max-w-sm text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FeatureSections = () => {
  return (
    <div className="my-12 flex w-full min-w-[90vw] flex-col items-center justify-center backdrop-blur-sm backdrop-filter">
      <h1 className="mb-2 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-2xl tracking-tighter text-transparent md:text-3xl">
        Testimonial is Not Like Other Feedback App.
      </h1>
      <p className="max-w-md text-center text-sm text-gray-600 dark:text-gray-400">
        Testimonial is a free to use, and highly simplified feedback form
        integration website.
      </p>
      <FeaturesGrid />
    </div>
  );
};

export default FeatureSections;
