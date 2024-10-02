import GoogleLogo from '../ui/logo/GoogleLogo';
import { Suspense, useState } from 'react';
import Button from '../ui/components/Button';
import AppLogo from '../ui/logo/AppLogo';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // when leave page,reset state
  //   setClickedGoogle(false);
  // }, []);

  function handleGoogle() {
    setLoading(true);
    console.log('google login start');
    window.location.assign('http://localhost:4000/api/auth/google');
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, type: 'spring' }}
    >
      <div className="flex h-screen items-center justify-center text-black">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border-y border-gray-200 sm:border sm:shadow-xl">
            <div className="flex flex-col justify-center space-y-3 border-b border-gray-200 bg-gray-100 px-4 py-6 pt-8 sm:px-10">
              <a href={'/'} className={'w-fit'}>
                <AppLogo className="h-14 w-14" />
              </a>
              <div className={''}>
                <h3 className="text-xl font-semibold tracking-wide">
                  Sign in to localhost:3000
                </h3>
                <p className="text-sm tracking-wide text-gray-500">
                  to continue to localhost:3000
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-10">
              <Suspense
                fallback={
                  <>
                    <Button
                      type={'button'}
                      disabled={true}
                      text=""
                      variant="secondary"
                    />
                    <div className="mx-auto h-5 w-3/4 rounded-lg bg-gray-100" />
                  </>
                }
              >
                <Button
                  type={'button'}
                  variant={'secondary'}
                  text={'continue with google'}
                  icon={<GoogleLogo className="h-4 w-4" />}
                  loading={loading}
                  onClick={() => handleGoogle()}
                />
              </Suspense>
              <p className="text-muted-foreground w-fit pt-8 text-center text-sm">
                By clicking continue, you agree to our{' '}
                <Link
                  className="hover:text-primary underline underline-offset-4"
                  to={'/terms-condition'}
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  className="hover:text-primary underline underline-offset-4"
                  to={'/privacy-policy'}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
