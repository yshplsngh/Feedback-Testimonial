import Button from '../ui/components/Button';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <div className="grid min-h-[80vh] place-content-center px-4">
        <h1 className="uppercase tracking-widest text-slate-300">
          404 | Page Not Found!
        </h1>
        <Button
          className="mt-3 text-slate-200"
          variant={'outline'}
          text={'Go Back Home 🏡'}
        >
          Go Back Home 🏡
        </Button>
        <Link to={'/'}></Link>
        <p className="mt-2 text-center font-thin text-slate-200">
          - Testimonial -
        </p>
      </div>
    </div>
  );
};
export default NotFound;
